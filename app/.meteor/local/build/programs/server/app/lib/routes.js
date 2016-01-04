(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/routes.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Router.configure({                                                     // 1
  layoutTemplate: 'MasterLayout',                                      // 2
  loadingTemplate: 'Loading',                                          // 3
  notFoundTemplate: 'NotFound'                                         // 4
});                                                                    //
                                                                       //
Router.route('/', {                                                    // 8
  name: 'home',                                                        // 9
  controller: 'HomeController',                                        // 10
  where: 'client'                                                      // 11
});                                                                    //
                                                                       //
Router.route('/account', {                                             // 14
  name: 'account',                                                     // 15
  //controller: 'account',                                             //
  where: 'client'                                                      // 17
});                                                                    //
                                                                       //
Router.route('/register', {                                            // 20
  name: 'register',                                                    // 21
  //controller: 'account',                                             //
  where: 'client'                                                      // 23
});                                                                    //
                                                                       //
Router.route('/login', {                                               // 27
  name: 'login',                                                       // 28
  //controller: 'account',                                             //
  where: 'client'                                                      // 30
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=routes.js.map
