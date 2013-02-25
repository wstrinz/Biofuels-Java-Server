/*
 * File: app.js
 */

var webSocket = new WebSocketRails('localhost:3000/websocket');

webSocket.on_open = function() {
      console.log('the sockets are open')
    };
    webSocket.on_close = function() {
      console.log('websocket onClose!!');
    };
    webSocket.on_message = function(message) {

      console.log('received msg!')

    };
    webSocket.on_error = function() {
      console.log('websocket onError!!');
    };


Ext.application({
    autoCreateViewport: true,
    name: 'BiofuelsModerator',
    appFolder: '/assets/moderator',


    //--------------------------------------------------------------------------
    init: function(application) {

      webSocket.on_open = function() {
        console.log('the sockets are open')
      };
      webSocket.on_close = function() {
        console.log('websocket onClose!!');
      };
      webSocket.on_message = function(message) {

        // var json = JSON.parse(message.data);
        // var index;
        // for (index = 0; index < self.networkEvents.length; index++) {
        //   var ne = self.networkEvents[index];
        //   if (!json.event.localeCompare(ne.name)) {
        //     ne.processor.call(ne.scope, json);
        //   }
        // }
      };
      webSocket.on_error = function() {
        console.log('websocket onError!!');
      };

      Ext.Loader.setConfig({
          enabled: true
      });
    },

    //--------------------------------------------------------------------------
    launch: function(profile) {
    }

});
