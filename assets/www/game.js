define( [	"bearengine/basegame",
			"bearengine/engine/engine", 
			"bearengine/engine/camera/camera",
			"bearengine/entity/scene/scene",
			"bearengine/renderer/canvasrenderer"
			], 
			function(BaseGame, Engine, Camera, Scene, CanvasRenderer) {
			
	//alert('loading gamey!');
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
			
			onLoadRenderer: function(){
				return new CanvasRenderer();
			},

			onLoadScene: function(){
				return new Scene();
			},
			
			onLoadComplete: function(){
			}

		});
		
		return Game;
    }
);