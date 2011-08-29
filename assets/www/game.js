define( ["bearengine/basegame","bearengine/engine/engine", "bearengine/engine/camera/camera"], function(BaseGame, Engine, Camera) {
	alert('loading gamey!');
		var Game = BaseGame.extend({

			init: function(){
				this._super();
			},
		  
			onLoadResources: function(){
			},

			onLoadEngine: function(){
				var camera = new Camera(0,0,800,480);
				return new Engine(null,camera);
			},

			onLoadScene: function(){
			},
			
			onLoadComplete: function(){
			}

		});
		
		return Game;
    }
);