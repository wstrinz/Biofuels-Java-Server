// spec/javascripts/sample.t.js
StartTest(function(t) {
  t.chain(
    {waitFor:1000},
    function(next) {
      var cgpop = Ext.getCmp("cgPop")
      var roombox = cgpop.items.items[0]
      var goButton = cgpop.items.items[4]
      // console.log(roombox)
      t.type(roombox, "testroom")
      next()
    },
    {waitFor:300},
    function(next){
      var cgpop = Ext.getCmp("cgPop")

      var goButton = cgpop.items.items[4]

      t.click(goButton)
      next()
    },
    {waitFor:1000},
    function(next){
      t.diag('Should create game');
      var cgpop = Ext.getCmp("cgPop")
      t.ok(cgpop == null, "should create game successfully")
      // console.log(cgpop)
    }
  // console.log(Ext.ComponentQuery.query('BiofuelsModerator.view.MainViewport')[0])

  // t.ok(1 == 1, 'A sample test');
  )
})