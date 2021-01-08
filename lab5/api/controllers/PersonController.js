/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // action - create
  create: async function (req, res) {

    if (req.method == "GET") return res.view('person/create'); //view folder person / create.ejs file ,sent back to the user

    var person = await Person.create(req.body).fetch();

    return res.status(201).json({
      id: person.id
    });
  },

  // json function
  json: async function (req, res) {

    var everyones = await Person.find();

    return res.json(everyones);
  },

  // action - list
  list: async function (req, res) {

    var everyones = await Person.find();

    return res.view('person/list', {
      persons: everyones
    });
  },

  // action - read
  read: async function (req, res) {

    var thatPerson = await Person.findOne(req.params.id);

    if (!thatPerson) return res.notFound();

    return res.view('person/read', {
      person: thatPerson
    });
  },

  // action - delete 
  delete: async function (req, res) {

    var deletedPerson = await Person.destroyOne(req.params.id);

    if (!deletedPerson) return res.notFound();

    // return res.redirect("/"); 
    if (req.wantsJSON) {
      return res.status(204).send();
    } else {

      return res.redirect("/");
    }
  },

  // action - update
  update: async function (req, res) {

    if (req.method == "GET") {

      var thatPerson = await Person.findOne(req.params.id);

      if (!thatPerson) return res.notFound();

      return res.view('person/update', {
        person: thatPerson
      });

    } else {

      var updatedPerson = await Person.updateOne(req.params.id).set(req.body);

      if (!updatedPerson) return res.notFound();

      return res.ok();
    }
  },

  // search funct
  search: async function (req, res) {

    var whereClause = {};

    if (req.query.name) whereClause.name = {
      contains: req.query.name
    };

    var parsedAge = parseInt(req.query.age);
    if (!isNaN(parsedAge)) whereClause.age = parsedAge;

    // whereClause ={naem:{contain:"Kenny",age: 23}};

    var thosePersons = await Person.find({
      where: whereClause,
      sort: 'name'
    });

    return res.view('person/list', {
      persons: thosePersons
    });
  },


  // action - populate
  populate: async function (req, res) {

    var person = await Person.findOne(req.params.id).populate("consultants");

    if (!person) return res.notFound();

    return res.json(person);
  },

  // action - paginate
  paginate: async function (req, res) {

    var limit = Math.max(req.query.limit, 2) || 2;
    var offset = Math.max(req.query.offset, 0) || 0;

    var somePersons = await Person.find({
      limit: limit,
      skip: offset
    });

    var count = await Person.count();

    return res.view('person/paginate', {
      persons: somePersons,
      numOfRecords: count
    });
  },
  // action - aginate
  aginate: async function (req, res) {
    //The version develped by ownself
    var limit = Math.max(req.query.limit, 2) || 2;
    var offset = Math.max(req.query.offset, 0) || 0;


    var somePersons = await Person.find({
      limit: limit,
      skip: offset
    });
    console.log("limit=" + limit + "offset=" + offset);

    var count = await Person.count();

    if (req.wantsJSON) {
      console.log("success in");
      return res.json({
        persons: somePersons,
        numOfRecords: count
      });
    } else {
      console.log("request not get");
      return res.view('person/aginate', {
        persons: somePersons,
        numOfRecords: count
      });
    }



  },
  //aginate2
  aginate2: async function (req, res) {
    if (req.wantsJSON) {

      var limit = Math.max(req.query.limit, 2) || 2;
      var offset = Math.max(req.query.offset, 0) || 0;

      var somePersons = await Person.find({
        limit: limit,
        skip: offset
      });
      return res.json(somePersons);

    } else {
      var count = await Person.count();
      return res.view('person/aginate2', {
        numOfRecords: count
      });
    }
  },


  //vaginate
  vaginate: async function (req, res) {
    if (req.wantsJSON) {

      var limit = Math.max(req.query.limit, 2) || 2;
      var offset = Math.max(req.query.offset, 0) || 0;

      var somePersons = await Person.find({
        limit: limit,
        skip: offset
      });
      return res.json(somePersons);

    } else {
      var count = await Person.count();
      return res.view('person/vaginate', {
        numOfRecords: count
      });
    }
  },


};
