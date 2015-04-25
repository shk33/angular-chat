'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope) {
    var rootRef  = new Firebase("https://glowing-fire-3651.firebaseio.com/");
    var childRef = rootRef.child('message');

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
