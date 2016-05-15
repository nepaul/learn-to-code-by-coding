(function(){
  'use strict';

  angular
    .module('client')
    .config(config);

  config.$inject = ['$logProvider', '$locationProvider'];
  function config($logProvider, $locationProvider){
    //  Enable log
    $logProvider.debugEnabled(true);

    // use the HTML5 History API (Remove "#" in uri)
    $locationProvider.html5Mode(true);
  }

})();