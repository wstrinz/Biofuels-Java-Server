// spec/javascripts/joinGame.t.js


StartTest(function(t) {


  t.chain(
    {waitFor:function(){return Ext.ComponentQuery.query('window[title="Connecting to Server"]')[0] == null}},
    {waitFor:0.1},

    function(next) {

      var jgpop = Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0]

      var roombox = jgpop.getComponent('roomName')
      var namebox = jgpop.getComponent('userName')

      // t.type(roombox, "testroom")
      roombox.setValue("twofarmersroom")

      namebox.setValue("testfarmer")

      // t.ok(1==1,'test')
      next()
    },
    // {waitFor:function(){return  Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0].getComponent('roomName').getValue() == "twofarmersroom"}},
    // function(next){
    //   // var jgpop = Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0]
    //   // var namebox = jgpop.getComponent('userName')
    //   // // t.type(namebox, "testfarmer")
    //   next()
    // },

    {waitFor:function(){ return Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0].getComponent('userNameLed').src == 'resources/greenLed.png'}},
    {waitFor:1},

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
      next()
    },
    {waitFor:function(){return Ext.getCmp('farm').fields[0]}},
    function(next){
      var fieldList = Ext.getCmp('farm').fields
      t.ok(fieldList[0] != null, "should load fields")

      fieldList[0].fieldVisuals.plantingIcon.fireEvent("click")

      fieldList[0].fieldVisuals.popup.onClick(fieldList[0].fieldVisuals.popup.corn[0])
      t.ok(fieldList[0].fieldVisuals.cropType == "corn", "should plant corn on first field")

      fieldList[1].fieldVisuals.plantingIcon.fireEvent("click")
      fieldList[1].fieldVisuals.popup.onClick(fieldList[1].fieldVisuals.popup.grass[0])
      t.ok(fieldList[1].fieldVisuals.cropType == "grass", "should plant grass on second field")


      progressPanel = Ext.ComponentQuery.query('.progressPanel')[0]

      progressPanel.stageBar.markers[0].handleOnClick()


      next()
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != "Plant"}},
    function(next){
      t.ok(Ext.getCmp('farm').currentStage == "Round Wrap Up", "should advance to harvest stage")
      progressPanel.stageBar.markers[1].handleOnClick() //.fireEvent("click")
      next()
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != "Round Wrap Up"}},
    function(next){
      t.ok(Ext.getCmp('farm').currentStage == "Plant", "should finish year and go back to plant stage")
      var sustainStore = Ext.data.StoreManager.lookup('sustainabilityStore')
      var econStore = Ext.data.StoreManager.lookup('economicsStore')
      next()
    },
    {waitFor:function(){return Ext.data.StoreManager.lookup('sustainabilityStore').getAt(0).data.environment > 0}},
    function(next){
      var sustainData = Ext.data.StoreManager.lookup('sustainabilityStore').getAt(0).data
      t.ok((sustainData.economy>0) &&(sustainData.energy > 0),"should have received first year sustainability scores")
    }


    )
})