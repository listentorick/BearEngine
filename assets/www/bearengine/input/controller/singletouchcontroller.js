define(["bearengine/input/controller/basetouchcontroller"], function(BaseTouchController) {

		alert('loading singletouchcontroller');
		var SingleTouchController = BaseTouchController.extend({
		
			init: function(){		
			},
			
			onHandleMotionEvent: function(touchEvent) {
				alert('onHandleMotionEvent');
				//for(var i in touchEvent){
				//	alert(touchEvent[i]);
				//}
				return this.fireTouchEvent(pMotionEvent.getX(), pMotionEvent.getY(), pMotionEvent.getAction(), 0, pMotionEvent);
			}
		});
		
		return SingleTouchController;
    }
);