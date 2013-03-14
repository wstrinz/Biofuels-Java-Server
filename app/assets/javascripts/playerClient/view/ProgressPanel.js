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
    },

	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;

        this.initNetworkEvents();

        Ext.applyIf(me, {
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
            width: 47,
            text: 'Stage: '
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
    Ext.getCmp("stageName").setText("Stage: " + 1)

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
    console.log("setting stage " + json.stageNumber )
    Ext.getCmp("stageName").setText("Stage: " + json.stageName + " (" + json.stageNumber + ")")
    // debugger;
    // this.setSeasonStage(2)
    // this.stageBar.setStage(json.stageNumber,1);
  },

	//--------------------------------------------------------------------------
	setSeasonStage: function(stage) {

		this.stageBar.setStage(stage, 500);
	}

});

