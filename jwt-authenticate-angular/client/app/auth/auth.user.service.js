(function () {
  'use strict';

  angular
    .module('client')
    .service('userService', userService);

  userService.$inject = ['$http', 'API'];
  function userService($http, API) {
    this.register = register;
    this.login = login;
    this.getProfile = getProfile;

    function register(email, password) {
      return $http.post(API + '/auth/register', {
        email: email,
        password: password
      });
    }

    function login(email, password) {
      return $http.post(API + '/auth/login', {
        email: email,
        password: password
      });
    }

    function getProfile() {
       return $http.get(API + '/profile');
    }
  }
})();