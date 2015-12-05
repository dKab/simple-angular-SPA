/**
 * Created by Dmitry_Kabardinov on 12/3/2015.
 */
'use strict';
(function() {
var app = angular.module('courses');

  app.factory('coursesService', ['$resource', coursesService]);

  function coursesService($resource) {

    var Courses = $resource('/api/courses/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    var courses = [];

    Courses.query().$promise
      .then(function(coursesArray) {
        //courses = coursesArray;
        Array.prototype.push.apply(courses, coursesArray);
      });

    coursesService = {
      getCourses: function getCourses() {
        return courses;
      },
      setCourses: function setCourses(coursesArray) {
        courses.length = 0;
        if (coursesArray.length) {
          Array.prototype.push.apply(courses, coursesArray);
        }
      },
      deleteCourse: function deleteCourse(course) {
        return Courses.delete({id: course.id}).$promise;
      },
      addCourse: function addCours() {
        //
      }

    };

    return coursesService;
  }
})();
