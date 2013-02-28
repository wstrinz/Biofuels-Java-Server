/*
WebsocketRails JavaScript Client

Setting up the dispatcher:
  var dispatcher = new WebSocketRails('localhost:3000');
  dispatcher.on_open = function() {
    // trigger a server event immediately after opening connection
    dispatcher.trigger('new_user',{user_name: 'guest'});
  })

Triggering a new event on the server
  dispatcherer.trigger('event_name',object_to_be_serialized_to_json);

Listening for new events from the server
  dispatcher.bind('event_name', function(data) {
    console.log(data.user_name);
  });
*/
(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};window.WebSocketRails=function(){function t(n,r){this.url=n,this.use_websockets=r!=null?r:!0,this.pong=e(this.pong,this),this.supports_websockets=e(this.supports_websockets,this),this.dispatch_channel=e(this.dispatch_channel,this),this.subscribe_private=e(this.subscribe_private,this),this.subscribe=e(this.subscribe,this),this.dispatch=e(this.dispatch,this),this.trigger_event=e(this.trigger_event,this),this.trigger=e(this.trigger,this),this.bind=e(this.bind,this),this.connection_established=e(this.connection_established,this),this.new_message=e(this.new_message,this),this.state="connecting",this.callbacks={},this.channels={},this.queue={},!this.supports_websockets()||!this.use_websockets?this._conn=new t.HttpConnection(n,this):this._conn=new t.WebSocketConnection(n,this),this._conn.new_message=this.new_message}return t.prototype.new_message=function(e){var n,r,i,s,o,u;u=[];for(i=0,s=e.length;i<s;i++)r=e[i],n=new t.Event(r),n.is_result()?((o=this.queue[n.id])!=null&&o.run_callbacks(n.success,n.data),this.queue[n.id]=null):n.is_channel()?this.dispatch_channel(n):n.is_ping()?this.pong():this.dispatch(n),this.state==="connecting"&&n.name==="client_connected"?u.push(this.connection_established(n.data)):u.push(void 0);return u},t.prototype.connection_established=function(e){this.state="connected",this.connection_id=e.connection_id,this._conn.flush_queue(e.connection_id);if(this.on_open!=null)return this.on_open(e)},t.prototype.bind=function(e,t){var n,r;return(r=(n=this.callbacks)[e])==null&&(n[e]=[]),this.callbacks[e].push(t)},t.prototype.trigger=function(e,n,r,i){var s;return s=new t.Event([e,n,this.connection_id],r,i),this.queue[s.id]=s,this._conn.trigger(s)},t.prototype.trigger_event=function(e){var t,n,r;return(r=(t=this.queue)[n=e.id])==null&&(t[n]=e),this._conn.trigger(e)},t.prototype.dispatch=function(e){var t,n,r,i,s;if(this.callbacks[e.name]==null)return;i=this.callbacks[e.name],s=[];for(n=0,r=i.length;n<r;n++)t=i[n],s.push(t(e.data));return s},t.prototype.subscribe=function(e){var n;return this.channels[e]==null?(n=new t.Channel(e,this),this.channels[e]=n,n):this.channels[e]},t.prototype.subscribe_private=function(e){var n;return this.channels[e]==null?(n=new t.Channel(e,this,!0),this.channels[e]=n,n):this.channels[e]},t.prototype.dispatch_channel=function(e){if(this.channels[e.channel]==null)return;return this.channels[e.channel].dispatch(e.name,e.data)},t.prototype.supports_websockets=function(){return typeof WebSocket=="function"||typeof WebSocket=="object"},t.prototype.pong=function(){var e;return e=new t.Event(["websocket_rails.pong",{},this.connection_id]),this._conn.trigger(e)},t}()}).call(this);