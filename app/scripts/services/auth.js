/**
 * Created by Dmitry_Kabardinov on 12/3/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.factory('authService', ['$q', '$timeout', '$window', 'localStorageService', authService]);
  //we'll be saving current user to localStorage so the session isn't loosed when user refreshes the page for whatever reason
  function authService($q, $timeout, $window, localStorageService) {

    var currentUser,
      storage = localStorageService,
      name = storage.get('userName'), _ = $window._,
      availableUsers = [
      {
        login: 'demo',
        password: 'demo123'
      }
    ];
     if ( name ) {
       currentUser = _.find(availableUsers, {login: name});
     }

    function validateUser(login, password) {
      var deferred = $q.defer();
      //emulating async call to server to check user credentials
      $timeout(function() {
        var user = _.find(availableUsers, {login: login, password: password});
        if (user) {
          deferred.resolve(user);
        } else {
          var err = new Error('No user with such login/password');
          deferred.reject(err);
        }
      });
      return deferred.promise;
    }

    function getCurrentUserName() {
      return currentUser && currentUser.login;
    }

    function getAllUsers() {
      return availableUsers;
    }

    function setCurrentUser(user) {
      currentUser = user;
      storage.set('userName', user.login);
    }

    function signOut() {
      currentUser = null;
      storage.remove('userName');
    }

    return {
      getCurrentUserName: getCurrentUserName,
      setCurrentUser: setCurrentUser,
      validateUser: validateUser,
      signOut: signOut,
      getAllUsers: getAllUsers,
      isUserLoggedIn: function() {
        return !!currentUser;
      }
    };
  }
})();
