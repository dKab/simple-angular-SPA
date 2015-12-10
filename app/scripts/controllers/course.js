/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.controller('CourseController', ['coursesService', 'srUtil', '$location', '$log', '$scope', '$route', CourseController]);

  function CourseController(coursesService, srUtil,  $location, $log, $scope, $route) {

    var ctrl = this;

    var course =  $route.current.locals.course;

    if (typeof course === 'undefined') {
      ctrl.course = {
        authors: []
      };
      ctrl.isNewCourse = true;
      setBreadcrumbs('Новый курс');
    } else if (course === 404) {
      ctrl.courseNotFound = true;
      setBreadcrumbs('Курс не найден');
    } else {
      ctrl.course = course;
      setBreadcrumbs(course.title);
    }


    $scope.$watch(angular.bind(ctrl, function() {
      return this.course.title;
    }), function(newVal, oldVal) {
      if (typeof oldVal === 'undefined' && ctrl.isNewCourse ) {
        return false;
      }
      setBreadcrumbs(newVal);
    });

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
        return false;
      } else if (ctrl.isNewCourse) {
        coursesService.saveCourse(ctrl.course)
          .then(function() {
            $location.path('/courses');
          }, function(error) {
            $log.error(error);
          });
      } else if (ctrl.course.id) {
        coursesService.updateCourse(ctrl.course)
          .then(function() {
            $location.path('/courses');
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

    function setBreadcrumbs(title) {
      $scope.$parent.main.breadcrumbs = [{
        url: '#/courses',
        title: 'Курсы'
      }, {
        url: '#' + $location.path(),
        title: title
      }];
    }
  }
})();
