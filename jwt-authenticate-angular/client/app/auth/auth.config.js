(function () {
  'use strict';

  angular
    .module('client')
    .config(InterceptorConfig);

  InterceptorConfig.$inject = ['$httpProvider'];
  function InterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }
})();