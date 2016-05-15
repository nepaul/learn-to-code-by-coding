(function () {
  'use strict';

  angular
    .module('client')
    .service('auth', authService);

  authService.$inject = ['$window'];
  function authService($window, $state) {
    this.parseJwt = parseJwt;
    this.saveToken = saveToken;
    this.getToken = getToken;
    this.isAuthenticated = isAuthenticated;
    this.logout = logout;

    function parseJwt(token) {
      var base64Url = token.split('.')[1];
      // TODO: why need this line
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }

    function saveToken(token) {
      if ($window.sessionStorage['isKeepLoggedIn'] === "true") {
        $window.localStorage['jwtToken'] = token;
      } else {
        $window.sessionStorage['jwtToken'] = token;
      }
    }

    function getToken() {
      return $window.localStorage['jwtToken'] || $window.sessionStorage['jwtToken'];
    }

    function isAuthenticated() {
      var token = this.getToken();
      if (token) {
        var params = this.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      }
      return false;
    }

    function logout() {
      $window.localStorage.removeItem('jwtToken');
      $window.sessionStorage.removeItem('jwtToken');
      $window.location = '/';
    }
  }

})();