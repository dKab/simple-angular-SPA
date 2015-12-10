/**
 * Created by Dmitry_Kabardinov on 12/3/2015.
 */
'use strict';
(function () {
  var app = angular.module('courses');

  app.factory('coursesService', ['$resource', '$q', 'SerializationService', coursesService]);

  function coursesService($resource, $q, SerializationService) {

    var Course = $resource('/api/courses/:id', {
        id: '@id'
      }, {
        'update': {
          method: 'PUT'
        }
      }),
      courses,
      serviceInstance,
      serialization = SerializationService;
    /*
     * For consistency all public interface methods return promises, even if courses are found locally.
     * Since objects are serialized before being sent via $resource service the `saveCourse` and `updateCourse` methods
     * do some preparation (if there are Date objects they are transformed into special objects which can be restored later).
     */
    serviceInstance = {
      getCourses: function getCourses() {
        /* When called for the first time the service will actually query backend but then it will store all
         the courses in local variable `courses` and return it on subsequent calls. */
        var deferred = $q.defer();
        if (typeof courses === 'undefined') {
          courses = [];
          Course.query().$promise
            .then(function (coursesArray) {
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
        Course.delete({id: course.id}).$promise
          .then(function () {
            var index;
            var found = courses.some(function findIndex(obj, ind) {
              index = ind;
              return obj.id === course.id;
            });
            if (found) {
              courses.splice(index, 1);
              deferred.resolve(true);
            }
          }, function (err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },
      saveCourse: function saveCourse(courseToSave) {
        var courseResource = new Course(),
          prepared = serialization.prepare(courseToSave);
        angular.extend(courseResource, prepared);
        var deferred = $q.defer();
        courseResource.$save()
          .then(function (course) {
            var restored = serialization.restore(course);
            if (courses) {
              courses.push(restored);
            }
            deferred.resolve(restored);
          }, function (err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },
      getCourse: function getCourseById(id) {
        id = +id;
        /* If we have our courses in local variable we'll try to find the course we need in there. If we fail to find it there,
         then we'll send actual http GET request. */
        if (typeof courses !== 'undefined') {
          var course = _.find(courses, {id: id});
          var deferred = $q.defer();
          if (course) {
            deferred.resolve(course);
          } else {
            deferred.reject({status: 404});
          }
          return deferred.promise;
        } else {
          return Course.get({id: id}).$promise;
        }
      },
      updateCourse: function UpdateCoures(course) {
        var copy = angular.copy(course),
          prepared = serialization.prepare(copy),
          empty = new Course();
        angular.extend(empty, prepared);
        var deferred = $q.defer();
        empty.$update()
          .then(function (updated) {
            var restored = serialization.restore(updated);
            if (courses) {
              var index;
              var found = courses.some(function findIndex(obj, ind) {
                index = ind;
                return obj.id === updated.id;
              });
              if (found) {
                courses[index] = restored;
                deferred.resolve(restored);
              }
            } else {
              deferred.resolve(restored);
            }
          }, function (err) {
            deferred.reject();
          });
        return deferred.promise;
      }
    };

    return serviceInstance;
  }
})();
