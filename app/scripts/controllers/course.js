/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.controller('CourseController', ['$routeParams', '$document', '$timeout', CourseController]);

  function CourseController($routeParams, $document, $timeout) {

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
          return true;
        } else {
          console.log(form);
        }
    };

    course.srNotifyAuthorSelected = function(author) {
      var alert = $document[0].createElement('div'),
        msg = 'Автор ' + author + ' был добавлен в список выбранныx авторов';
      angular.element(alert)
        .attr('role', 'alert')
        .text(msg)
        .addClass('sr-only');
      $document.find('body').append(alert);
      $timeout(function destroyAlert() {
        angular.element(alert).remove();
      }, 5000);
    };

    course.srNotifyAuthorUnselected = function() {

    };

  }
})();
