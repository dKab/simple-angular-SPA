/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.controller('CoursesListController', ['$log', 'coursesService', coursesListController]);

  function coursesListController($log, coursesService) {
    this.filterCourses = function filterCourses() {

    };
    var _self = this;

    this.congfirmDelete = function confirmDelete(course) {
      this.courseToDelete = course;
      angular.element('#confirm_delete_course').modal();
    };

    this.deleteCourse = function deleteCourse() {
      if (!this.courseToDelete) {
        $log.error('no course specified for removal');
        return false;
      }
      var index,
        found = this.list.some(function findIndexOfCourseToDelete(course, i) {
          index = i;
          return (course === _self.courseToDelete);
      });
      if (found) {
        this.list.splice(index, 1);
        return true;
      } else {
        $log.error('Error happened while deleting the course');
        return false;
      }
    };

    this.closeConfirmationWindow = function closeConfirmationWindow() {
        angular.element('#confirm_delete_course').modal('hide');
    };
    coursesService.query().$promise
      .then(function(array) {
        _self.list = array;
    });
  }

})();
