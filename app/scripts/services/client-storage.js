/**
 * Created by Dmitry_Kabardinov on 12/4/2015.
 */
(function() {
  var app = angular.module('courses');
  /**
   * this service is going to persist our data to the html5 local storage and store it there in a serialised state
   * it's a little bit hacky - instead we could use indexedDB (another html5 feature https://developer.mozilla.org/ru/docs/IndexedDB)
   * or web SQL and it sure would be cleaner and more appropriate but these latter two options are far less supported in browsers:
   * http://caniuse.com/#search=Web%20SQL
   * http://caniuse.com/#search=indexedDB
   * http://caniuse.com/#search=localStorage
   */
  app.factory('clientStorage', ['localStorageService', clientStorage]);

  function clientStorage (localStorageService) {
    var service = {},
      courses, storage = localStorageService;
    var storedCoursesJSON = storage.get('courses');
    if (storedCoursesJSON) {
      courses = angular.fromJson(storedCoursesJSON);
    } else {
      courses = [
        {
          id: 1,
          name: 'Course 1',
          duration: 380,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
          ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
          ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
          ' sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          created: new Date(2011,10,30),
          authors: [
            'Пушкин', 'Лермонтов'
          ]
        }
      ];
      storage.set('courses', angular.toJson(courses));
    }

    service.getCourses = function getCourses() {
        return courses;
    };

    service.deleteCourse = function deleteCourse(id) {
      var index,
        courseToDelete = courses.some(function findIndexOfCourseToDelete(course, i) {
          index = i;
          return (course.id === id);
        });
      courses = courses.splice(index, 1);
      storage.set('courses', courses);
    };

    return service;
  }
})();
