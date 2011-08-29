define(["bearengine/input/basetouchlistener"],function(BaseTouchListener) {
	
		alert('loading SingleTouchListener');

		var SingleTouchListener = BaseTouchListener.extend({
			init: function(){	
				alert('attaching events');
				
				var self = this;			
				document.getElementById('gameCanvas').addEventListener('touchstart', function(touchEventArgs){self.touchEventCallback(touchEventArgs);}, false);
				document.getElementById('gameCanvas').addEventListener('touchend', function(touchEventArgs){self.touchEventCallback(touchEventArgs);}, false);
     			alert('attached events');
			
			}	
		});
		
		return SingleTouchListener;
    }
);