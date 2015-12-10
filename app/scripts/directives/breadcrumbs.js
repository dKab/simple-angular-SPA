/**
 * Created by Dmitry_Kabardinov on 12/9/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.directive('breadcrumbs', ['$location', breadcrumbsDirective]);

  function breadcrumbsDirective($location) {

    function link(scope) {
      scope.currentUrl = $location.path();
      scope.$on('$locationChangeStart', function() {
        scope.currentUrl = $location.path();
      });
    }
    return {
      link: link,
      replace: true,
      scope: {
        source: '='
      },
      templateUrl: 'views/breadcrumbs.html'
    };
  }
})();

