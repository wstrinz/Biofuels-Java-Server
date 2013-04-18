// spec/javascript/test_harness.js
var Harness = Siesta.Harness.Browser.ExtJS;


Harness.configure({
    title     : 'Tests',
    overrideSetTimeout : false,

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
  group: 'Utility',
  items: [
    {
      title: 'Reset All',
      url: '/assets/resetAll.t.js',
      hostPageUrl: '../game/moderator',
      preload: ['/assets/test_helper.js']
    }
  ]
},
{
  // group: 'Sample',
  // items: ['/assets/sample.t.js'],
  group: 'Single Tests',
  items: [
    {
      title: 'Moderator tests',
      url: '/assets/createGame.t.js',
      hostPageUrl: '../game/moderator',
      preload: ['/assets/test_helper.js']
    }
  ],
},
 {
  group: 'Join Game',
    items: [
      {
        title: 'Setup',
       url: '/assets/createAndJoinSetup.t.js',
       hostPageUrl: '../game/moderator',
       preload: ['/assets/test_helper.js']
      },
      {
       title: 'Test',
       url: '/assets/createAndJoin.t.js',
       hostPageUrl: '../game/play',
       // preload: ['/assets/test_helper.js']
     },
    ]
 },

 {
  group: 'One Year Simple',
   items:[
     {
       title: 'Setup',
       url: '/assets/oneYearSetup.t.js',
       hostPageUrl: '../game/moderator',
       preload: ['/assets/test_helper.js']
     },
     {
       title: 'Test',
       url: '/assets/oneYear.t.js',
       hostPageUrl: '../game/play',
       // preload: ['/assets/test_helper.js']
     },
   ]
 },
 {
  group: 'Two Farmers',
    items:[
      {
       title: 'Setup',
       url: '/assets/twoFarmersSetup.t.js',
       hostPageUrl: '../game/moderator',
       preload: ['/assets/test_helper.js']
     },
     {
       title: 'Farmer1',
       url: '/assets/twoFarmers1.t.js',
       hostPageUrl: '../game/play',
       // preload: ['/assets/test_helper.js']
     },
     {
       title: 'Farmer2',
       url: '/assets/twoFarmers2.t.js',
       hostPageUrl: '../game/play',
       // preload: ['/assets/test_helper.js']
     },
    ]
 }

 );
