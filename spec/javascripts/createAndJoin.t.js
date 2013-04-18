// spec/javascripts/joinGame.t.js


StartTest(function(t) {
  t.chain(
    {waitFor:function(){return Ext.ComponentQuery.query('window[title="Connecting to Server"]')[0] == null}},
    {waitFor:0.1},

    function(next) {
      var jgpop = Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0]
      var roombox = jgpop.getComponent('roomName')
      // t.type(roombox, "testroom")
      roombox.setValue("testroom")

      next()
    },
    {waitFor:function(){return  Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0].getComponent('roomName').getValue() == "testroom"}},
    function(next){
      var jgpop = Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0]
      var namebox = jgpop.getComponent('userName')
      t.type(namebox, "testfarmer")
      next()
    },

    {waitFor:function(){ return Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0].getComponent('userNameLed').src == 'resources/greenLed.png'}},
    {waitFor:0.1},

    function(next){

      var jgpop = Ext.ComponentQuery.query('window')[1]


      var goButton = jgpop.items.items[6]
      t.click(goButton)
      next()
    },

    {waitFor:function(){return Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0] == null}},

    function(next){
      var jgpop = Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0]
      t.ok(jgpop == null, "should join game successfully")
    })
})