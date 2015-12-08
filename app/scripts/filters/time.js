/**
 * Created by Dmitry_Kabardinov on 12/8/2015.
 */
'use strict';
(function() {
    angular.module('filters')
      .filter('timeFormatter', ['$filter', timeFormatter]);

  function timeFormatter($filter) {

    function formatTime (minutes) {
      minutes = parseInt(minutes);
      if (isNaN(minutes)) {
        return;
      }
      if (minutes <= 0) {
        minutes = 0;
      }
      var hours = Math.floor(minutes/60),
        rest = hours !== 0 ? minutes % 60 : minutes,
        result = '';
      if (hours) {
        result =+ hours + ' ' + $filter('getEnding')(hours, ['час', 'часа', 'часов']);
        if (rest) {
          result += ' ' + rest + ' ' + $filter('getEnding')(rest, ['минута', 'минуты', 'минут']);
        }
      } else {
        result += rest + ' ' + $filter('getEnding')(rest, ['минута', 'минуты', 'минут']);
      }
      return result;
    }

    return formatTime;
  }
})();
