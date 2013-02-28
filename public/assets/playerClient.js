/*
 * File: app.js
 */
Ext.define("WsConnection",{singleton:!0,webSocket:new WebSocketRails("localhost:3000/websocket"),id:"",gameChannel:""}),Ext.Loader.setConfig({enabled:!0}),Ext.application({autoCreateViewport:!0,name:"Biofuels",appFolder:"/assets/playerClient"});