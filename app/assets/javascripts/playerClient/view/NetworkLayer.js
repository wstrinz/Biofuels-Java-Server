/*
 * File: NetworkLayer.js
 */

 // TODO: would be nice if this could be shared between: player, moderator, global projects?
Ext.define('Biofuels.view.NetworkLayer', {

    //--------------------------------------------------------------------------
    constructor: function() {

    	this.networkEvents = new Array();
    },

    //--------------------------------------------------------------------------
    registerListener: function(eventName, eventProcessor, scope) {
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
    WsConnection.websocket = new WebSocketRails('localhost:3000/websocket');

    var self = this;
    WsConnection.webSocket.on_open = function() {
      console.log('the sockets are open')
    };
    WsConnection.webSocket.on_close = function() {
      console.log('WsConnection.websocket onClose!!');
    };
    WsConnection.webSocket.on_message = function(message) {

      // var json = JSON.parse(message.data);
      // var index;
      // for (index = 0; index < self.networkEvents.length; index++) {
      //   var ne = self.networkEvents[index];
      //   if (!json.event.localeCompare(ne.name)) {
      //     ne.processor.call(ne.scope, json);
      //   }
      // }
    };
    WsConnection.webSocket.on_error = function() {
      console.log('websocket onError!!');
    };


    var success = function(channelID) {
      console.log('assigned id '+ channelID);

      WsConnection.webSocket.id = channelID.toString();

      var channel = WsConnection.websocket.subscribe(channelID.toString());

      channel.bind('event', function(message){
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
    }

    WsConnection.webSocket.trigger('get_new_id', 'blank', success);

		/*var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;

		var self = this;
		this.webSocket = new WS('ws://' + ipAddr + ':' + port + url);

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

  subscribe: function(channel){
    self = this;
    WsConnection.webSocket.subscribe(channel).bind('event', function(message){
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

    //--------------------------------------------------------------------------
	send: function(json) {
    var sendArray = new Array();
    sendArray.push(WsConnection.webSocket.id);
    sendArray.push(json);
    WsConnection.webSocket.trigger('receive_event', sendArray);
	}

});