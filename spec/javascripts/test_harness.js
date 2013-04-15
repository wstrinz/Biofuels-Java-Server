// spec/javascript/test_harness.js
var Harness = Siesta.Harness.Browser.ExtJS;


Harness.configure({
    title     : 'Tests',

  // loaderPath: { 'App' : '/assets/app' },


  preload : [
        // "http://extjs.cachefly.net/ext-4.1.1-gpl/ext-all.js",
        // "https://extjs.cachefly.net/ext-4.1.1-gpl/resources/css/ext-all-access.css",

        {
            text    : "console.log('preload completed')"
        }
    ]
});

Harness.start({
  // group: 'Sample',
  // items: ['/assets/sample.t.js'],

  group: 'Tests',
  items: [
    {
      title: 'Moderator tests',
      url: '/assets/sample.t.js',
      hostPageUrl: '../game/moderator',
    }
  ]
});
