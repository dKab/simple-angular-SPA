/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.controller('CoursesListController', ['coursesService', coursesListController]);

  function coursesListController(coursesService) {
    this.filterCourses = function filterCourses() {

    };
    var _self = this;

    this.congfirmDelete = function confirmDelete(course) {
      this.courseToDelete = course;
      angular.element('#confirm_delete_course').modal();
    };

    this.deleteCourse = function() {
      coursesService.deleteCourse(this.courseToDelete)
        .then(function() {
          _self.closeConfirmationWindow();
        });
    };

    this.closeConfirmationWindow = function closeConfirmationWindow() {
        angular.element('#confirm_delete_course').modal('hide');
    };
    this.list = coursesService.getCourses();
  }

})();
