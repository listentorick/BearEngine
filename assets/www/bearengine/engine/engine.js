define(["bearengine/input/controller/singletouchcontroller","bearengine/input/singletouchlistener"], function(SingleTouchController, SingleTouchListener) {
//define(function(SingleTouchController) {

		alert('loading engine');
		
		var Engine = Class.extend({
			init: function( engineOptions, camera){
				this.engineOptions = engineOptions;
				this.camera = camera;
				this.running = false;
				this.lastTick = -1;
				this.setTouchListener(new SingleTouchListener());
				this.setTouchController(new SingleTouchController());	
				this.updateHandlers = [];
				
				var self = this;
				setInterval(function(){
					self.onTickUpdate();
				},1);
	
			},
			
			start: function(){
				if(!this.running) {
					this.lastTick = new Date().getMilliseconds();
					this.running = true;
				}
			},
			
			stop: function(){
				if(this.running) {
					this.running = false;
				}
			},

			getMilliSecondsElapsed: function() {
				var now = new Date().getMilliseconds();
				return this.calculateMilliSecondsElapsed(now, this.lastTick);
			},

			calculateMilliSecondsElapsed: function(now, lastTick) {
				return now - lastTick;
			},
			
			registerUpdateHandler: function(updateHandler) {
				this.updateHandlers.push(updateHandler);
			},
						
			onUpdate: function(milliSecondsElapsed) {
				var secondsElapsed = milliSecondsElapsed / 1000;

				this.secondsElapsedTotal += secondsElapsed;
				this.lastTick += milliSecondsElapsed;

				this.touchController.onUpdate(secondsElapsed);
				this.updateUpdateHandlers(secondsElapsed);
				this.onUpdateScene(secondsElapsed);
			},
			
			updateUpdateHandlers: function(secondsElapsed) {
				//this.mUpdateThreadRunnableHandler.onUpdate(secondsElapsed);
				
				var handlerCount = this.updateHandlers.length;
				for(var i = handlerCount - 1; i >= 0; i--) {
					this.updateHandlers[i].onUpdate(secondsElapsed);
				}

				this.camera.onUpdate(secondsElapsed);
			},
			
			onUpdateScene: function(secondsElapsed) {
				if(this.scene != null) {
					this.scene.onUpdate(pSecondsElapsed);
				}
			},
			
			onTickUpdate: function() {
				if(this.running) {
					var secondsElapsed = this.getMilliSecondsElapsed();
					this.onUpdate(secondsElapsed);
					//this.yieldDraw();
				} else {
					//this.yieldDraw();
				}
			},
			
			//unregisterUpdateHandler: function(updateHandler) {
			//	this.updateHandlers.remove(updateHandler);
			//},
			
			setTouchListener: function(touchListener) {
				this.touchListener = touchListener;
				var self = this;
				touchListener.setTouchEventCallback(function(touchEvent){
					self.onTouch(touchEvent);
				});
			},
			
			setTouchController: function(touchController) {
				this.touchController = touchController;
				//this.touchController.applyTouchOptions(engineOptions.getTouchOptions());
				//this.touchController.setTouchEventCallback(this);
			},
			
			//THis is actual event. We need to abstract so we can use 
			onTouch: function(touchEvent){
				alert('ontouch');
				var handled = this.touchController.onHandleMotionEvent(touchEvent);
				return handled;
			},
			
			
			onTouchEvent: function(){
			},
			
			onLoadComplete: function(scene) {
				this.scene = scene;
			}

			
		});
		
		return Engine;
    }
);