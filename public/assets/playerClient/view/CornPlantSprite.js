/*
 * File: app/view/CornPlantSprite.js
 */
//------------------------------------------------------------------------------
Ext.define("Biofuels.view.CornPlantSprite",{constructor:function(e){this.randomSpriteConfigList=Array([{type:"image",src:"resources/corn_plant.png",width:30,height:50,zIndex:750},{type:"image",src:"resources/corn_plant_2.png",width:30,height:50,zIndex:750}])},addToSurface:function(e,t,n,r){var i=this.randomSpriteConfigList[Math.floor(Math.random()*this.randomSpriteConfigList.length)];this.sprite&&this.removeFromSurface();var s=e.add(i);this.sprite=s[0],this.sprite.setAttributes({translate:{x:t,y:n}},!1),this.sprite.animate({duration:r,from:{scale:{x:.2,y:.2},translate:{x:t,y:n+16}},to:{scale:{x:1,y:1},translate:{x:t,y:n}}})},removeFromSurface:function(){if(!this.sprite)return;this.sprite.remove(),this.sprite.destroy(),this.sprite=null}});