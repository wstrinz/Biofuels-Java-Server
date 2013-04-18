// spec/javascripts/joinGame.t.js


StartTest(function(t) {
  // t.ok(1==1,"test test")
  // console.log(isdone)
  var lastStage =null
  t.chain(
    {waitFor:function(){return Ext.ComponentQuery.query('window[title="Connecting to Server"]')[0] == null}},
    {waitFor:0.1},

    function(next) {
      var jgpop = Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0]
      var roombox = jgpop.getComponent('roomName')
      roombox.setValue("testroom")
      next()
    },
    {waitFor:function(){return  Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0].getComponent('roomName').getValue() == "testroom"}},
    function(next){
      var jgpop = Ext.ComponentQuery.query('window[title="Join A Biofuels Game"]')[0]
      var namebox = jgpop.getComponent('userName')
      // t.type(namebox, "testfarmer")
      namebox.setValue("testfarmer")
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
      next()
    },
    {waitFor:function(){return Ext.getCmp('farm').fields[0]}},
    function(next){
      var fieldList = Ext.getCmp('farm').fields
      t.ok(fieldList[0] != null, "should load fields")
      fieldList[0].fieldVisuals.plantingIcon.fireEvent("click")

      //TODO: check that popup opened
      fieldList[0].fieldVisuals.popup.onClick(fieldList[0].fieldVisuals.popup.grass[0]) //.fireEvent("click")
      t.ok(fieldList[0].fieldVisuals.cropType == "grass", "should plant grass on first field")

      fieldList[1].fieldVisuals.plantingIcon.fireEvent("click")
      fieldList[1].fieldVisuals.popup.onClick(fieldList[1].fieldVisuals.popup.grass[0]) //.fireEvent("click")
      t.ok(fieldList[1].fieldVisuals.cropType == "grass", "should plant grass on second field")

      clickAdvance(Ext)


      next()
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != "Plant"}},
    function(next){
      t.ok(Ext.getCmp('farm').currentStage == "Round Wrap Up", "should advance to harvest stage")
      clickAdvance(Ext)
      next()
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != "Round Wrap Up"}},
    {waitFor:500},
    function(next){
      t.ok(Ext.getCmp('farm').currentStage == "Plant", "should finish year and go back to plant stage")
      clickAdvance(Ext)

      lastStage = Ext.getCmp('farm').currentStage
      next()
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != lastStage}},
    {waitFor:500},
    function(next){
      clickAdvance(Ext)

      next()
      lastStage = Ext.getCmp('farm').currentStage
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != lastStage}},
    {waitFor:500},
    function(next){
      clickAdvance(Ext)

      next()
      lastStage = Ext.getCmp('farm').currentStage
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != lastStage}},
    {waitFor:500},
    function(next){
      clickAdvance(Ext)

      next()
      lastStage = Ext.getCmp('farm').currentStage
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != lastStage}},
    {waitFor:500},
    function(next){
      clickAdvance(Ext)

      next()
      lastStage = Ext.getCmp('farm').currentStage
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != lastStage}},
    {waitFor:500},
    function(next){
      clickAdvance(Ext)

      next()
      lastStage = Ext.getCmp('farm').currentStage
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != lastStage}},
    {waitFor:500},
    function(next){
      clickAdvance(Ext)

      next()
      lastStage = Ext.getCmp('farm').currentStage
    },
    {waitFor:function(){return Ext.getCmp('farm').currentStage != lastStage}},
    {waitFor:500},
    function(next){
      clickAdvance(Ext)

      next()
      lastStage = Ext.getCmp('farm').currentStage
    }

    // {waitFor:function(){return Ext.data.StoreManager.lookup('sustainabilityStore').getAt(0).data.environment > 0}},
    // function(next){
    //   var sustainData = Ext.data.StoreManager.lookup('sustainabilityStore').getAt(0).data
    //   // console.log(sustainStore)
    //   t.ok((sustainData.economy>0) &&(sustainData.energy > 0),"should have received first year sustainability scores")
    // }


    )
})