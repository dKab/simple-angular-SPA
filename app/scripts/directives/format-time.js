/**
 * Created by Dmitry_Kabardinov on 12/10/2015.
 */
'use strict';
(function () {
  var app = angular.module('courses');
  app.directive('formatTime', ['$filter', '$document', formatTimeDirective]);

  function formatTimeDirective($filter, $document) {

    function postLink(scope, elem, attrs, ngModelCtrl) {

      var formattedTimeContainer = $document[0].createElement('span'),
        wrapped = angular.element(formattedTimeContainer);
      wrapped.attr('role', 'presentation');

      var elemNextSibling = elem.next();

      if (elemNextSibling.length === 0) {
        elem.parent().append(formattedTimeContainer);
      } else {
        elem.parent()[0].insertBefore(formattedTimeContainer, elemNextSibling[0]);
      }
      var filterName = attrs.formatTime;

      scope.$watch(function() {
        return ngModelCtrl.$modelValue;
      }, function(newVal) {
        var pretty = newVal ? $filter(filterName)(newVal) : '';
        wrapped.text(pretty);
      });

      //make input display inline-block so that our span appears aside of it instead of dropping down
      elem[0].style.display = 'inline-block';
      elem[0].style.width = 'auto';
      elem[0].style.marginRight = '10px';
    }

    return {
      restrict: 'A',
      link: postLink,
      require: 'ngModel'
    };
  }

})();
