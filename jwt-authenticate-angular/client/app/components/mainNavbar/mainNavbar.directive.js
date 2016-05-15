(function() {
  'use strict';

  angular
  .module('client')
  .directive('mainNav', mainNav);

  function mainNav() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/mainNavbar/mainNavbar.html',
      replace: true
    };

    return directive;
  }
})();