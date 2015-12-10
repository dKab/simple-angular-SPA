/**
 * Created by Dmitry_Kabardinov on 12/10/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.directive('mask', inputMaskDirective);

  function inputMaskDirective() {

    function postLink(scope, elem, attrs, ngModelCtrl) {

      function filterString(text) {
        var pattern, regEx, pass, acceptableViewVal;
        if (!text) {
          return text;
        }

        pattern = getPartialPattern(text.length, attrs.mask);
        regEx = new RegExp(pattern);
        pass = regEx.exec(text);

        acceptableViewVal  = pass ? pass.shift() : ngModelCtrl.$modelValue;

        ngModelCtrl.$setViewValue(acceptableViewVal);
        ngModelCtrl.$render();
        return acceptableViewVal;
      }

      ngModelCtrl.$parsers.unshift(filterString);

    }

    function getPartialPattern(length, pattern) {
      if (length > pattern.length) {
        return pattern;
      }
      var chars = 0;
      for (var i=0; i < pattern.length && chars < length; i++ ) {
        if (pattern[i] === '\\') {
          continue;
        }
        chars++;
      }
      return pattern.substr(0, i);
    }

    return {
      link: postLink,
      restrict: 'A',
      require: 'ngModel'
    };
  }
})();
