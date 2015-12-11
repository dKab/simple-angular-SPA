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


        /**
         * This parser makes sure that we have actual Date type in our model
         * if the string that user typed in is a correct date string. Otherwise the model is just a string.
         * In conjunction with our custom validator (see below) setting $error.correctDate on the input if the date string
         * is invalid date the form will be $invalid and there's no way user can submit string instead of Date object.
         * (If, of course, necessary precautions are taken such as checking form validity before submitting it)
         */
        ngModelCtrl.$parsers.push(function (viewValue) {
        var ISOString = transformToISOFormat(viewValue);
        if (ISOString) {
          return dayExists(ISOString) ? new Date(ISOString) : viewValue;
        } else {
          return viewValue;
        }
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
        var ISOString;
        if (format === 'dd.MM.yyyy') {
          ISOString = transformToISOFormat(modelValue);
        } else if (format === 'yyyy-MM-dd') {
          ISOString = modelValue;
        }
        return dayExists(ISOString);
      };

      function transformToISOFormat(dateString) {
        var transformed;
        if (!dateString.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
          return false;
        }
        var parts = dateString.split('.'),
          year = parts.pop(), month = parts.pop(), day = parts.pop();
        transformed =  year + '-' + month + '-' + day;
        return transformed;
      }

      function dayExists(ISODateString) {
        var date = new Date(ISODateString);
        // this will filter out obvious wrong strings like '3425-86-32'
        if (isNaN(date)) {
          return false;
        }
        var formatted = $filter('date')(date, 'yyyy-MM-dd');
        /* This will filter more subtle cases e.g. `31.06.2018` (formatted will be 01.07.2018) because when new Date
           constructor auto corrects wrong date by replacing non-existing day with correct.
        */
        return formatted === ISODateString;
      }

    }

    return {
      link: postLink,
      restrict: 'A',
      require: 'ngModel'
    };

  }

})();
