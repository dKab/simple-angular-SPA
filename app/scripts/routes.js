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
      .when('/courses/:id', {
        templateUrl: 'views/course.html',
        controller: 'CourseController',
        controllerAs: 'ctrl',
        //requiresLogin: true,
        ////resolve: {
        ////  'course': function() {
        ////    $route.current.params
        ////    return coursesService.getCourseById
        ////  }
        //}
      })
      .otherwise({
        redirectTo: '/courses'
      });
  }]);
