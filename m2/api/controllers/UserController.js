/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {


  login: async function (req, res) {

    if (req.method == "GET") return res.view('user/login');

    if (!req.body.username || !req.body.password) return res.badRequest();

    var user = await User.findOne({
      username: req.body.username
    });

    if (!user) return res.status(401).json("User not found");

    //match  passwords
    var match = await sails.bcrypt.compare(req.body.password, user.password);

    if (!match) return res.status(401).json("Wrong Password");

    //plain text type password verification
    // if (user.password != req.body.password) 
    //     return res.status(401).json("Wrong Password");

    // Reuse existing session 
    if (req.session.username) {
      return res.redirect('/' + req.session.uid);
    }

    // Start a new session for the new login user
    req.session.regenerate(function (err) {

      if (err) return res.serverError(err);
      req.session.uid = user.id;
      req.session.account = user.account;
      req.session.username = req.body.username;
      req.session.role = user.role;

      sails.log('[Session]', req.session);
      if (req.wantsJSON) {
        return res.json({
          message: 'Login successfully.',
          username: user.username,
          account: user.account,
          id: user.id,
          url: '/'
        });
      }
      return res.redirect('/');
    });

  },

  //action -logout
  logout: async function (req, res) {

    req.session.destroy(function (err) {

      if (err) return res.serverError(err);

      return res.redirect('/');
    });
  },

  //action - sign up
  signup: async function (req, res) {

    if (req.method === 'GET') {
      return res.view('user/signup');
    }

    NewUser = req.body;
    sails.bcrypt = require('bcryptjs');
    const saltRounds = 8;
    const hash = await sails.bcrypt.hash(NewUser.password, saltRounds);
    NewUser.password = hash;

    var user = await User.create(NewUser).fetch();
    
    req.session.regenerate((err) => {
      if (err) {
        return res.serverError(err);
      }

      req.session.uid = user.id;
      req.session.username = user.username;
      req.session.role = user.role;
      return res.redirect('/');
    });

  },

  //action - check
  check: async function (req, res) {

    if (req.wantsJSON) {

      var username = req.params.username;

      var user = await User.findOne({
        username: username
      });

      if (!user) {
        return res.json({
          message: 'ok'
        });
      } else {
        return res.json({
          message: 'no'
        });

      }
    } else {
      return res.redirect('../../login');
    }

  },

  redeem: async function (req, res) {
    if (req.method === 'GET') {
      return res.fobidden();
    } //403

    var uid = req.params.uid;
    var qpon_id = parseInt(req.params.id);

    var thatUser = await User.findOne(uid);
    if (!thatUser) {
      return res.notFound();
    }
    
    var thatCoupon = await Qpon.findOne(qpon_id);

    var thatUserRedeem = await User.findOne(uid).populate('UserAsso', {
      id: qpon_id
    });
    if (!thatUserRedeem) {
      return res.notFound();
    }

    if (thatUserRedeem.UserAsso.length) {
      if (req.wantsJSON) {
        return res.json({
          message: 'Already Redeem.',
          url: '../detail/' + qpon_id.toString()
        });
      } else {
        return res.status(409).send('Already Redeem.');
      }
    }


    if (thatUserRedeem.account >= thatCoupon.Coins) {
      await User.addToCollection(uid, 'UserAsso').members(qpon_id);
      var currentAccount = thatUserRedeem.account - thatCoupon.Coins;
      await User.updateOne(uid).set({
        account: currentAccount
      });
    } else {
      return res.json({
        message: 'Fail! Insufficient Balance!',
        url: '../detail/' + qpon_id.toString()
      });
    }


    if (req.wantsJSON) {
      return res.json({
        message: 'Redeem successfully!',
        url: '../detail/' + qpon_id.toString()
      });

    }

  },

  cancel: async function (req, res) {

    if (req.method === 'GET') {
      return res.fobidden();
    }

    var uid = req.params.uid;
    var qpon_id = parseInt(req.params.id);

    var thatUser = await User.findOne(uid);
    if (!thatUser) {
      return res.notFound();
    }

    var thatCoupon = await Qpon.findOne(qpon_id);

    var thatUserRedeem = await User.findOne(uid).populate('UserAsso', qpon_id);
    if (thatUserRedeem.UserAsso.length <= 0) {
      if (req.wantsJSON) {
        return res.json({
          message: 'Already moved out.',
          url: '../detail/' + qpon_id.toString()
        });
      } else {
        return res.status(409).send('Already moved out.');
      }
    }

    await User.removeFromCollection(uid, 'UserAsso').members(qpon_id);
    var currentAccount = thatUserRedeem.account + thatCoupon.Coins;
    await User.updateOne(uid).set({
      account: currentAccount
    });

    if (req.wantsJSON) {
      return res.json({
        message: 'Cancel Successfully ',
        url: '../detail/' + qpon_id.toString()
      });
    } else {
      return res.redirect('back');
    }
  },

  myredeem: async function (req, res) {
    var uid = req.params.uid;
    var user = await User.findOne(uid);
    if (!user) {
      return res.notFound();
    }

    var thatQponList = await User.findOne(uid).populate('UserAsso');
    if (!thatQponList) {
      return res.notFound();
    }

    return res.view('user/myredeem', {
      User: user,
      Qpon: thatQponList.UserAsso
    });

  },

  cuser: async function (req, res) {
    var id = req.params.id;
    var qpon = await Qpon.findOne(id);
    var thatUserList = await Qpon.findOne(id).populate('QponAsso');

    return res.view('user/cuser', {
      Qpon: qpon,
      User: thatUserList.QponAsso
    });

  },

  upqpon: async function(req,res){

    if(req.method === 'GET'){
      if(!req.session.uid) return res.json("no user");
      else{
        uid = req.session.uid;
        var RedeemthatUser = await User.findOne(uid).populate('UserAsso'); // user订票的联系
        var QponList = RedeemthatUser.UserAsso;  //订过的票
        return res.view('user/updateQpon', {
          QponList: QponList,
          User: RedeemthatUser,
        });
      }
    }

  },

};
