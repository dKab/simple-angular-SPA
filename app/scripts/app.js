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
      'ngResource', 'ngRoute', 'LocalStorageModule', 'ngMockE2E'
    ]);

  app.run([
    '$rootScope', '$location', 'authService', '$httpBackend', runConfiguration ]);

  function runConfiguration($rootScope, $location, authService, $httpBackend) {

      $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
        if ( nextRoute.requireLogin && !authService.isUserLoggedIn() ) {
          $location.path('/login').replace();
        }
      });

    $httpBackend.whenGET('/api/courses').respond([
      {
        id: 1,
        name: 'Course 1',
        duration: 380,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
        ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
        ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
        ' sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        created: new Date(2011,10,30),
        authors: [
          'Пушкин', 'Лермонтов'
        ]
      }
    ]);
    $httpBackend.whenGET(/\.html$/).passThrough();


  }





})();

