define( function() {
			
	//alert('loading basebackground!');
		var BaseBackground = Class.extend({

			init: function(){
				this._backgroundModifiers = [];
			},
			
			addBackgroundModifier: function(backgroundModifier) {
				this._backgroundModifiers.add(pBackgroundModifier);
			},

			removeBackgroundModifier: function(backgroundModifier) {
				return this._backgroundModifiers.remove(backgroundModifier);
			},

			clearBackgroundModifiers: function() {
				this._backgroundModifiers.clear();
			},
			
			onUpdate: function(secondsElapsed) {
				//this._backgroundModifiers.onUpdate(secondsElapsed);
			},
			
			reset: function() {
				this._backgroundModifiers.reset();
			}

		});
		
		return BaseBackground;
    }
);