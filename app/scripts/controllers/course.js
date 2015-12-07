/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.controller('CourseController', ['$routeParams', 'srUtil', CourseController]);

  function CourseController($routeParams, srUtil) {

    var course = this;
    course.header = $routeParams.id === 'new' ? 'Новый курс'
      : /*Course.get($routeParams.name).name;*/ $routeParams.id;

    course.availableAuthors = [
      'Пушкин',
      'Лермонтов',
      'Гоголь',
      'Толстой',
      'Достоевский',
      'Горький',
      'Чехов',
      'Есенин'
    ];

    course.authors = [];

    course.submitIfValid = function submitIfValid(form) {
        if (form.$valid) {
         //do smthing
        }
    };

    course.srNotifyAuthorSelected = function srNotifyAuthorSelected (author) {
        var msg = 'Автор ' + author + ' был добавлен в список выбранныx авторов';
        srUtil.notify(msg, 5000);
    };

    course.srNotifyAuthorRemoved = function srNotifyAuthorSelected(author) {
      var msg = 'Автор ' + author + ' был удален из списка выбранных авторов';
      srUtil.notify(msg, 5000);
    };

  }
})();
