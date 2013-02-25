/*
 * File: NetworkLayer.js
 */

 // TODO: would be nice if this could be shared between: player, moderator, global projects?
Ext.define('BiofuelsModerator.view.NetworkLayer', {


    //--------------------------------------------------------------------------
    constructor: function() {
      var self = this;

      this.networkEvents = new Array();
      webSocket.bind('event', function(message){
        // console.log('receive ' + message)
        // console.log(self.networkEvents)
        var json = JSON.parse(message);
        var index;
        for (index = 0; index < self.networkEvents.length; index++) {
          var ne = self.networkEvents[index];
          if (!json.event.localeCompare(ne.name)) {
            ne.processor.call(ne.scope, json);
          }
        }
      });
    },

    /*receiveEvent: function(message){
      var self = this;
      console.log('receive ' + message)
      console.log(this)
      var json = JSON.parse(message);
      var index;
      for (index = 0; index < this.networkEvents.length; index++) {
        var ne = this.networkEvents[index];
        if (!json.event.localeCompare(ne.name)) {
          ne.processor.call(ne.scope, json);
        }
      }
    },*/
    //--------------------------------------------------------------------------
    registerListener: function(eventName, eventProcessor, scope) {
      console.log('reg listener')
    	var event = {
    		name: eventName,
    		processor: eventProcessor,
    		scope: scope
    	};

    	this.networkEvents.push(event);
    },

    //--------------------------------------------------------------------------
	openSocket: function(ipAddr,port,url) {

		// var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;

		var self = this;

  //   var webSocket = new WebSocketRails('localhost:3000/websocket');

    /*webSocket.on_open = function() {
      console.log('the sockets are open')
    };
    webSocket.on_close = function() {
      console.log('websocket onClose!!');
    };
    webSocket.on_message = function(message) {

      var json = JSON.parse(message.data);
      var index;
      for (index = 0; index < self.networkEvents.length; index++) {
        var ne = self.networkEvents[index];
        if (!json.event.localeCompare(ne.name)) {
          ne.processor.call(ne.scope, json);
        }
      }
    };
    webSocket.on_error = function() {
      console.log('websocket onError!!');
    };*/

		/*this.webSocket = new WS('ws://' + ipAddr + ':' + port + url);

    this.webSocket.onopen = function() {
		};
		this.webSocket.onclose = function() {
			console.log('websocket onClose!!');
		};
		this.webSocket.onmessage = function(message) {

			var json = JSON.parse(message.data);
			var index;
			for (index = 0; index < self.networkEvents.length; index++) {
				var ne = self.networkEvents[index];
				if (!json.event.localeCompare(ne.name)) {
					ne.processor.call(ne.scope, json);
				}
			}
		};
		this.webSocket.onerror = function() {
			console.log('websocket onError!!');
		};*/
	},

    //--------------------------------------------------------------------------
	send: function(json) {
    // console.log('sending')

		webSocket.trigger('receive_event', json);
	}

});
