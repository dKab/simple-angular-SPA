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
       controller: ['authService', '$location', controller],
       controllerAs: 'auth',
       replace: true
    };
  }

  function controller(authService, $location) {
    this.userName = authService.getCurrentUserName();
    this.logOut = function logOut () {
      authService.signOut();
      $location.path('/login');
    };
  }
})();
