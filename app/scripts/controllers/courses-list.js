/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.controller('CoursesListController', ['$scope', 'coursesService', coursesListController]);

  function coursesListController($scope, coursesService) {

    var ctrl = this;

    ctrl.filterString = '';

    ctrl.filterCourses = function filterCourses() {
      ctrl.searchCourseTitle = ctrl.filterString;
    };

    $scope.$watch(angular.bind(ctrl, function() {
      return this.filterString;
    }), function(newVal) {
        if (newVal === '') {
          ctrl.filterCourses();
        }
    });



    ctrl.congfirmDelete = function confirmDelete(course) {
      ctrl.courseToDelete = course;
      angular.element('#confirm_delete_course').modal();
    };

    ctrl.deleteCourse = function() {
      coursesService.deleteCourse(ctrl.courseToDelete)
        .then(function() {
          ctrl.closeConfirmationWindow();
        });
    };

    ctrl.closeConfirmationWindow = function closeConfirmationWindow() {
        angular.element('#confirm_delete_course').modal('hide');
    };
    coursesService.getCourses()
      .then(function(courses) {
      ctrl.list = courses;
    });
  }

})();
