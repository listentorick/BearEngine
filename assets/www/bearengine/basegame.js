//define(/*["engine/engine.js"]*/ function(engine) {
define(function() {	
		alert('loading basegame');
		var BaseGame = Class.extend({
			init: function(){
				this.engine = this.onLoadEngine();
				this.onLoadResources();
				var scene = this.onLoadScene();
				this.engine.onLoadComplete(scene);
				this.onLoadComplete();
				this.engine.start();
			},

			onLoadResources: function(){
			},

			onLoadEngine: function(){
			},

			onLoadScene: function(){
			},

			getEngine: function(){
				return this.engine;
			}
		});
		
		return BaseGame;
    }
);