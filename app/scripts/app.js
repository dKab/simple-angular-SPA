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
    '$rootScope', '$location', 'authService', '$httpBackend', 'clientStorage', runConfiguration ]);

  function runConfiguration($rootScope, $location, authService, $httpBackend, clientStorage) {

      $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
        if ( nextRoute.requireLogin && !authService.isUserLoggedIn() ) {
          $location.path('/login').replace();
        }
      });


    $httpBackend.whenGET('/api/courses').respond(function() {
      var courses = clientStorage.getCourses();
      return [200, courses];
    });
    $httpBackend.whenDELETE(/api\/courses\/(.+)/, undefined, ['id'])
      .respond(function(method, url, data, headers, params) {
        clientStorage.deleteCourse(params.id);
        return [200, {}];
      });
    $httpBackend.whenGET(/\.html$/).passThrough();


  }





})();

