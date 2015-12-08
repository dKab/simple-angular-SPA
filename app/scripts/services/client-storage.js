/**
 * Created by Dmitry_Kabardinov on 12/4/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');
  /**
   * this service is going to persist our data to the html5 local storage and store it there in a serialised state
   * it's a little bit hacky - instead we could use indexedDB (another html5 feature https://developer.mozilla.org/ru/docs/IndexedDB)
   * or web SQL and it sure would be cleaner and more appropriate but these two latter options are far less supported in browsers:
   * http://caniuse.com/#search=Web%20SQL
   * http://caniuse.com/#search=indexedDB
   * http://caniuse.com/#search=localStorage
   */
  app.factory('clientStructuredDataStorage', ['localStorageService', clientStructuredDataStorage]);

  function clientStructuredDataStorage (localStorageService) {

    var service = {}, storage = localStorageService,
      data = {
        courses: {
          predefinedData: [
            {
              id: 1,
              title: 'Course 1',
              duration: 380,
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
              ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
              ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
              ' sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              date: new Date(2015, 11, 31),
              authors: [
                'Пушкин', 'Лермонтов'
              ]
            },
            {
              id: 2,
              title: 'Course 2',
              duration: 200,
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
              ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
              ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
              ' sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              date: new Date(2014, 11, 17),
              authors: [
                'Гоголь', 'Толстой'
              ]
            },
            {
              id: 3,
              title: 'Course 3',
              duration: 200,
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
              ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
              ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
              ' sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              date: new Date(2013, 0, 22),
              authors: [
                'Фет', 'Есенин'
              ]
            }
          ]
        }
      };

    function initializeData() {
      var collectionName;
      for (var prop in data) {
        if (!data.hasOwnProperty(prop)) {
          continue;
        }
        collectionName = prop;
        var storedCollectionJSON = storage.get(collectionName);
        if (storedCollectionJSON) {
            data[prop].actualData = safeDateJSONParse(storedCollectionJSON);
        } else if (data[prop].predefinedData) {
            data[prop].actualData = data[prop].predefinedData;
            storage.set(collectionName, safeDateSerializeCollection(data[prop].predefinedData));
        }
      }
    }

    initializeData();

    service.getCollection = function getCollection(collectionName) {
        return data[collectionName].actualData;
    };

    /**
     * @param collectionName
     * @param id
     */
    service.deleteObjectFromCollection = function deleteObjectFromCollection(collectionName, id) {
      var index,
        collection = data[collectionName].actualData,
        found = collection.some(function findIndexOfItemToDelete(item, i) {
          index = i;
          return (id == item.id);
        });
      if (found) {
        collection.splice(index, 1);
        storage.set(collectionName, safeDateSerializeCollection(collection));
      }
    };

    service.getById = function getObjectById(collectionName, id) {
      var collection = data[collectionName].actualData,
        obj, found;
      found = collection.some(function(current) {
        var currentItemIsWhatWeAreLookingFor = (current.id == id);
        if (currentItemIsWhatWeAreLookingFor)  {
          obj = current;
        }
        return currentItemIsWhatWeAreLookingFor;
      });
      return found ? obj : null;
    };

    /**
     * This function serializes collection of objects which may contain Date objects so that
     * Dates can be restored with safeDateJSONParse function.
     * Theoretically it should handle nested objects of any depth because it's recursive but I hadn't time to test it.
     * It's doing alright with one-level depth objects for sure though.
     * @param collection
     * @returns string
     */
    function safeDateSerializeCollection(collection) {

      var prepared = collection.map(prepareObjectForSerialization);
      function prepareObjectForSerialization(obj) {
        var JSONSafeRepresentation = Array.isArray(obj) ? [] : {};
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] === 'object' && !(obj[prop] instanceof Date)) {
              JSONSafeRepresentation[prop] = prepareObjectForSerialization(obj[prop]);
            } else if (obj[prop] instanceof Date) {
              JSONSafeRepresentation[prop] = {
                timestamp: obj[prop].getTime(),
                isDate: true
              };
            } else {
              JSONSafeRepresentation[prop] = obj[prop];
            }
          }
        }
        return JSONSafeRepresentation;
      }
      return angular.toJson(prepared);
    }

    /**
     * This function must be used after collection has been parsed from JSON to restore all Date objects if they were
     * processed with safeDateSerializeCollection
     * @param json
     * @returns array
     */
    function safeDateJSONParse(json) {
      var collection = angular.fromJson(json), restored;
      restored = collection.map(restoreDates);

      function restoreDates(obj) {
        var restoredObj = Array.isArray(obj) ? [] : {};
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] === 'object' && obj[prop].isDate) {
              var dateObj = new Date();
              dateObj.setTime(obj[prop].timestamp);
              restoredObj[prop] = dateObj;
            } else if (typeof obj[prop] === 'object') {
              restoredObj[prop] = restoreDates(obj[prop]);
            } else {
              restoredObj[prop] = obj[prop];
            }
          }
        }
        return restoredObj;
      }

      return restored;
    }

    return service;
  }
})();
