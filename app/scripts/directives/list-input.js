/**
 * Created by Dmitry_Kabardinov on 12/5/2015.
 */
'use strict';
(function() {
  var app = angular.module('coures');


  app.directive('list-input', listInputDirective);

  function listInputDirective() {

    function link(scope, element, attrs, tabsCtrl) {

    }

    return {
      restrict: 'E',
      link: link,
      template: 'views/list-input.html',
      scope: {
        options: '@'
      }
    };
  }
})();
