/**
 * Created by Dmitry_Kabardinov on 12/8/2015.
 */
'use strict';
(function() {
  var app = angular.module('courses');

  app.factory('SerializationService', serializeUtil);

  function serializeUtil() {
    var instance = {};

    /**
     * This function prepares object which may contain Date objects so that
     * Dates can be restored with restoreObjectDates function.
     * Theoretically it should handle nested objects of any depth because it's recursive but I hadn't chance to test it yet.
     * It's doing alright with one-level depth objects for sure though.
     * @param obj
     * @returns Object
     */
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

    /**
     * This function must be used after object was parsed from JSON to restore all Date objects if they were
     * processed with prepareObjectForSerialization
     * @param obj
     * @returns Object
     */
    function restoreObjectDates(obj) {
      var restoredObj = Array.isArray(obj) ? [] : {};
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (typeof obj[prop] === 'object' && obj[prop].isDate) {
            var dateObj = new Date();
            dateObj.setTime(obj[prop].timestamp);
            restoredObj[prop] = dateObj;
          } else if (typeof obj[prop] === 'object') {
            restoredObj[prop] = restoreObjectDates(obj[prop]);
          } else {
            restoredObj[prop] = obj[prop];
          }
        }
      }
      return restoredObj;
    }

    instance.prepare = prepareObjectForSerialization;

    instance.restore = restoreObjectDates;

    return instance;
  }
})();
