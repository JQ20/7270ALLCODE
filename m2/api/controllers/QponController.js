/**
 * QponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //index
  home: async function (req, res) {

    var everyplace = await Qpon.find().sort('id DESC');



    return res.view('qpon/homepage', {
      Qpon: everyplace
    });
  },

  // json function
  json: async function (req, res) {

    var everyones = await Qpon.find();

    return res.json(everyones);
  },

  // action - seeDetail
  detail: async function (req, res) {

    var thatQpon = await Qpon.findOne(req.params.id);

    if (!thatQpon) return res.notFound();

    var QponAsso = await Qpon.findOne(req.params.id).populate('QponAsso');

    var uiList = new Array();
    var users;
    if(QponAsso){
      users = QponAsso.QponAsso;
      users.forEach(element => {
        uiList.push(element.id);
      });
    }


    return res.view('qpon/detail', {
      Qpon: thatQpon,
      uiList: uiList,
    });

  },

  //action - create
  create: async function (req, res) {

    if (req.method == "GET") return res.view('qpon/create'); //view folder qpon / create.ejs file ,sent back to the user
    var uiList = new Array();
    var cqpon = await Qpon.create(req.body).fetch();

    return res.view('qpon/detail', {
      Qpon: cqpon ,
      uiList: uiList
    });

  },

  //action -admin
  admin: async function (req, res) {

    var everyplace = await Qpon.find();

    return res.view('qpon/admin', {
      Qpon: everyplace
    });
  },

  // action - update
  update: async function (req, res) {

    if (req.method == "GET") {

      var thatQpon = await Qpon.findOne(req.params.id);

      if (!thatQpon) return res.notFound();

      return res.view('qpon/update', {
        Qpon: thatQpon
      });

    } else {

      var updatedQpon = await Qpon.updateOne(req.params.id).set(req.body);

      if (!updatedQpon) return res.notFound();

      var everyplace = await Qpon.find();

      return res.view('qpon/admin', {
        Qpon: everyplace
      });
    }
  },

  delete: async function (req, res) {

    if (req.method === 'GET') {
      return res.fobidden();
    }

    if (req.wantsJSON) {
      var deletedQpon = await Qpon.destroyOne(req.params.id);
      if (!deletedQpon) return res.status(401).json("Coupons not found");
      return res.json({
        message: 'Deleted Successfully ',
      });
    } else {
      return res.redirect('back');
    }
  },


  // action - search
  search: async function (req, res) {

    var limit = Math.max(req.query.limit, 2) || 2;
    var offset = Math.max(req.query.offset, 0) || 0;
    var region = req.query.region || ['Kowloon', 'HK Island', 'New Territories'];
    var mincoin = req.query.minc || 0;
    var maxcoin = req.query.maxc || Number.MAX_VALUE;
    var date = req.query.date || "1800-01-01";


    console.log("1" + region + "2" + mincoin + "3" + maxcoin + "4" + date);

    var Plimt = await Qpon.find({
      where: {
        Region: region,

        Coins: {
          '>=': mincoin,
          '<': maxcoin,
        },
        DealValidTill: {
          '>': date,
        },
      },
      limit: limit,
      skip: offset,
    });

    var somePlons = await Qpon.find({
      where: {
        Region: region,

        Coins: {
          '>=': mincoin,
          '<': maxcoin,
        },
        DealValidTill: {
          '>': date,
        },

      },

    });

    var count = somePlons.length;

    console.log("count:" + count + "somePlons" + somePlons + "Plimit" + Plimt);
    if (req.wantsJSON) {
      return res.json(Plimt);
    } else {
      return res.view('qpon/search', {
        Qpons: Plimt,
        numOfRecords: count
      });
    }

  },

};
