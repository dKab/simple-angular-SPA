'use strict';
/**
 * @ngdoc overview
 * @name untitled1App
 * @description
 * # untitled1App
 *
 * Main module of the application.
 */
(function() {
  var app  = angular
    .module('courses', [
      'ngResource', 'ngRoute', 'LocalStorageModule'
    ]);

  app.run([
    '$rootScope',
    '$location',
    'authService',
    function ($rootScope, $location, authService) {
      $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
        if ( nextRoute.requireLogin && !authService.isUserLoggedIn() ) {
          $location.path('/login').replace();
        }
      });
    }]);
})();

