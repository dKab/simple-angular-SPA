/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.controller('CourseController', ['$routeParams', 'srUtil', '$log', '$location', 'coursesService', CourseController]);

  function CourseController($routeParams, srUtil, $log, $location, coursesService) {

    var ctrl = this;

    ctrl.course = {
      authors: []
    };

    if ($routeParams.id !== 'new') {
      var courseId = $routeParams.id;
      coursesService.getCourse(courseId)
        .then(function(course) {
          ctrl.course = course;
          ctrl.header = course.title;
        }, function(error) {
          if (error.status === 404) {
            ctrl.courseNotFound = true;
          } else {
            $log.error(error);
          }
        });
    }

    ctrl.header = $routeParams.id === 'new' ? 'Новый курс' : '';

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
        coursesService.update();
      } else {
        coursesService.add();
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
