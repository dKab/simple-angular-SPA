/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.controller('CoursesListController', ['$log', coursesListController]);

  function coursesListController($log) {
    this.filterCourses = function filterCourses() {

    };

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
        _self = this,
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
    this.list = [
      {
        id: 1,
        name: 'Course 1',
        duration: 380,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
        ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
        ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
        ' sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        starts: Date.now()
      }
    ];
  }

})();
