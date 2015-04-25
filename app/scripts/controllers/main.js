'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, $timeout, MessageService) {

    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages    = [];

    MessageService.childAdded(function (addedChild) {
      $timeout(function () {
        $scope.messages.push(addedChild);
      });
    });

    $scope.sendMessage = function () {
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      MessageService.add(newMessage);
    };

    $scope.turnFeedOff = function () {
      MessageService.off();
    };

  });
