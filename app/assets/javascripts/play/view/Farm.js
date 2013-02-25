/*
 * File: app/view/Farm.js
 */

//------------------------------------------------------------------------------
Ext.define('Biofuels.view.Farm', {
//------------------------------------------------------------------------------

extend: 'Ext.draw.Component',
alias: 'widget.Farm',
renderTo: Ext.getBody(),

    // Some basic constants
	//--------------------------------------------------------------------------
  FARM_WIDTH: 445,
  FARM_HEIGHT: 600,

  MAX_FIELDS: 6,
  MAX_FIELDS_PER_ROW: 2,

  FIELD_START_X: 40,
  FIELD_START_Y: 30,

  FIELD_SPACE_X: 200,
  FIELD_SPACE_Y: 160,

  HEALTH_ICON_SIZE: 50,

	//--------------------------------------------------------------------------
  initComponent: function() {
    var me = this;

        // specifies the location as the center of the icon
        // NOTE: here because relies on this.vars being fully init'd?
        this.HEALTH_ICON_X = this.FARM_WIDTH / 2;
        this.HEALTH_ICON_Y = this.FARM_HEIGHT - 105;

        Ext.applyIf(me, {
          items: [{
            type: 'rect',
            width: this.FARM_WIDTH,
            height: this.FARM_HEIGHT,
            fill: '#385'
          }]
        });

        me.callParent(arguments);

        this.fields = new Array();
      },

	//--------------------------------------------------------------------------
	createFields: function(num) {

		var count = num;

		if (this.fields.length <= 0) {
			this.addFarmHealthIcon(this.HEALTH_ICON_X, this.HEALTH_ICON_Y,
       this.HEALTH_ICON_SIZE);
		}

		if (this.fields.length < this.MAX_FIELDS) {
			if (this.fields.length + count > this.MAX_FIELDS) {
				count = this.MAX_FIELDS - this.fields.length;
			}

			var atX = 0;
			var atY = 0;
			// bah, space out
			for (var index = 0; index < this.fields.length; index++ ) {
				atX++;
				if (atX >= this.MAX_FIELDS_PER_ROW) {
					atX = 0;
					atY++;
				}
			}

			for (var index = 0; index < count; index++ )
			{
				var field = this.addField(atX * this.FIELD_SPACE_X + this.FIELD_START_X,
          atY * this.FIELD_SPACE_Y + this.FIELD_START_Y);
				atX++;
				if (atX >= this.MAX_FIELDS_PER_ROW) {
					atX = 0;
					atY++;
				}
			}
		}
  },

    // Create a new field object (visual representation + underlying data) then
    //	attach it to the farm draw surface
	//--------------------------------------------------------------------------
	addField: function(atX, atY) {

		var aField = {
			fieldVisuals: Ext.create('Biofuels.view.Field'),
			fieldData: Ext.create('Biofuels.view.FieldData'),
			fieldChart: Ext.create('Biofuels.view.FieldOverlay')
		};
		aField.fieldVisuals.attachTo(this.surface, atX, atY);
		aField.fieldChart.attachTo(aField.fieldData, this.surface, atX, atY);

		this.fields.push(aField);

		return aField;
	},

	// place centered at atX, atY
	//-----------------------------------------------------------------------
  addFarmHealthIcon: function(atX, atY, radius) {

   var path = [{
     type: 'image',
     src: 'resources/field_health_icon.png',
     x: atX - radius / 2,
     y: atY - radius / 2,
     opacity: 0.5,
     width: radius,
     height: radius,
     zIndex: 1000
   }];

   var result = this.surface.add(path);
   for (var index = 0; index < result.length; index++) {
     result[index].show(true);
   }

		// Hrm, I guess must add the event on the topmost sprite element?
		result[0].on({
      mouseover: this.onMouseOver,
      mouseout: this.onMouseOut,
      scope: result[0]
    });
		result[0].on({
      click: this.onClick,
      scope: this
    });

		this.healthIcon = result[0];
  },

    //-----------------------------------------------------------------------
    onMouseOver: function(evt, target) {

    	this.stopAnimation().animate({
       duration: 100,
       to: {
        scale: {
         x: 1.1,
         y: 1.1
       },
       opacity: 1
     }
   });
    },

    //-----------------------------------------------------------------------
    onMouseOut: function(evt, target) {

    	this.stopAnimation().animate({
       duration: 100,
       to: {
        scale: {
         x: 1,
         y: 1
       },
       opacity: 0.5
     }
   });
    },

    //-----------------------------------------------------------------------
    onClick: function(evt, target) {

    	var years = this.getNumberSeasons();

    	if (!this.popupWindow) {
    		this.hideFieldManagementIcons();
    		this.popupWindow = Ext.create('Biofuels.view.FieldHealthPopup');
    		this.popupWindow.setSliderCallback(years, this.onDrag, this.onChange, this);
    		this.popupWindow.setCheckboxCallbacks(this.soilHealthChanged,
         this.yieldsChanged,
         this.showCropsChanged, this);

    		this.popupWindow.on({
          close: function(window, eOpts) {
           this.showFieldManagementIcons();
           this.popupWindow = null;
           this.healthIcon.show(true);
           this.hideFieldHealth();
         },
         scope: this
       });

    		this.healthIcon.hide();
    		this.popupWindow.show();

    		var x = target.getX();
    		var y = target.getY();

    		x -= (this.popupWindow.getWidth() * 0.5);
    		y -= (this.popupWindow.getHeight() * 0.5);
    		this.popupWindow.setPosition(x, y);
    		this.setFieldSeason(0);
    	}
    },

    //-----------------------------------------------------------------------
    soilHealthChanged: function(self, newValue, oldValue, eOpts) {

      for (var index = 0; index < this.fields.length; index++ ) {
       if (newValue == true) {
        this.fields[index].fieldChart.showSoilHealth();
      }
      else {
        this.fields[index].fieldChart.hideSoilHealth();
      }
    }
  },

    //-----------------------------------------------------------------------
    yieldsChanged: function(self, newValue, oldValue, eOpts) {
      for (var index = 0; index < this.fields.length; index++ ) {
       if (newValue == true) {
        this.fields[index].fieldChart.showYields();
      }
      else {
        this.fields[index].fieldChart.hideYields();
      }
    }
  },

    //-----------------------------------------------------------------------
    showCropsChanged: function(self, newValue, oldValue, eOpts) {
      for (var index = 0; index < this.fields.length; index++ ) {
       if (newValue == true) {
        this.fields[index].fieldChart.showCrop();
      }
      else {
        this.fields[index].fieldChart.hideCrop();
      }
    }
  },

    //-----------------------------------------------------------------------
    showFieldHealth: function() {

      for (var index = 0; index < this.fields.length; index++ ) {
//			this.fields[index].fieldVisuals.showUnderlay();
}
},

	//-----------------------------------------------------------------------
	hideFieldHealth: function() {

		for (var index = 0; index < this.fields.length; index++ ) {
			this.fields[index].fieldChart.hide();
		}
	},

	//-----------------------------------------------------------------------
	showFieldManagementIcons: function() {

		for (var index = 0; index < this.fields.length; index++ ) {
			var field = this.fields[index].fieldVisuals;
			field.showManagementIcons();
			field.showPlantingIcon();
			field.showCrop();
		}
	},

	//-----------------------------------------------------------------------
	hideFieldManagementIcons: function() {

		for (var index = 0; index < this.fields.length; index++ ) {
			var field = this.fields[index].fieldVisuals;
			field.hideManagementIcons();
			field.hidePlantingIcon();
			field.hideCrop();
		}
	},

	onDrag: function(slider) {
		this.setFieldSeason(slider.getValue());
	},
	onChange: function(slider) {
		this.setFieldSeason(slider.getValue());
	},
  //--------------------------------------------------------------------------
  saveFields: function() {
  //alert(this.fields[0].fieldVisuals.cropType)

    sendFields = new Array();

    for (var index = 0; index < this.fields.length; index++ ) {

      var field = this.fields[index].fieldVisuals;
      var fieldInfo = new Array();
      fieldInfo.push(field.cropType);
      fieldInfo.push(field.fertilizer.stateValue>0);
      fieldInfo.push(field.pesticide.stateValue==0);
      fieldInfo.push(field.till.stateValue>0);
      // alert(field.crop);
      sendFields.push(fieldInfo);
    }
    var sendString = JSON.stringify(sendFields);
    Ext.Ajax.request({
        url: '/save_fields',
        method: 'POST',
        params: {
          'fields': sendString
        },
        success: function(response, opts){
          var obj = Ext.JSON.decode(response.responseText);

          //cornButton.handler.call(cornButton.scope, cornButton, Ext.EventObject());
         },
         failure: function(response, opts){
          console.log("failed to get json response for saveFields");
        }
      });

  },
  //--------------------------------------------------------------------------
  loadFromServer: function() {
    var farmObj = this;
    Ext.Ajax.request({
      url: '/get_farm',
      method: 'GET',
      success: function(response, opts){
       var obj = Ext.JSON.decode(response.responseText);
       for(var index = 0; index < obj.length; index++){
        var fieldObj = obj[index].field;
        farmObj.createFields(1);
        var newField = farmObj.fields[farmObj.fields.length - 1].fieldVisuals;
        newField.onPlantingClickHandler(fieldObj.crop);

        //copypasta from togglesprite click handler; probably not the way to do things
        if(fieldObj.till){
          newField.till.stateValue++; if (newField.till.stateValue > 1) newField.till.stateValue = 0;
          newField.till.sprite.setAttributes({
            src: newField.till.stateImages[newField.till.stateValue]
          }, true);
        }
        if(fieldObj.fertilizer){
          newField.fertilizer.stateValue++; if (newField.fertilizer.stateValue > 1) newField.fertilizer.stateValue = 0;
          newField.fertilizer.sprite.setAttributes({
            src: newField.fertilizer.stateImages[newField.fertilizer.stateValue]
          }, true);
        }
        if(!fieldObj.pesticide){
          newField.pesticide.stateValue++; if (newField.pesticide.stateValue > 1) newField.pesticide.stateValue = 0;
          newField.pesticide.sprite.setAttributes({
            src: newField.pesticide.stateImages[newField.pesticide.stateValue]
          }, true);
        }

      }
    },
    failure: function(response, opts){
      console.log("failed to get json response for loadFromServer")
    }
  });
  },
	//-----------------------------------------------------------------------
	getNumberSeasons: function() {

		if (this.fields.length <= 0) {
			return 1;
		}
		else {
			return this.fields[0].fieldData.getNumSeasons();
		}
	},

	//-----------------------------------------------------------------------
	setFieldSeason: function(newYear) {

		for (var index = 0; index < this.fields.length; index++ ) {
			this.fields[index].fieldChart.setCurrentSeason(newYear);
		}
	}

});
