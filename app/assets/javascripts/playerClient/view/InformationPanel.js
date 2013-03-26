/*
 * File: app/view/InformationPanel.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Biofuels.view.DisplayBox', {
  extend: 'Ext.container.Container',
  alias : 'widget.dispbox',
  border: 1,
  height: 35,
  width: 60,
  blable: 'defal',

  layout: {
      type: 'absolute'
  },


  initComponent: function() {
    var me = this;

    Ext.applyIf(me, {
    items: [
    {
      xtype: 'panel',
      x: 0,
      y: 0,
      height: 20,
      width: me.width,
      header: false,
      title: 'My Panel',

      items: [
          {
              xtype: 'label',
              height: 14,
              width: 40,
              text: me.blable,
          }
      ]
    },
    {
      xtype: 'button',
      padding: '0 0 0 0',
      x: 0,
      y: 19,
      height: 15,
      width: me.width,
      text: me.blable,
      style: {
        background: 'transparent',
      },
      handler: function(){
        // console.log(this)
        this.el.setStyle({
           background: 'transparent'
        })
        // Ext.getCmp('theLabel').setText('bla')
      }
    }
    ],
    })
    me.callParent(arguments)
  },

  setText: function(text){
    this.items.items[0].items.items[0].setText(text)
  }

});

Ext.define('Biofuels.view.InformationPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.informationPanel',

/*    height: 587,
    width: 689,*/
/*    layout: {
        type: 'accordion',
        titleCollapse: false,
    },*/
    title: 'Information About Your Farm',
    titleAlign: 'center',

    //--------------------------------------------------------------------------
    initNetworkEvents: function() {
      var app = Biofuels;

        app.network.registerListener('joinRoom', this.joinedRoom, this);
        app.network.registerListener('getFarmInfo', this.refreshRanks, this);
        // app.network.registerListener('getFarmInfo', this.loadFarmInfo, this);
    },

    //--------------------------------------------------------------------------
    joinedRoom: function(json) {
      this.setTitle("Information About " + json.userName + "'s Farm");
    },

    refreshRanks: function(json){
      Ext.getCmp("sustainability-score").setText(json.sustainabilityScore)
      Ext.getCmp("sustainability-rank").setText(json.sustainabilityRank)
      Ext.getCmp("economics-score").setText(json.economicsScore)
      Ext.getCmp("economics-rank").setText(json.economicsRank)
      Ext.getCmp("environment-score").setText(json.environmentScore)
      Ext.getCmp("environment-rank").setText(json.environmentRank)
      Ext.getCmp("energy-score").setText(json.energyScore)
      Ext.getCmp("energy-rank").setText(json.energyRank)
    },

    initComponent: function() {
        var me = this;

        // var bdisp = Ext.create('Biofuels.view.DisplayBox');
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
            items: [

                {
                    xtype: 'panel',
                    collapsed: false,
                    title: 'Sustainability',
                    cls: 'my-panel',
                    collapseFirst: false,
                    tools: [
                      {
                        xtype: 'dispbox',
                        blable: 'Score',
                        id: 'sustainability-score'
                      },
                      {
                        xtype: 'tbspacer', width: 135
                      },
                      {
                        xtype: 'dispbox',
                        blable: 'Rank',
                        id: 'sustainability-rank'
                      },
                      {
                        xtype: 'tbspacer', width: 50
                      },
/*                      {
                          xtype: 'button',
                          x: 10,
                          y: 20,
                          height: 20,
                          width: 35,
                          text: 'hi',
                          style: {
                            background: 'transparent'
                          },
                          handler: function(){
                            // console.log(this.el)
                            Ext.getCmp('thedisp').setText('meh');
                            this.el.setStyle({
                               background: 'transparent'
                            })
                            this.setText('hello')
                            //Ext.getCmp('theLabel').setText('bla')
                          }
                      },*/
                    ]
                },
                {
                    xtype: 'panel',
                    collapsed: true,
                    collapseFirst: false,
                    title: 'Economics',
                    tools: [
                      {
                        xtype: 'dispbox',
                        blable: '$',
                        id: 'economics-score'
                      },
                      {
                        xtype: 'tbspacer', width: 135
                      },
                      {
                        xtype: 'dispbox',
                        blable: 'Rank',
                        id: 'economics-rank'
                      },
                      {
                        xtype: 'tbspacer', width: 50
                      },
                    ],
                    items: [
                    {
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
                },
                {
                    xtype: 'panel',
                    collapsed: true,
                    collapseFirst: false,
                    title: 'Energy',
                    tools: [
                      {
                        xtype: 'dispbox',
                        blable: 'gJ',
                        id: 'energy-score'
                      },
                      {
                        xtype: 'tbspacer', width: 135
                      },
                      {
                        xtype: 'dispbox',
                        blable: 'Rank',
                        id: 'energy-rank'
                      },
                      {
                        xtype: 'tbspacer', width: 50
                      },
                    ]
                },
                {
                    xtype: 'panel',
                    collapsed: true,
                    collapseFirst: false,
                    title: 'Environment',
                    tools: [
                      {
                        xtype: 'dispbox',
                        blable: 'Score',
                        id: 'environment-score'
                      },
                      {
                        xtype: 'tbspacer', width: 135
                      },
                      {
                        xtype: 'dispbox',
                        blable: 'Rank',
                        id: 'environment-rank'
                      },
                      {
                        xtype: 'tbspacer', width: 50
                      },
                    ]
                },
                {
                    xtype: 'panel',
                    collapseFirst: false,
                    collapsed: true,
                    title: 'Log'
                }
            ]
        });

        me.callParent(arguments);
    }

});