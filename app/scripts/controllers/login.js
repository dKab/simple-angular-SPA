/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
(function () {
    var app = angular.module('courses');
    app.controller('LoginController', ['$location', 'authService', loginController]);

    function loginController($location, authService) {
      var auth = authService;
      this.doLogin = function doLogin() {
        var _self = this;
        auth.validateUser(_self.name, _self.password)
          .then(function(user) {
            auth.setCurrentUser(user);
            $location.path('/courses');
          }, function(err) {
            _self.accessDenied = true;
            _self.password = '';
          });
      };

      this.allUsers = auth.getAllUsers();

    }
})();
