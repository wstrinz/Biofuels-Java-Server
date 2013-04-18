
var cleanEnvironment = function(){
  var backchannel = new WebSocketRails('localhost:3000/websocket')
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

  var clickAdvance = function(extInstance){
      progressPanel = extInstance.ComponentQuery.query('.progressPanel')[0]
      var target = null
      for (var i = 0; i < progressPanel.stageBar.markers.length; i++) {
        if(progressPanel.stageBar.markers[i].markerSprites)
          target = i
      };

      if(target!=null){
        progressPanel.stageBar.markers[target].handleOnClick()
        return true
      }
      else{
        return false
      }
  };

