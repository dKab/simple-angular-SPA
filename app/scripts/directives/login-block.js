/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.directive('loginBlock', loginBlock);

  function loginBlock() {
    return {
       templateUrl: 'views/login-block.html',
       controller: ['$log', '$location', controller],
       controllerAs: 'user',
       replace: true
    };
  }

  function controller($log, $location) {
    this.login = 'Дмитрий Кабардинов';
    this.logOut = function logOut () {
      $log.log('signing out');
      $location.path('/login');
    };
  }
})();
