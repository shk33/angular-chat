/*global Firebase*/

(function (angular) {
  'use strict';

  angular.module('angularApp').service('MessageService', function(FBURL, $q) {
    var messageRef = new Firebase(FBURL).child('messages');
    return {
      childAdded: function childAdded(limitNuber, cb) {
        messageRef.startAt().limit(limitNuber).on('child_added', function (snapshot) {
          var val = snapshot.val();
          cb.call(this, {
            user: val.user,
            text: val.text,
            key:  snapshot.key()
          });
        });
      },

      add: function addMessage(message) {
        messageRef.push(message);
      },

      off: function turnMessagesOff() {
        messageRef.off();
      },

      pageNext: function pageNext (key, numberOfItems) {
        var defered  = $q.defer();
        var messages = [] ;
        messageRef.startAt(null, key).limit(numberOfItems).once('value', function(snapshot) {
          snapshot.forEach(function (snapItem) {
            var itemVal = snapshot.val();
            itemVal.key = snapItem.key();
            messages.push(itemVal);
          });
          defered.resolve();
        });
        return defered.promise;
      },

      pageBack: function pageBack (key, numberOfItems) {
        var defered  = $q.defer();
        var messages = [] ;
        messageRef.endAt(null, key).limit(numberOfItems).once('value', function(snapshot) {
          snapshot.forEach(function (snapItem) {
            var itemVal = snapshot.val();
            itemVal.key = snapItem.key();
            messages.push(itemVal);
          });
          defered.resolve();
        });
        return defered.promise;
      }
    };
  });

})(window.angular);