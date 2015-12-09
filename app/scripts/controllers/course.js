/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.controller('CourseController', ['$routeParams', 'srUtil', '$log', '$location', 'coursesService', '$scope', CourseController]);

  function CourseController($routeParams, srUtil, $log, $location, coursesService, $scope) {

    var ctrl = this;

    ctrl.course = {
      authors: []
    };

    ctrl.setBreadcrumbs = function setBreadcrumbs(title) {
      $scope.$parent.main.breadcrumbs = [{
        url: '#/courses',
        title: 'Курсы'
      }, {
        url: '#' + $location.path(),
        title: title
      }];
    };

    $scope.$watch(angular.bind(ctrl, function() {
      return this.course.title;
    }), function(newVal, oldVal) {
      if (typeof oldVal === 'undefined' && isNewCourse ) {
        return false;
      }
      ctrl.setBreadcrumbs(newVal);
    });

    var isNewCourse = $routeParams.id === 'new';

    if (isNewCourse) {
      ctrl.setBreadcrumbs('Новый курс');
    } else {
      var courseId = $routeParams.id;
      coursesService.getCourse(courseId)
        .then(function(course) {
          ctrl.course = course;
          ctrl.setBreadcrumbs(course.title);
        }, function(error) {
          if (error.status === 404) {
            ctrl.courseNotFound = true;
          } else {
            $log.error(error);
          }
        });
    }

    ctrl.availableAuthors = [
      'Пушкин',
      'Лермонтов',
      'Гоголь',
      'Толстой',
      'Достоевский',
      'Горький',
      'Чехов',
      'Есенин',
      'Фет'
    ];

    ctrl.submitIfValid = function submitIfValid(form) {
      if (form.$invalid) {
        return;
      }
      if (ctrl.course.id) {
        coursesService.updateCourse(ctrl.course)
          .then(function(course) {
            $location.path('/courses');
          });
      } else {
        coursesService.saveCourse(ctrl.course)
          .then(function(course) {
            $location.path('/courses');
          }, function(error) {
            $log.error(error);
          });
      }
    };

    ctrl.srNotifyAuthorSelected = function srNotifyAuthorSelected (author) {
        var msg = 'Автор ' + author + ' был добавлен в список выбранных авторов';
        srUtil.notify(msg, 5000);
    };

    ctrl.srNotifyAuthorRemoved = function srNotifyAuthorSelected(author) {
      var msg = 'Автор ' + author + ' был удален из списка выбранных авторов';
      srUtil.notify(msg, 5000);
    };
  }
})();
