(function () {
  'use strict';

  angular
    .module('client')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['userService', '$state', 'toastr', '$window'];
  function LoginController(userService, $state, toastr, $window) {
    var vm = this;

    vm.credentials = {email: '', password: ''};
    vm.isKeepLoggedIn = true;
    vm.login = login;

    function login(credentials) {
      $window.sessionStorage['isKeepLoggedIn'] = vm.isKeepLoggedIn;
      userService.login(credentials.email, credentials.password)
        .then(handleRequest)
    }

    function handleRequest(res) {
      if (200 === res.status) {
        $state.go('dashboard');
      } else if (400 === res.status) {
        toastr.error(res.data, 'Login Failed')
      } else {
        toastr.error(res.statusText, 'Login Failed');
      }
    }


  }
})();