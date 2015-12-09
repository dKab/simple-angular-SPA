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
  app.factory('clientStructuredDataStorage', ['localStorageService', 'SerializationService', clientStructuredDataStorage]);

  function clientStructuredDataStorage (localStorageService, SerializationService) {

    var service = {},
      storage = localStorageService,
      serialization = SerializationService,
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


    service.addObject = function addObjectToCollection(collectionName, object) {
      object.id = Date.now();
      var collection = data[collectionName].actualData;
      if (collection) {
        collection.push(object);
      } else {
          data[collectionName].actualData = [object];
      }
      storage.set(collectionName, safeDateSerializeCollection(collection));
      return object;
    };

    service.updateObject = function updateObject(collectionName, object) {
      var collection = data[collectionName].actualData;
      if (collection) {
        var index;
        var found = collection.some(function(item, ind) {
          index = ind;
          return (item.id == object.id);
        });
        if (found) {
          collection[index] = object;
          storage.set(collectionName, safeDateSerializeCollection(collection));
        }
      }
    };

    function safeDateSerializeCollection(collection) {
      var prepared = collection.map(serialization.prepare);
      return angular.toJson(prepared);
    }

    function safeDateJSONParse(json) {
      var collection = angular.fromJson(json), restored;
      restored = collection.map(serialization.restore);
      return restored;
    }

    return service;
  }
})();
