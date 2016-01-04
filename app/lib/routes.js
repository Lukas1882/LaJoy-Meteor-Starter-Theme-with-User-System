Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('/account', {
  name: 'account',
  //controller: 'account',
  where: 'client'
});

Router.route('/register', {
  name: 'register',
  //controller: 'account',
  where: 'client'
});


Router.route('/login', {
  name: 'login',
  //controller: 'account',
  where: 'client'
});