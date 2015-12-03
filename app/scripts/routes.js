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
        requireLogin: true
      })
      .when('/courses/:id', {
        templateUrl: 'views/course.html',
        controller: 'CourseController',
        controllerAs: 'course',
        requireLogin: true
      })
      .otherwise({
        redirectTo: '/courses'
      });
  }]);
