/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
  /***********************************Qpon*************************************/
  'GET /user': 'QponController.home',
  'GET /': 'QponController.home',
  'GET /qpon': 'QponController.home',
  'GET /qpon/homePage': 'QponController.home',
  'GET /qpon/json': 'QponController.json',
  'GET /json': 'QponController.json',

  'GET /qpon/detail/:id': 'QponController.detail',
  'GET /detail/:id': 'QponController.detail',

  'GET /qpon/create': 'QponController.create',
  'GET /create': 'QponController.create',
  'POST /qpon/create': 'QponController.create',
  'POST /create': 'QponController.create',


  'GET /qpon/admin': 'QponController.admin',
  'GET /admin': 'QponController.admin',

  'GET /qpon/update/:id': 'QponController.update',
  'POST /qpon/update/:id': 'QponController.update',

  'DELETE /qpon/delete/:id': 'QponController.delete',

  'GET /qpon/search': 'QponController.search',
  'GET /search': 'QponController.search',

  /***********************************User*************************************/

  //User
  'GET /login': 'UserController.login',
  'POST /login': 'UserController.login',
  'GET /logout': 'UserController.logout',

  'GET /signup': 'UserController.signup',
  'POST /signup': 'UserController.signup',

  //check
  'GET /check/:username': 'UserController.check',


  //Redeem
  'POST /redeem/:id/:uid': 'UserController.redeem',
  //Cancel
  'DELETE /cancel/:id/:uid': 'UserController.cancel',
  //myredeem
  'GET /myredeem/:uid': 'UserController.myredeem',
  //cuser
  'GET /cuser/:id': 'UserController.cuser',

  //Get update qpon
  'GET /upqpon': 'UserController.upqpon',



  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/


};
