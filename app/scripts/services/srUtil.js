/**
 * Created by dmitriy on 07.12.15.
 */
/**
 * This simple service provides utilities for accessibility
 */
'use strict';
(function() {

  var app = angular.module('courses');

  app.factory('srUtil', ['$document', '$timeout', srUtil]);

  function srUtil($document, $timeout) {
    /**
     * this function notifies screen reader user about some event by appending to the DOM message with role "alert"
     * which will self destruct after period of time
     * @param message
     * @param selfDestructAfterMilliseconds
     */
    function notifyScreenReader(message, selfDestructAfterMilliseconds) {
      var alert = $document[0].createElement('div');
      angular.element(alert)
        .attr('role', 'alert')
        .text(message)
        .addClass('sr-only'); //sr-only is a bootstrap class which hides element for a regular browser
      $document.find('body').append(alert);
      $timeout(function destroyAlert() {
        angular.element(alert).remove();
      }, selfDestructAfterMilliseconds);
    }

    return {
      notify: notifyScreenReader
    };
  }


})();
