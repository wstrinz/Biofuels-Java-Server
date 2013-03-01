/*
The channel object is returned when you subscribe to a channel.

For instance:
  var dispatcher = new WebSocketRails('localhost:3000/websocket');
  var awesome_channel = dispatcher.subscribe('awesome_channel');
  awesome_channel.bind('event', function(data) { console.log('channel event!'); });
  awesome_channel.trigger('awesome_event', awesome_object);
*/
(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};WebSocketRails.Channel=function(){function t(t,n,r){var i,s;this.name=t,this._dispatcher=n,this.is_private=r,this._failure_launcher=e(this._failure_launcher,this),this._success_launcher=e(this._success_launcher,this),this.dispatch=e(this.dispatch,this),this.trigger=e(this.trigger,this),this.bind=e(this.bind,this),this.is_private?s="websocket_rails.subscribe_private":s="websocket_rails.subscribe",i=new WebSocketRails.Event([s,{data:{channel:this.name}},this._dispatcher.connection_id],this._success_launcher,this._failure_launcher),this._dispatcher.trigger_event(i),this._callbacks={}}return t.prototype.bind=function(e,t){var n,r;return(r=(n=this._callbacks)[e])==null&&(n[e]=[]),this._callbacks[e].push(t)},t.prototype.trigger=function(e,t){var n;return n=new WebSocketRails.Event([e,{channel:this.name,data:t},this._dispatcher.connection_id]),this._dispatcher.trigger_event(n)},t.prototype.dispatch=function(e,t){var n,r,i,s,o;if(this._callbacks[e]==null)return;s=this._callbacks[e],o=[];for(r=0,i=s.length;r<i;r++)n=s[r],o.push(n(t));return o},t.prototype._success_launcher=function(e){if(this.on_success!=null)return this.on_success(e)},t.prototype._failure_launcher=function(e){if(this.on_failure!=null)return this.on_failure(e)},t}()}).call(this);