/**
 * @ngdoc overview
 * @name untitled1App
 * @description
 * # untitled1App
 *
 * Main module of the application.
 */
'use strict';
(function() {
  var app  = angular
    .module('courses', [
      'ngResource', 'ngRoute', 'LocalStorageModule', 'ngMockE2E'
    ]);

  app.run([
    '$rootScope', '$location', 'authService', '$httpBackend', 'clientStructuredDataStorage', 'coursesService', runConfiguration ]);

  function runConfiguration($rootScope, $location, authService, $httpBackend, clientStructuredDataStorage, coursesService) {

      $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
        if ( nextRoute.requiresLogin && !authService.isUserLoggedIn() ) {
          $location.path('/login').replace();
        }
      });

    $httpBackend.whenGET('/api/courses').respond(function() {
      var courses = clientStructuredDataStorage.getCollection('courses');
      return [200, courses];
    });

    $httpBackend.whenDELETE(/api\/courses\/(.+)/)
      .respond(function(method, url) {
        var matches = /\d+/.exec(url);
        if (matches.length) {
          var id = matches.shift();
        }
        var courses = clientStructuredDataStorage.deleteObjectFromCollection('courses', id);
        coursesService.setCourses(courses);
        return [200, {}];
      });
    $httpBackend.whenGET(/\.html$/).passThrough();


  }





})();

