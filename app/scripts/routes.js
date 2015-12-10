/**
 * Created by Dmitry_Kabardinov on 12/2/2015.
 */
'use strict';
angular.module('courses')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
      })
      .when('/courses', {
        templateUrl: 'views/courses-list.html',
        controller: 'CoursesListController',
        controllerAs: 'courses',
        requiresLogin: true
      })
      .when('/courses/new', {
        templateUrl: 'views/course.html',
        controller: 'CourseController',
        controllerAs: 'ctrl',
        requiresLogin: true
      })
      .when('/courses/:id', {
        templateUrl: 'views/course.html',
        controller: 'CourseController',
        controllerAs: 'ctrl',
        requiresLogin: true,
        resolve: {
          'course': ['coursesService', '$route', '$q', function(coursesService, $route, $q) {
            var id = $route.current.params.id,
              pattern = /^\d+$/,
              paramIsValid = pattern.test(id);
            var deferred = $q.defer();
            if (paramIsValid) {
              coursesService.getCourse(id)
                .then(function(gjhjhg) {
                deferred.resolve(gjhjhg);
              }, function() {
                deferred.resolve(404);
              });
            } else {
              deferred.resolve(404);
            }
            return deferred.promise;
          }]
        }
      })
      .otherwise({
        redirectTo: '/courses'
      });
  }]);
