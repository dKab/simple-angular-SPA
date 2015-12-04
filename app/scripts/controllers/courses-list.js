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
        $log.error('No course specified for removal');
      }
      //var courseToDelete = coursesService.get(this.courseToDelete);
      this.courseToDelete.$remove().$promise
        .then(function() {
          _self.closeConfirmationWindow();
        }, function() {
          $log('Error happened while deleting the course');
        });
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
