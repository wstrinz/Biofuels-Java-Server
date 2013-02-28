/*
 * File: app/view/ContractOfferingWindow.js
 */
//------------------------------------------------------------------------------
Ext.define("Biofuels.view.ContractOfferingPanel",{extend:"Ext.panel.Panel",alias:"widget.contractoffering",height:100,layout:{type:"absolute"},padding:5,bodyPadding:"5 0 5 10",initComponent:function(){var e=this;Ext.applyIf(e,{items:[{xtype:"image",src:this.imageSource,x:5,y:5,height:50,width:50},{xtype:"displayfield",x:60,y:0,width:250,value:this.contractText,fieldLabel:""},{xtype:"button",x:320,y:10,width:150,scale:"large",text:"Accept Contract?",enableToggle:!0,handler:function(e,t){e.pressed?e.setText("Contract Accepted!"):e.setText("Accept Contract?")}}]}),e.callParent(arguments)}});