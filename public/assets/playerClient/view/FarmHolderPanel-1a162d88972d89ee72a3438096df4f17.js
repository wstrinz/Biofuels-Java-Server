/*
 * File: app/view/FarmHolderPanel.js
 */
//------------------------------------------------------------------------------
Ext.define("Biofuels.view.FarmHolderPanel",{extend:"Ext.panel.Panel",alias:"widget.farmHolderPanel",requires:["Biofuels.view.Field","Biofuels.view.Farm","Biofuels.view.FieldOverlay","Biofuels.view.FieldData"],frame:!1,title:"Your Farm",titleAlign:"center",initNetworkEvents:function(){var e=Biofuels;e.network.registerListener("joinRoom",this.joinedRoom,this)},joinedRoom:function(e){this.setTitle(e.userName+"'s Farm")},initComponent:function(){var e=this;this.initNetworkEvents(),Ext.applyIf(e,{items:[{xtype:"Farm"}]}),e.callParent(arguments)}});