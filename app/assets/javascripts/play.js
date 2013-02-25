/**
 *= require_self
 */
Ext.Ajax.on('beforerequest', function(connection, options) {
  var token = Ext.select("meta[name='csrf-token']").elements[0];

  if (token !== null) {
    options.headers = Ext.apply({
      'Accept'       : 'application/json',
      'X-CSRF-Token' : token.getAttribute('content')
    }, options.headers || {});
  }

});
// create a new instance of Application class
Ext.application({
  // the global namespace
  name: 'Biofuels',

  appFolder: '/assets/play',

  //#controllers: ['Users'],

  autoCreateViewport: true
});
