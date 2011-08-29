define(function() {
	
		alert('loading basetouchcontroller');

		var BaseTouchController = Class.extend({
			init: function(){		
			},
			
			setTouchEventCallback: function(touchEventCallback) {
				this.touchEventCallback = touchEventCallback;
			},
			
			applyTouchOptions: function(touchOptions) {
			},
			
			fireTouchEvent: function(x, y, action, motionEvent) {
				//store these events in an array and dispatch
				//during onUpdate
				alert('fire');
			},
			
			onUpdate: function(seconds){
			}
	
		});
		
		return BaseTouchController;
    }
);