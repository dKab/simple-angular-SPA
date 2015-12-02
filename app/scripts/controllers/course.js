/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.controller('CourseController', ['$routeParams', CourseController]);

  function CourseController($routeParams) {
    this.header = $routeParams.id === 'new' ? 'Новый курс'
      : /*Course.get($routeParams.name).name;*/ $routeParams.id;
  }
})();
