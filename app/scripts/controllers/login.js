/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function () {
    var app = angular.module('courses');
    app.controller('LoginController', ['$location', 'authService', '$scope', loginController]);

    function loginController($location, authService, $scope) {

      var parentController = $scope.$parent.main;
      parentController.breadcrumbs = null;

      var login = this,
        auth = authService;

      login.doLogin = function doLogin() {
        auth.validateUser(login.name, login.password)
          .then(function(user) {
            auth.setCurrentUser(user);
            parentController.showUserBlock = true;
            $location.path('/courses');
          }, function(err) {
            login.accessDenied = true;
            login.password = '';
          });
      };

      login.allUsers = auth.getAllUsers();

    }
})();
