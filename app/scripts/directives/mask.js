/**
 * Created by Dmitry_Kabardinov on 12/10/2015.
 */
'use strict';
(function () {
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
        /*
         We forbid user to type wrong characters by setting viewValue to the modelValue
         (which is the value that were there BEFORE user typed another symbol) in case user tries to enter not what we want.
         Since same process were applied to every character that user typed, `ngModelCtrl.$modelValue` contains a correct PARTIAL value.
         But since we can't know if part of the date is valid until we have whole string (at least I don't know how to do it gracefully),
         we need to set ngModel option `allowInvalid` to `true` in order to have access to `ngModelCtrl.$modelValue` (i.e. already typed in part of the date),
         otherwise ngModel will reset to `undefined` because one of our $validators returns `false` for partial date strings such as "13.01"
         */
        acceptableViewVal = pass ? pass.shift() : ngModelCtrl.$modelValue;

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
      for (var i = 0; i < pattern.length && chars < length; i++) {
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
