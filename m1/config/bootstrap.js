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

module.exports.bootstrap = async function() {

    if (await Qpon.count() > 0) {
        return;
    }

    await Qpon.createEach([
        { Title: "50% discount on Supreme Seafood Feast (for 2 persons)", Restaurant: "Mongo Tree", Region: "Kowloon", Mall: "Elements", Image: "images/p1.jpg", Quota: 500, Coins: 750, DealValidTill: "2021-12-09", Detail: "Original Price: HK$790 perperson." },
        { Title: "Simply receive a complimentary drink", Restaurant: "Greyhound Cafe", Region: "HK Island", Mall: "IFC Mall", Image: "images/p2.jpg", Quota: 500, Coins: 500, DealValidTill: "2021-11-10", Detail: "Offer is valid after 6pm for dine-in only." },
        { Title: "50% off Yoogane's Chicken Galbi", Restaurant: "Yoogane", Region: "New Territories", Mall: "Tsuen Wan Plaza", Image: "images/p3.jpg", Quota: 500, Coins: 500, DealValidTill: "2021-10-10", Detail: "Offer is valid after 6pm for dine-in only." },
        { Title: "15% Off on Whole Bill", Restaurant: "ANA Gura", Region: "Kowloon", Mall: "Festival Walk", Image: "images/p4.jpg", Quota: 500, Coins: 500, DealValidTill: "2021-12-30", Detail: "Cash only" },
        // etc.
    ]);

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