(function () {
  'use strict';

  angular
    .module('client')
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: 'app/main/main.html',
      })

      .state('auth', {
        url: "/auth",
        template: "<main-nav></main-nav><div ui-view></div>",
        data: {
          goDashboard: true
        }
      })
      .state('auth.register', {
        url: "/register",
        templateUrl: "app/auth/auth.register.html",
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .state('auth.login', {
        url: "/login",
        templateUrl: "app/auth/auth.login.html",
        controller: 'LoginController',
        controllerAs: 'vm'
      })

      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "app/dashboard/dashboard.html",
        controller: 'DashboardController',
        controllerAs: 'vm',
        data: {
          needAuthenticated: true
        }
      })
  }
})();