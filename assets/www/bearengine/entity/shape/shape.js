define( ["bearengine/entity/entity"],function(Entity) {

		var Shape = Entity.extend({
			init: function( x,y){
				this._super(x,y);
				this._cullingEnabled = false;
			},
			
			setCullingEnabled: function(cullingEnabled) {
				this._cullingEnabled = cullingEnabled;
			},

			getWidthScaled: function() {
				return this.getWidth() * this._scaleX;
			},

			getHeightScaled: function() {
				return this.getHeight() * this._scaleY;
			},

			onUpdateVertexBuffer: function(){},
			getVertexBuffer: function(){},
			drawVertices: function(renderer,camera){},

			doDraw: function(renderer, camera) {
				this.onInitDraw(renderer);
				this.onApplyVertices(renderer);
				this.drawVertices(renderer, camera);
			},

			onAreaTouched: function(sceneTouchEvent, touchAreaLocalX, touchAreaLocalY) {
				return false;
			},

			/**
			 * Will only be performed if {@link Shape#isCullingEnabled()} is true.
			 * @param camera
			 * @return <code>true</code> when this object is visible by the {@link Camera}, <code>false</code> otherwise.
			 */
			isCulled:function(camera){},

			onManagedDraw: function(renderer, camera) {
				if(this._cullingEnabled == false || this.isCulled(camera) == false) {
					this._super(renderer, camera);
				}
			},

			reset: function() {
				this._super();
				//this._sourceBlendFunction = BLENDFUNCTION_SOURCE_DEFAULT;
				//this._destinationBlendFunction = BLENDFUNCTION_DESTINATION_DEFAULT;
			},

			onInitDraw: function(renderer) {
			
				renderer.setColor(this._red,this._green,this._blue,this._alpha);
			
				//GLHelper.setColor(pGL, this.mRed, this.mGreen, this.mBlue, this.mAlpha);
				//GLHelper.enableVertexArray(pGL);
				//GLHelper.blendFunction(pGL, this.mSourceBlendFunction, this.mDestinationBlendFunction);
			},

			onApplyVertices: function(renderer) {
			
				renderer.selectVertices(this.getVertexBuffer().getBufferData());
				/*
				if(GLHelper.EXTENSIONS_VERTEXBUFFEROBJECTS) {
					final GL11 gl11 = (GL11)pGL;

					this.getVertexBuffer().selectOnHardware(gl11);
					GLHelper.vertexZeroPointer(gl11);
				} else {
					GLHelper.vertexPointer(pGL, this.getVertexBuffer().getFloatBuffer());
				}*/
			},

			updateVertexBuffer: function() {
				this.onUpdateVertexBuffer();
			}
		
		});
		
		return Shape;

});