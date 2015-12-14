/**
 *
 * Created by KimJin-young on 2015. 12. 12..
 */

(function(){

  'use strict';

  angular
    .module('com.module.sandbox')
    .controller('AutoCompleteCtrl',function($timeout, $q, $log){

      var self = this;

      self.simulateQuery = false;
      self.isDisabled    = false;


      // list of 'item' value/display obejcts
      self.items = loadAll();
      self.querySearch = querySearch;

      function loadAll() {
        var items = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
        return items.split(/, +/g).map( function (item) {

          return {
            value: item.toLowerCase(),
            display: item
          };
        });
      }

      // ******************************
      // Internal methods
      // ******************************
      /**
       * Search for states... use $timeout to simulate
       * remote dataservice call.
       */
      function querySearch (query) {

        $log.info('xxxxxxx');

        var results = query ? self.items.filter( createFilterFor(query) ) : self.items,
          deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
      }

      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
          return (item.value.indexOf(lowercaseQuery) === 0);
        };
      }



    });







})();
