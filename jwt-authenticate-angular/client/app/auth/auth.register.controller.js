(function () {
  'use strict';

  angular
    .module('client')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['userService', '$state', 'toastr'];
  function RegisterController(userService, $state, toastr) {
    var vm = this;

    vm.credentials = {email: '', password: ''};
    vm.register = register;

    function register(credentials) {
      userService.register(credentials.email, credentials.password)
        .then(handleRequest)
    }

    function handleRequest(res) {
      if (201 === res.status) {
        toastr.success('Register successfully', 'Congratulation');
        $state.go('auth.login');
      } else if (400 === res.status) {
        toastr.error(res.data, 'Register Failed')
      } else {
        toastr.error(res.statusText, 'Register Failed');
      }
    }

  }
})();