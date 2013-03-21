/*
 * File: app/view/ContractHelpWindow.js
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.InformationPanel', {
//------------------------------------------------------------------------------

	extend: 'Ext.panel.Panel',
    alias: 'widget.informationPanel',


	title: 'Information About Your Farm',
	titleAlign: 'center',


	//--------------------------------------------------------------------------
    initNetworkEvents: function() {
    	var app = Biofuels;

        app.network.registerListener('joinRoom', this.joinedRoom, this);
        // app.network.registerListener('getFarmInfo', this.loadFarmInfo, this);
    },

    //--------------------------------------------------------------------------
    joinedRoom: function(json) {
    	this.setTitle("Information About " + json.userName + "'s Farm");
    },


    //--------------------------------------------------------------------------
    initComponent: function() {

        var me = this;

        this.fieldHistoryStore = Ext.create('Ext.data.JsonStore', {
            storeId: 'historyStore',
            fields: ['year','corn','grass'],
            data: [
              {'year':0, 'corn':1, 'grass':10},
              {'year':1, 'corn':20, 'grass':30},
              {'year':2, 'corn':10, 'grass':50},
            ]
              // {
              //   x: [0,1,2,3,4],
              // },
              // {
              //   grass: [0, 10, 20, 30],
              // },
              // {
              //   corn: [30, 20, 10, 10]
              // },
        });

        this.fieldHistoryStore2 = Ext.create('Ext.data.JsonStore', {
            storeId: 'historyStore2',
            fields: ['year','corn','grass'],
            data: [
              {'year':0, 'corn':10, 'grass':20},
              {'year':1, 'corn':20, 'grass':40},
              {'year':2, 'corn':30, 'grass':10},
            ]
              // {
              //   x: [0,1,2,3,4],
              // },
              // {
              //   grass: [0, 10, 20, 30],
              // },
              // {
              //   corn: [30, 20, 10, 10]
              // },
        });

        this.initNetworkEvents();

        Ext.applyIf(me, {
            items: [{
				xtype: 'contractPanel',
        collapsed: true,
			},
			{
				xtype: 'sustainabilityPanel',
        collapsed: true,
			},
			{
				xtype: 'panel',
        id: 'yieldsPanel',
				title: 'Yields',
				titleAlign: 'center',
				// layout: {
				// 	type: 'hbox',
				// 	padding: 8,
				// },
				items: [{
          xtype: 'chart',
          height: 224,
          width: 450,
          animate: true,
          store: 'historyStore',
          insetPadding: 20,
          axes: [{
                  type: 'Category',
                  fields: ['year'],
                  position: 'bottom',
                  title: 'Year'
              },
              {
                type: 'Numeric',
                  fields: ['corn','grass'],
                  position: 'left',
                  title: 'yield'
              }],
          series: [{
                  type: 'line',
                  highlight: {
                     size: 4,
                     radius: 6
                  },
                  tips: {
                    trackMouse: true,
                    width: 90,
                    height: 55,
                    layout: 'fit',
                    renderer: function(storeItem, item) {
                      this.setTitle("year: " + storeItem.get("year") + " yield: " + storeItem.get("corn"));
                    },
                  },
                  axis: 'left',
                  xField: 'year',
                  yField: 'corn',
                  title: 'corn',
                  style: {
                    fill: "#F9EA01",
                    stroke: "#F9EA01"
                  },
                  smooth: 3
                },
                {
                  type: 'line',
                  highlight: {
                     size: 4,
                     radius: 6
                  },
                  tips: {
                    trackMouse: true,
                    width: 90,
                    height: 55,
                    layout: 'fit',
                    renderer: function(storeItem, item) {
                      this.setTitle("year: " + storeItem.get("year") + " yield: " + storeItem.get("grass"));
                    },
                  },
                  axis: 'left',
                  xField: 'year',
                  yField: 'grass',
                  title: 'grass',
                  style: {
                    fill: "#008000",
                    stroke: "#008000"
                  },
                  smooth: 3
                },
                ]
        },
        {
          xtype: 'chart',
          height: 224,
          width: 450,
          animate: true,
          store: 'historyStore2',
          layout: 'fit',
          insetPadding: 20,
          axes: [{
                  type: 'Category',
                  fields: ['year'],
                  position: 'bottom',
                  title: 'Year'
              },
              {
                type: 'Numeric',
                  fields: ['corn','grass'],
                  position: 'left',
                  title: 'yield'
              }],
          series: [{
                  type: 'line',
                  highlight: {
                     size: 4,
                     radius: 6
                  },
                  tips: {
                    trackMouse: true,
                    width: 80,
                    height: 55,
                    layout: 'fit',
                    renderer: function(storeItem, item) {
                      this.setTitle("year: " + storeItem.get("year") + " yield: " + storeItem.get("corn"));
                    },
                  },
                  axis: 'left',
                  xField: 'year',
                  yField: 'corn',
                  title: 'corn',
                  smooth: 3,
                  style: {
                    fill: "#F9EA01",
                    stroke: "#F9EA01"
                  },
                },
                {
                  type: 'line',
                  highlight: {
                     size: 4,
                     radius: 6
                  },
                  tips: {
                    trackMouse: true,
                    width: 80,
                    height: 55,
                    layout: 'fit',
                    renderer: function(storeItem, item) {
                      this.setTitle("year: " + storeItem.get("year") + " yield: " + storeItem.get("grass"));
                    },
                  },
                  axis: 'left',
                  xField: 'year',
                  yField: 'grass',
                  title: 'grass',
                  style: {
                    fill: "#008000",
                    stroke: "#008000"
                  },
                  smooth: 3
                },
                ]
          },
        ],
				collapsed: false
			},
			{
				xtype: 'panel',
        id: 'otherPanel',
        autoScroll: true,
				title: 'Other Metrics',
				titleAlign: 'center',
				collapsed: true
			}]
		});

        me.callParent(arguments);
    }

});
