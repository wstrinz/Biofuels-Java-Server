/*
 * File: app/view/InformationPanel.js
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.InformationPanel', {
//------------------------------------------------------------------------------

	extend: 'Ext.panel.Panel',
    alias: 'widget.informationPanel',


	title: 'Information About Your Farm',
	titleAlign: 'center',

    //--------------------------------------------------------------------------
    initComponent: function() {

        var me = this;

        Ext.applyIf(me, {
            items: [{
				xtype: 'contractPanel'
			},
			{
				xtype: 'sustainabilityPanel'
			},
			{
				xtype: 'panel',
				title: 'Yields',
				titleAlign: 'center',
				layout: {
					type: 'vbox',
					padding: 8,
				},
				items: [{
					xtype: 'label',
					text: 'Some Label Text'
				},{
					xtype: 'label',
					text: 'Some Label Text'
				}],
				collapsed: true
			},
			{
				xtype: 'panel',
				title: 'Other Metrics',
				titleAlign: 'center',
				collapsed: true
			}]
		});

        me.callParent(arguments);
    }

});
