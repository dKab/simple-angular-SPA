/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');
  function headerBlock() {
    return {
      replace: true,
      transclude: true,
      templateUrl: '/views/header-block.html'
    };
  }

  app.directive('headerBlock', headerBlock);
})();
