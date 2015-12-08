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
      'ngResource', 'ngRoute', 'LocalStorageModule', 'ngMockE2E', 'filters']);

  app.run([
    '$rootScope', '$location', 'authService', '$httpBackend', 'clientStructuredDataStorage', 'coursesService', runConfiguration ]);

  function runConfiguration($rootScope, $location, authService, $httpBackend, clientStructuredDataStorage) {

      $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
        if ( nextRoute.requiresLogin && !authService.isUserLoggedIn() ) {
          $location.path('/login').replace();
        }
      });

    $httpBackend.whenPUT(/api\/courses\/(.+)/)
      .respond(function(method, url, data) {
        var course = angular.fromJson(data);
        return [200, course];
      });

    $httpBackend.whenPOST('/api/courses').respond(function saveCourseToClientStorage(method, url, data) {
      var course = angular.fromJson(data),
        added = clientStructuredDataStorage.addObject('courses', course);
      return [200, added];
    });

    $httpBackend.whenGET(/api\/courses\/(.+)/)
      .respond(function getCourseFromClientStorage(method, url) {
        var id = getIdFromURI(url),
          course = clientStructuredDataStorage.getById('courses', id);
        if (course) {
          return [200, course];
        } else {
          return [404, {}];
        }
      });

    $httpBackend.whenGET('/api/courses').respond(function getCoursesFromClientStorage() {
      var courses = clientStructuredDataStorage.getCollection('courses');
      return [200, courses];
    });

    $httpBackend.whenDELETE(/api\/courses\/(.+)/)
      .respond(function deleteCourseFromClientStorageAndUpdateLocalCollection(method, url) {
        var id = getIdFromURI(url);
        var courses = clientStructuredDataStorage.deleteObjectFromCollection('courses', id);
        return [200, {}];
      });
    $httpBackend.whenGET(/\.html$/).passThrough();
  }

  function getIdFromURI(URIString) {
    var matches = /\d+/.exec(URIString);
    return matches && matches.length ? matches.shift() : null;
  }

})();

