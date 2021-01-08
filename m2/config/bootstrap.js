/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
module.exports.bootstrap = async function () {

  sails.bcrypt = require('bcryptjs');
  const saltRounds = 8;
  
  if (await Qpon.count() > 0) {
    return generateUsers();
  }

  await Qpon.createEach([{
      id: 1,
      Title: "50% discount on Supreme Seafood Feast (for 2 persons)",
      Restaurant: "Mongo Tree",
      Region: "Kowloon",
      Mall: "Elements",
      Image: "images/p1.jpg",
      Quota: 1,
      Coins: 750,
      DealValidTill: "2021-12-09",
      Detail: "Original Price: HK$790 perperson."
    },
    {
      id: 2,
      Title: "Simply receive a complimentary drink",
      Restaurant: "Greyhound Cafe",
      Region: "HK Island",
      Mall: "IFC Mall",
      Image: "images/p2.jpg",
      Quota: 2,
      Coins: 500,
      DealValidTill: "2021-11-10",
      Detail: "Offer is valid after 6pm for dine-in only."
    },
    {
      id: 3,
      Title: "50% off Yoogane's Chicken Galbi",
      Restaurant: "Yoogane",
      Region: "New Territories",
      Mall: "Tsuen Wan Plaza",
      Image: "images/p3.jpg",
      Quota: 5,
      Coins: 500,
      DealValidTill: "2021-10-10",
      Detail: "Offer is valid between 11am to 3pm for dine-in only."
    },
    {
      id: 4,
      Title: "15% Off on Whole Bill",
      Restaurant: "ANA Gura",
      Region: "Kowloon",
      Mall: "Festival Walk",
      Image: "images/p4.jpg",
      Quota: 100,
      Coins: 500,
      DealValidTill: "2021-12-30",
      Detail: "Cash only"
    },
    {
      id: 5,
      Title: "10th Anniversary 15% off(Food Only)",
      Restaurant: "Harlan's",
      Region: "New Territories",
      Mall: "Tsuen Wan Plaza",
      Image: "images/p6.jpg",
      Quota: 20,
      Coins: 1000,
      DealValidTill: "2022-12-30",
      Detail: "Present this Coupon to Enjoy 15% off on all food (all day) from Monday to Sunday."
    },
    {
      id: 6,
      Title: "10% on lunch and dinner",
      Restaurant: "Theo Mistral by Theo Randall",
      Region: "HK Island",
      Mall: "Pacific Place",
      Image: "images/p7.jpg",
      Quota: 100,
      Coins: 500,
      DealValidTill: "2021-12-30",
      Detail: "Enjoy 10% discount when dining lunch and dinner from Monday to Sunday at Theo Mistral by Theo Randall"
    },

    
    // etc.
  ]);

  return generateUsers();

  async function generateUsers() {

    if (await User.count() > 0) {
      return;
    }

    const hash = await sails.bcrypt.hash('123456', saltRounds);

    await User.createEach([{
        username: 'admin',
        password: hash,
        gender: 'male',
        account: 10000,
        age: 52,
        role: 'admin'
      },
      {
        username: 'sq',
        password: hash,
        gender: 'male',
        age: 14,
        account: 10000,
        role: 'user'
      },
      {
        username: 'user',
        password: hash,
        gender: 'female',
        age: 28,
        account: 10000,
        role: 'user'
      },
    ]);


    const sq = await User.findOne({
      username: "sq"
    });
    const user = await User.findOne({
      username: "user"
    });





    const qpon1 = await Qpon.findOne({
        id : 1
    });
    const qpon2 = await Qpon.findOne({
        id: 2
    });
    const qpon3 = await Qpon.findOne({
        id: 3
    });
    const qpon4 = await Qpon.findOne({
        id: 4
    });




    

    await User.addToCollection(user.id, 'UserAsso').members(qpon1.id,qpon2.id);
    await User.addToCollection(sq.id, 'UserAsso').members(qpon2.id,qpon3.id);
   







  }
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

};
