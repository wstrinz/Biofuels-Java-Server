// spec/javascripts/oneYearSetup.t.js



StartTest(function(t) {
  cleanEnvironment()
  var getComp = function(query) {
      return Ext.ComponentQuery.query(query)[0]
  };
  t.chain(
    {waitFor:function(){return getComp('window[title="Biofuels Game Creation"]')}},
    {waitFor:0.1},

    function(next) {
      var cgpop = Ext.ComponentQuery.query('window[title="Biofuels Game Creation"]')[0]
      var roombox = cgpop.getComponent('name')
      var goButton = cgpop.getComponent('Create Game')
      roombox.setValue("twofarmersroom")
      next()
    },
    {waitFor:function(){ return getComp('window[title="Biofuels Game Creation"]').getComponent('roomLed').src == 'app/resources/greenLed.png'}},

    function(next){
      var cgpop = Ext.ComponentQuery.query('window')[1]


      var goButton = cgpop.items.items[4]

      t.click(goButton)
      next()
    },

    {waitFor:function(){return getComp('window[title="Biofuels Game Creation"]') == null}},

    function(next){
      var cgpop = Ext.ComponentQuery.query('window[title="Biofuels Game Creation"]')[0]
      t.ok(cgpop == null, "should create game successfully")
    }

  )
})