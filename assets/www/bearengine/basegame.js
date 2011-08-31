//define(/*["engine/engine.js"]*/ function(engine) {
define(function() {	
		//alert('loading basegame');
		var BaseGame = Class.extend({
			init: function(){
				this._paused = true;
				this._engine = this.onLoadEngine();	
				this._renderer = this.onLoadRenderer();
				this._engine.setRenderer(this._renderer);
				//this.onSetContentView();
			
				this.onLoadResources();
				var scene = this.onLoadScene();
				this._engine.onLoadComplete(scene);
				this.onLoadComplete();
				this._engine.start();
				alert('engine started');
			},
			
			onLoadRenderer: function(){
			},
			/*
			onSetContentView: function() {
				this.mRenderSurfaceView = new RenderSurfaceView(this);
				this.mRenderSurfaceView.setEGLConfigChooser(false);
				this.mRenderSurfaceView.setRenderer(this.mEngine);

				//this.setContentView(this.mRenderSurfaceView, this.createSurfaceViewLayoutParams());
			},*/

			onLoadResources: function(){
			},

			onLoadEngine: function(){
			},

			onLoadScene: function(){
			},

			getEngine: function(){
				return this._engine;
			}
		});
		
		return BaseGame;
    }
);