/**
 * Created by KimJin-young on 2015. 12. 4..
 */
(function () {
  'use strict';

  angular
    .module('com.module.sandbox')
    .controller('NgMaterialCtrl', function ($scope) {
      $scope.myDate = new Date();
      $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() - 2,
        $scope.myDate.getDate());

      $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() + 2,
        $scope.myDate.getDate());

      $scope.onlyWeekendsPredicate = function (date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }
    })
})();
