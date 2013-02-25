/*
 * File: app/view/MainViewport.js
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.MainViewport', {
//------------------------------------------------------------------------------

	extend: 'Ext.container.Viewport',
    requires: [
        'Biofuels.view.CornPlantSprite',
        'Biofuels.view.GrassPlantSprite',
        'Biofuels.view.FarmHolderPanel',
        'Biofuels.view.FieldHealthPopup',
        'Biofuels.view.InformationPanel',
        'Biofuels.view.ContractPanel',
        'Biofuels.view.ContractOfferingPanel',
        'Biofuels.view.SustainabilityPanel',
        'Biofuels.view.Field',
        'Biofuels.view.Farm',
        'Biofuels.view.ContractHelpWindow',
        'Biofuels.view.ProgressPanel',
        'Biofuels.view.RoundStageBar',
        'Biofuels.view.FieldOverlay',
        'Biofuels.view.FieldData'
    ],

    title: 'My Window',
    autoScroll: true,
    layout: 'fit',

	//--------------------------------------------------------------------------
/*    initComponent: function() {
        var me = this;        
        
        Ext.applyIf(me, {
            items: [{
				xtype: 'panel',
				layout: {
					type: 'vbox',
					align: 'center'
				},
				bodyStyle: 'background-image: url(app/assets/site_bg.jpg); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; background-position: center top;',
				items: [{
					xtype: 'titlePanel',
					width: 1000,
					height: 60
				},{
					xtype: 'panel',
					layout: {
						type: 'column'
					},
					width: 1000,
					items: [{
						xtype: 'farmHolderPanel',	
						columnWidth: 0.5
					},{
						xtype: 'informationPanel',
						columnWidth: 0.5
					}]
				}]
			}]
        });

        me.callParent(arguments);
    }
*/
	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;        
        
        Ext.applyIf(me, {
            items: [{
				xtype: 'panel',
				layout: {
					type: 'vbox',
					align: 'center'
				},
				bodyStyle: 'background-image: url(resources/site_bg.jpg); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; background-position: center top;',
				items: [{
					xtype: 'panel',
					layout: 'column',
					width: 1000,
					items: [{
						xtype: 'panel',
						columnWidth: 0.5,
						layout: 'fit',
						items: [{
							xtype: 'progressPanel',
							height: 100
						},{
							xtype: 'farmHolderPanel',
							// width: 500,
							height: 700,
							layout: 'fit'
						}]
					},{
						xtype: 'informationPanel',
						columnWidth: 0.5,
						height: 700,
						layout: {
							type: 'accordion',
							multi: true
						}
					}]
				}]
			}]
        });

        me.callParent(arguments);
    }
    
});

