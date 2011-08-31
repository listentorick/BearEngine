define([
	"bearengine/entity/scene/background/basebackground"
	], function(BaseBackground) {
			
	//alert('loading ColorBackground!');
		var ColorBackground = BaseBackground.extend({

			init: function(red, green, blue, alpha){
				this._super();
				this.setColor(red,green,blue,alpha);
				this._colorEnabled = true;
			},
			
			/**
			 * Sets the color using the arithmetic scheme (0.0f - 1.0f RGB triple).
			 * @param pRed The red color value. Should be between 0.0 and 1.0, inclusive.
			 * @param pGreen The green color value. Should be between 0.0 and 1.0, inclusive.
			 * @param pBlue The blue color value. Should be between 0.0 and 1.0, inclusive.
			 */
			setColor: function(red, green, blue, alpha) {
				this._red = red;
				this._green = green;
				this._blue = blue;
				this._alpha = alpha;
			},
			
			setColorEnabled: function(colorEnabled) {
				this._colorEnabled = colorEnabled;
			},

			isColorEnabled: function() {
				return this._colorEnabled;
			},


			onDraw: function(GL,camera) {
				if(this._colorEnabled) {
					//pGL.glClearColor(this._red, this._green, this._blue, this._alpha);
					//pGL.glClear(GL10.GL_COLOR_BUFFER_BIT);
				}
			}


		});
		
		return ColorBackground;
    }
);