(function () {
  'use strict';

  angular
  .module('client')
  .run(runBlock);

  runBlock.$inject = ['$rootScope', 'AUTH_EVENTS', 'toastr', '$state', 'auth'];
  function runBlock($rootScope, AUTH_EVENTS, toastr, $state, auth) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (!next.data) {
        return;
      }
      var needAuthenticated = next.data.needAuthenticated;
      var goDashboard = next.data.goDashboard;
      var isAuthenticated = auth.isAuthenticated();
      if (needAuthenticated && !isAuthenticated) {
        event.preventDefault();
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      } else if (isAuthenticated && goDashboard) {
        event.preventDefault();
        $state.go('dashboard')
      }
    });

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(event){
      toastr.info("Not Authenticated, Login Please!");
      $state.go('auth.login');
    })
  }
})();