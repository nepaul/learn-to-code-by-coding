(function () {
  'use strict';

  angular
    .module('client')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['API', 'AUTH_EVENTS', 'auth', '$q', '$rootScope'];
  function authInterceptor(API, AUTH_EVENTS, auth, $q, $rootScope) {
    //TODO: use httpBuffer: retry request
    var interceptor = {
      request: request,
      response: response,
      responseError: responseError
    };

    return interceptor;

    // automatically attach Authorization header
    function request(config) {
      var token = auth.getToken();
      if (0 === config.url.indexOf(API) && token) {
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    }

    // If a token was sen back, save it
    function response(res) {
      if (0 === res.config.url.indexOf(API) && res.data.token) {
        auth.saveToken(res.data.token);
      }

      return res;
    }

    function responseError(rejection) {
      var config = rejection.config || {};
      if (!config.ignoreAuthModule) {
        switch (rejection.status) {
          case 401:
            var deferred = $q.defer();
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, rejection);
            return deferred.promise;
          case 403:
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, rejection);
            break;
        }
      }
      // otherwise, default behaviour
      return $q.reject(rejection);
    }
  }

})();