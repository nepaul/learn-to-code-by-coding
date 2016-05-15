(function () {
  'use strict';

  angular
    .module('client')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['userService'];
  function DashboardController(userService) {
    var vm = this;
    vm.username = null;

    userService.getProfile().then(function (resp) {
      vm.username = resp.data.profile.email.split('@')[0].toUpperCase();
    })

  }
})();