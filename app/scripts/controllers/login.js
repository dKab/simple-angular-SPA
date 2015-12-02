/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function () {
    var app = angular.module('courses');
    app.controller('LoginController', ['$log', '$location', loginController]);
  function loginController($log, $location) {
    this.doLogin = function doLogin() {
      $log.log('logging in');
      $location.path('/courses');
    };
  }
})();
