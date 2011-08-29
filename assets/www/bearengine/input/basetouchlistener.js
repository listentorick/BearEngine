define(function() {
	
		alert('loading BaseTouchListener');

		var BaseTouchListener = Class.extend({
			init: function(){		
			},
			
			setTouchEventCallback: function(touchEventCallback) {
				this.touchEventCallback = touchEventCallback;
			}
	
		});
		
		return BaseTouchListener;
    }
);