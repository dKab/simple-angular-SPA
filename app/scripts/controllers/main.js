/**
 * Created by Dmitry_Kabardinov on 12/9/2015.
 */
'use strict';
(function () {
  var app = angular.module('courses');
  app.controller('MainController', ['authService', '$scope', '$location', MainAppController]);

  function MainAppController(authService, $scope, $location) {
    var main = this;
    main.showUserBlock = authService.isUserLoggedIn();
    $scope.$on('logout', function redirectToLoginPage() {
      main.showUserBlock = false;
      $location.path('/login');
    });
  }
})();
