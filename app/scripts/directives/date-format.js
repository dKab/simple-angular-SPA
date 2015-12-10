/**
 * Created by Dmitry_Kabardinov on 12/10/2015.
 */
'use strict';
(function() {

  var app = angular.module('courses');

  app.directive('dateFormat', ['$filter', dateFormat]);


  function dateFormat($filter) {

    function postLink(scope, elem, attrs, ngModelCtrl) {

      var format = attrs.dateFormat;

      ngModelCtrl.$formatters.push(function (modelValue) {
        if (!modelValue) {
          return "";
        }
        return $filter('date')(modelValue, format);
      });

      ngModelCtrl.$validators.correctDate = function(modelValue) {
        /*
        * I'm going to implement validation only for 2 formats which are dd.MM.yyyy and ISO-8601 (yyyy-MM-dd)
        * because it's to much pain to deal with dates in JS. If other formats are needed
        * it's better to include some library. With moment js for instance the approach would be as simple as:
        * var date = moment(modelValue, format); date.isValid() ...
        * but I don't want to include whole momentjs lib just for one place and I only need dd.MM.yyyy format anyway.
        */
        if (modelValue instanceof Date) {
          return true;
        } else if (typeof modelValue === 'undefined' || modelValue === '') {
          return true;
        }
        var date;
        if (format === 'dd.MM.yyyy') {
          if (!modelValue.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
            return false;
          }
          var parts = modelValue.split('.'),
            year = parts.pop(), month = parts.pop(), day = parts.pop();
          date = new Date(year + '-' + month + '-' + day);
        } else if (format === 'yyyy-MM-dd') {
          date = new Date(modelValue);
        }
        return !isNaN(date);
      };

    }

    return {
      link: postLink,
      restrict: 'A',
      require: 'ngModel'
    };

  }

})();
