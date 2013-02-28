/*
 * File: BiofuelsGlobal/view/CreateGamePopup.js
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
Ext.define("BiofuelsGlobal.view.JoinGamePopup",{extend:"Ext.window.Window",requires:["Ext.window.MessageBox"],height:180,width:360,layout:{type:"absolute"},closable:!1,modal:!0,title:"Biofuels Global Viewer Join",initNetworkEvents:function(){var e=BiofuelsGlobal;e.network.registerListener("globalValidateRoom",this.manageLed,this),e.network.registerListener("globalJoinRoom",this.serverJoinRoomResult,this)},initComponent:function(){var e=this;this.initNetworkEvents(),Ext.applyIf(e,{items:[{xtype:"textfield",itemId:"roomName",x:20,y:30,fieldLabel:"Room Name",labelPad:5,labelWidth:100,labelAlign:"right",allowBlank:!1,blankText:"Required",enforceMaxLength:!0,maxLength:16,validator:Ext.bind(this.dirtyChange,this)},{xtype:"image",itemId:"roomLed",x:305,y:32,height:20,width:20,src:"app/resources/redLed.png"},{xtype:"textfield",itemId:"password",x:20,y:60,fieldLabel:"Password",disabled:!0,labelPad:5,labelWidth:100,labelAlign:"right",enforceMaxLength:!0,maxLength:16},{xtype:"image",itemId:"passwordLed",x:305,y:62,hidden:!0,height:20,width:20,src:"app/resources/redLed.png"},{xtype:"button",x:100,y:100,width:160,scale:"medium",text:"Join Game",scope:this,handler:function(){this.tryJoinRoom()}}]}),e.callParent(arguments)},dirtyChange:function(e){var t=BiofuelsGlobal,n=this.getComponent("roomName").value,r=this.getComponent("password").value;n=typeof n=="undefined"||n.length<1?"":n,r=typeof r=="undefined"||r.length<1?"":r;var i={event:"globalValidateRoom",roomName:n,password:r};return t.network.send(JSON.stringify(i)),!0},manageLed:function(e){var t=this.getComponent("roomLed"),n=e.roomResult;n?t.setSrc("app/resources/greenLed.png"):t.setSrc("app/resources/redLed.png"),t=this.getComponent("passwordLed"),password=this.getComponent("password");var r=e.passwordResult;!n||!e.needsPassword?(password.setDisabled(!0),t.setVisible(!1)):(password.setDisabled(!1),t.setVisible(!0)),r&&n?t.setSrc("app/resources/greenLed.png"):t.setSrc("app/resources/redLed.png")},tryJoinRoom:function(){var e=this.getComponent("roomName").value,t=this.getComponent("password").value;e=typeof e=="undefined"||e.length<1?"":e,t=typeof t=="undefined"||t.length<1?"":t;if(typeof e=="undefined"||e.length<1){Ext.MessageBox.alert("Data Required","The room name cannot be left empty.");var e=this.getComponent("name").focus(!0,!0);return}BiofuelsGlobal.roomInformation={roomName:e,password:t};var n={event:"globalJoinRoom",roomName:e,password:t};BiofuelsGlobal.network.send(JSON.stringify(n))},serverJoinRoomResult:function(e){e.result?this.close():Ext.MessageBox.alert("Join Room Error",e.errorMessage)}});