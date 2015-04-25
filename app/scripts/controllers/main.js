/*global Firebase*/
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
    var rootRef  = new Firebase('https://glowing-fire-3651.firebaseio.com/');
    var messagesRef = rootRef.child('messages');

    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages    = [];

    messagesRef.on('child_added',function(snapshot) {
      $timeout(function () {
        var snapshotVal = snapshot.val();
        $scope.messages.push({
          text: snapshotVal.text,
          user: snapshotVal.user,
          key:  snapshot.key()
        });
      });
    });

    messagesRef.on('child_changed',function(snapshot) {
      $timeout(function () {
        var snapshotVal = snapshot.val();
        var message = findMessageByKey(snapshot.key());
        message.text = snapshotVal.text;
      });
    });

    function findMessageByKey (key) {
      var messageFound = null;
      for (var i = 0; i < $scope.messages.length; i++) {
        var currentMessage = $scope.messages[i];
        if (currentMessage.key === key){
          messageFound = currentMessage;
          break;
        }
      }

      return messageFound;
    }

    $scope.sendMessage = function () {
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      messagesRef.push(newMessage);
    };

  });
