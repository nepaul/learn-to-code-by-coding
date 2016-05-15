(function () {
  'use strict';

  angular
    .module('client')
    .directive('navBar', navBar);

  function navBar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: navbarController,
      controllerAs: 'navCtrl',
      bindToController: true,
      replace: true
    };

    return directive;

    navbarController.$inject = ['auth'];
    function navbarController(auth) {
      var vm = this;
      vm.logout = auth.logout;
    }
  }
})();