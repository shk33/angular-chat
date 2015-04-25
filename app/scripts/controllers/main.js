'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    var rootRef  = new Firebase("https://glowing-fire-3651.firebaseio.com/");
    var childRef = rootRef.child('message');

    childRef.on('value',function(snapshot) {
      $timeout(function () {
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        $scope.message = snapshotVal;
      });
    });

    $scope.$watch('message.text',function(newVal) {
      //Initially the newVal is undefined and we don't want this value
      //to be pushed to firebase
      if (!newVal) {
        return;
      }
      childRef.update({
        text: newVal
      });
    });

    // Create new
    $scope.setMessage = function () {
      childRef.set({
        user: 'Bob',
        text: 'Hi'
      });
    };

    //Update
    $scope.updateMessage = function () {
      childRef.update({
        text: 'Bye'
      });
    };

    //Delete
    $scope.deleteMessage = function () {
      childRef.remove();
    };

  });
