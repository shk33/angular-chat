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

    $scope.setMessage = function () {
      rootRef.child('message').set({
        user: 'Bob',
        text: 'Hi'
      });
    };
  });
