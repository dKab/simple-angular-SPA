/**
 * Created by Dmitry_Kabardinov on 12/3/2015.
 */
'use strict';
(function() {
var app = angular.module('courses');

  app.factory('coursesService', ['$resource', '$q', coursesService]);

  function coursesService($resource, $q) {

    var Courses = $resource('/api/courses/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    var courses;

      /*
       * For consistency all methods return promises, even if courses are found locally
       */
    var serviceInstance = {
      getCourses: function getCourses() {
        //at first call service will actually query backend but then it will store all the courses in local variable `courses` and
        //return it when called subsequently
        var deferred = $q.defer();
        if (typeof courses === 'undefined') {
          courses = [];
            Courses.query().$promise
            .then(function(coursesArray) {
              Array.prototype.push.apply(courses, coursesArray);
              deferred.resolve(courses);
            });
        } else {
          deferred.resolve(courses);
        }
        return deferred.promise;
      },
      deleteCourse: function deleteCourse(course) {
        var deferred = $q.defer();
        Courses.delete({id: course.id}).$promise
          .then(function() {
              var index;
              var found = courses.some(function findIndex(obj, ind) {
                index = ind;
                return obj.id === course.id;
              });
              if (found) {
                courses.splice(index, 1);
                deferred.resolve(true);
              }
          }, function(err) {
              deferred.reject(err);
          });
        return deferred.promise;
      },
      addCourse: function addCourse() {
        //
      },
      getCourse: function getCourseById(id) {
        id = +id;
        //if we have our courses in local variable we'll try to find the course we need in there. If we fail to find it there,
        //then we'll send actual http GET request
        if (typeof courses !== 'undefined') {
          var course = _.find(courses, {id: id});
          if (course) {
            var deferred = $q.defer();
            deferred.resolve(course);
          }
          return deferred.promise;
        } else {
          return Courses.get({id: id}).$promise;
        }
      }

    };

    return serviceInstance;
  }
})();
