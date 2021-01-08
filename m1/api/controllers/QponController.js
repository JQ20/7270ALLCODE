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

    console.log(everyplace);

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

    return res.view('qpon/detail', {
      Qpon: thatQpon
    });

  },

  //action - create
  create: async function (req, res) {

    if (req.method == "GET") return res.view('qpon/create'); //view folder qpon / create.ejs file ,sent back to the user

    var cqpon = await Qpon.create(req.body).fetch();

    return res.view('qpon/detail', {
      Qpon: cqpon
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

    var deletedQpon = await Qpon.destroyOne(req.params.id);

    if (!deletedQpon) return res.notFound();

    return res.ok();
  },


  // action - search
  search: async function (req, res) {

    var limit = Math.max(req.query.limit, 2) || 2;
    var offset = Math.max(req.query.offset, 0) || 0;
    var region = req.query.region || ['Kowloon', 'HK Island', 'New Territories'];
    var mincoin = req.query.minc || 0;
    var maxcoin = req.query.maxc || Number.MAX_VALUE;
    var date = req.query.date || "1800-01-01";

    // 1. qpons to view
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
    // 2.qpon to count
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
    //3. count
    var count = somePlons.length;

    return res.view('qpon/search', {
      Qpons: Plimt,
      numOfRecords: count
    });

  },

};
