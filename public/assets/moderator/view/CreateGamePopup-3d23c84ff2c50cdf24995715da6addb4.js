/*
 * File: BiofuelsModerator/view/CreateGamePopup.js
 */
//
// Sends Events:
//		event: 'validateRoom'
//				roomName: 'name'
//
//		event: 'createRoom'
//				roomName: 'name', password: 'pswd', playerCount: '1'
//
// Receives Events:
//
//		event: 'validateRoom'
//				result: 'true/false'
//
//		event: 'createRoom'
//				result: 'true/false'
//				errorMessage: 'errorMsg'
//------------------------------------------------------------------------------
Ext.define("BiofuelsModerator.view.CreateGamePopup",{extend:"Ext.window.Window",requires:["Ext.window.MessageBox"],height:230,width:360,layout:{type:"absolute"},closable:!1,modal:!0,title:"Biofuels Game Creation",initNetworkEvents:function(){var e=BiofuelsModerator;e.network.registerListener("validateRoom",this.manageLed,this),e.network.registerListener("createRoom",this.serverCreateRoomResult,this)},initComponent:function(){var e=this;this.initNetworkEvents(),Ext.applyIf(e,{items:[{xtype:"textfield",itemId:"name",x:20,y:30,fieldLabel:"Room Name",labelPad:5,labelWidth:100,labelAlign:"right",allowBlank:!1,blankText:"Required",enforceMaxLength:!0,maxLength:16,validator:Ext.bind(this.dirtyChange,this)},{xtype:"image",itemId:"roomLed",x:305,y:32,height:20,width:20,src:"app/resources/redLed.png"},{xtype:"textfield",itemId:"password",x:20,y:60,fieldLabel:"Password",labelPad:5,labelWidth:100,labelAlign:"right",enforceMaxLength:!0,maxLength:16},{xtype:"numberfield",itemId:"count",x:20,y:110,fieldLabel:"Max Players",labelPad:5,labelWidth:100,labelAlign:"right",allowDecimals:!1,decimalPrecision:0,maxValue:48,minValue:1,value:8,width:160},{xtype:"button",x:100,y:150,width:160,scale:"medium",text:"Create Game",scope:this,handler:function(){this.tryCreateRoom()}}]}),e.callParent(arguments)},dirtyChange:function(e){var t=BiofuelsModerator,n={event:"validateRoom",roomName:e};return t.network.send(JSON.stringify(n)),!0},manageLed:function(e){var t=this.getComponent("roomLed");t!=null&&e.result?t.setSrc("app/resources/greenLed.png"):t.setSrc("app/resources/redLed.png")},tryCreateRoom:function(){var e=this.getComponent("name").value,t=this.getComponent("password").value,n=this.getComponent("count").value;e=typeof e=="undefined"||e.length<1?"":e,t=typeof t=="undefined"||t.length<1?"":t;if(typeof e=="undefined"||e.length<1){Ext.MessageBox.alert("Data Required","A unique room name is required. The room name also cannot be left empty.");var e=this.getComponent("name").focus(!0,!0);return}var r={event:"createRoom",roomName:e,password:t,playerCount:n};WsConnection.webSocket.gameChannel=e,BiofuelsModerator.network.send(JSON.stringify(r))},serverCreateRoomResult:function(e){e.result?this.close():Ext.MessageBox.alert("Create Room Error",e.errorMessage)}});