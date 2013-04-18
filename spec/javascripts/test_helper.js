// var isdone = false
// // var waitForClear = function(){
//   var success = function(){
//     // alert("success!")
//     console.log('clearsucc')
//     return
//   }
//   webSocket.bind('clean_success',success)
  var backchannel = new WebSocketRails('localhost:3000/websocket')

var cleanEnvironment = function(){
  var success = function(){
    console.log('clearsucc')
    return
  }
  backchannel.trigger('clean_environment','blank', success)
};

var getComp = function(query) {
    // t.diag('query ' + query)
      return Ext.ComponentQuery.query(query)[0]
  };
// }

