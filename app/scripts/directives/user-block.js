/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.directive('userBlock', userBlock);

  function userBlock() {
    return {
       templateUrl: 'views/user-block.html',
       controller: ['authService', '$scope', controller],
       controllerAs: 'auth',
       replace: true
    };
  }

  function controller(authService, $scope) {
    var auth = this;
    auth.userName = authService.getCurrentUserName();
    auth.logOut = function logOut () {
      authService.signOut();
      $scope.$emit('logout');
    };
  }
})();
