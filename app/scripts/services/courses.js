/**
 * Created by Dmitry_Kabardinov on 12/3/2015.
 */
'use strict';
(function() {
var app = angular.module('courses');

  app.factory('coursesService', ['$resource', coursesService]);

  function coursesService($resource) {
    return $resource('/api/courses/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
