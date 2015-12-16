/**
 * Created by KimJin-young on 2015. 12. 14..
 */


(function(){

  'use strict';

  angular
    .module('com.module.sandbox')
    .controller('DialogCtrl',demoCtrl);

    function demoCtrl($scope, $mdDialog, $mdMedia ,$mdSticky) {

      $scope.status = ' ';
      $scope.customFullscreen = $mdMedia('sm');

      $scope.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('This is an alert title')
            .textContent('You can specify some description text in here.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
      }; // function showAlert

      $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogAdvanceCtrl,
          templateUrl: 'modules/sandbox/views/tmpl/dialog1.tmpl.html',
          parent: angular.element(document.querySelector('#sandboxMain')),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $mdMedia('sm') && $scope.customFullscreen
        })
          .then(function(answer){
            $scope.status = 'You said the information was "' + answer + '".';
          },function(){
            $scope.status = 'You canceled the dialog.';
          });

        $scope.$watch(function(){
          return $mdMedia('sm');
        },function(sm){
          $scope.customFullscreen = (sm === true);
        })
      };


      $scope.showTabDialog = function(ev) {
        $mdDialog.show({
          controller: DialogAdvanceCtrl,
          templateUrl: 'modules/sandbox/views/tmpl/tabdialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
      };

    } // function demoCtrl



    function DialogAdvanceCtrl($scope, $mdDialog) {

        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };

    }

})();
