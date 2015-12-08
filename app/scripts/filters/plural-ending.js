/**
 * Created by Dmitry_Kabardinov on 12/8/2015.
 */
'use strict';
(function() {
  var filtersModule = angular.module('filters');

  filtersModule.filter('getEnding', ['$log',getEndingFilter]);
  function getEndingFilter($log) {

  /**
   * @param number
   * @param words should have exactly 3 elements, corresponding forms of 1, 2-4 and 5-10 eg ['час', 'часа', 'часов']
   * @returns {*}
   */
  function getEnding(number, words) {
    number = parseInt(number);
    var secondParamIsWrong = !Array.isArray(words) || words.length !== 3;
    if (isNaN(number) || secondParamIsWrong) {
      $log.error('Wrong parameter passed to getEnding filter');
      return;
    }
    if (10 <= number && number <= 20) {
      return words[2];
    }
    var lastDigit = number % 10;
    if (lastDigit === 1) {
      return words[0];
    } else if (  1 < lastDigit && lastDigit < 5 ) {
      return words[1];
    } else {
      return words[2];
    }
  }
    return getEnding;
  }
})();
