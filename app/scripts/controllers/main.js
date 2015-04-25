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

    MessageService.childAdded(10 , function (addedChild) {
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

    $scope.pageNext = function () {
      var lastItem = $scope.messages[$scope.messages.length -1 ];
      MessageService.pageNext(lastItem.key, 10).then(function(messages) {
        $scope.messages = messages;
        console.log(messages);
      });
    };

    $scope.pageBack = function () {
      var lastItem = $scope.messages[0];
      MessageService.pageBack(lastItem.key, 10).then(function(messages) {
        $scope.messages = messages;
        console.log(messages);
      });
    };

  });
