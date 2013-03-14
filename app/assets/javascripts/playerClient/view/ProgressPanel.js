/*
 * File: app/view/ProgressPanel.js
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.ProgressPanel', {
//------------------------------------------------------------------------------

	extend: 'Ext.panel.Panel',
    alias: 'widget.progressPanel',
    requires: [
        'Biofuels.view.RoundStageBar',
        'Biofuels.view.RoundStageMarker'
    ],

	title: 'Round Stage',
	titleAlign: 'center',
	viewbox: true,

	//--------------------------------------------------------------------------
    initNetworkEvents: function() {
    	var app = Biofuels;

        app.network.registerListener('changeSettings', this.changeSettings, this);
        app.network.registerListener('advanceStage', this.advanceStage, this);
        app.network.registerListener('getGameInfo', this.updateRoundChart, this);
    },

	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;

        this.initNetworkEvents();

        this.roundChartStore = Ext.create('Ext.data.Store', {
            storeId:'roundChartStore',
            data: [
                {
                    name: '',
                    data: 15,
                },
                {
                    name: '',
                    data: 10,
                },
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'name',
                    defaultValue: 5
                },
                {
                    name: 'data',
                    defaultValue: 2
                }
            ],
              proxy: {
                type: 'memory',
                reader: {
                  type: 'json',
                  root: 'farmers'
                }
              }
            });

        Ext.applyIf(me, {
          layout: 'absolute',

            items: [
    //         {
				// xtype: 'draw',
				// width: 500,
				// height: 80,
				// layout: 'absolute',
				// items: [{
				// 	type: 'rect',
				// 	width: 500,
				// 	height: 80,
				// 	fill: '#163020'
				//   },
        // ]
			   //},
         {
            xtype: 'label',
            id: 'stageName',
            height: 14,
            width: 100,
            text: 'Stage: '
          },

           {
              xtype: 'chart',
              height: 90,
              width: 120,
              x: 350,
              y: -10,
              animate: true,
              insetPadding: 10,
              store: 'roundChartStore',
              series: [
                  {
                      type: 'pie',
                      label: {
                          field: 'name',
                          display: 'rotate',
                          contrast: true,
                          font: '7px Arial'
                      },
                      showInLegend: true,
                      angleField: 'data'
                  }
              ]
          },

          /*{
            xtype: 'label',
            id: 'stageNumber',
            height: 14,
            width: 47,
            text: 'Stage Number: '
          }*/
         ]
		});

		me.callParent(arguments);
	},

	//--------------------------------------------------------------------------
	changeSettings: function(json) {
    Ext.getCmp("stageName").setText("Stage: " + 0)

		// if (!this.stageBar) {
		// 	var drawComp = this.child('draw');

		// 	this.stageBar = Ext.create('Biofuels.view.RoundStageBar');
		// 	this.stageBar.addToSurface(drawComp.surface, 60, 35, 380);
		// 	this.setSeasonStage(1);
		// }

		// var markerLabels = new Array();
		// // TODO: or labels could could just be sent by the server...
		// if (json.contractsOn) {
		// 	markerLabels.push('Contract');
		// }
		// markerLabels.push('Plant');
		// if (json.mgmtOptsOn) {
		// 	markerLabels.push('Manage');
		// }
		// markerLabels.push('Grow','Year End');

		// this.stageBar.setMarkers(markerLabels);
	},

	//--------------------------------------------------------------------------
	setYear: function(year) {
		this.stageBar.setYear(year);
	},

  advanceStage: function(json) {
    // console.log("setting stage " + json.stageNumber )
    Ext.getCmp("stageName").setText("Stage: " + json.stageName + " (" + json.stageNumber + ")")
    var msg = {
      event: "getGameInfo",
    }
    Biofuels.network.send(JSON.stringify(msg));
    // debugger;
    // this.setSeasonStage(2)
    // this.stageBar.setStage(json.stageNumber,1);
  },

	//--------------------------------------------------------------------------
	setSeasonStage: function(stage) {

		this.stageBar.setStage(stage, 500);
	},

  updateRoundChart: function(json){
    console.log(json)
    var stages = new Array();
    for (var i = 0; i < json.enabledStages.length; i++) {
      var size = 1
      if(json.stage == i){
        size = 1.5
      }
      var stage = {
        name: json.enabledStages[i],
        data: size
      }
      stages.push(stage);
    };
    // console.log(msg)
    this.roundChartStore.loadRawData((stages), false)
    console.log(this.roundChartStore)
  }

});

