define( [	"bearengine/basegame",
			"bearengine/engine/engine", 
			"bearengine/engine/camera/camera",
			"bearengine/entity/scene/scene",
			"bearengine/renderer/canvasrenderer",
			"bearengine/entity/primitive/rectangle"
			], 
			function(BaseGame, Engine, Camera, Scene, CanvasRenderer, Rectangle) {
			
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
				alert('onloadcomplete');
				var rectangle = new Rectangle(20,20,100,100);
				rectangle.setColor(1,0,0,1);
				var scene = this.getEngine().getScene();
				scene.attachChild(rectangle);
			}

		});
		
		return Game;
    }
);