define([
		"bearengine/entity/shape/shape"
		
		],function(Shape) {

		var RectangularShape = Shape.extend({
			init: function(x, y, width, height, vertexBuffer){
				this._super(x,y);
				
				this._baseWidth = width;
				this._baseHeight = height;

				this._width = width;
				this._height = height;

				this._vertexBuffer = vertexBuffer;
				//BufferObjectManager.getActiveInstance().loadBufferObject(this.vertexBuffer);

				this._rotationCenterX = width * 0.5;
				this._rotationCenterY = height * 0.5;

				this._scaleCenterX = this._rotationCenterX;
				this._scaleCenterY = this._rotationCenterY;
				
			},
			
			getVertexBuffer: function() {
				return this._vertexBuffer;
			},
	
			getWidth: function () {
				return this._width;
			},

			getHeight: function() {
				return this._height;
			},

			getBaseWidth: function() {
				return this.mBaseWidth;
			},

			getBaseHeight: function() {
				return this._baseHeight;
			},

			setWidth: function(width) {
				this._width = width;
				this.updateVertexBuffer();
			},

			setHeight: function(height) {
				this._height = height;
				this.updateVertexBuffer();
			},

			setSize: function(width, height) {
				this._width = width;
				this._height = height;
				this.updateVertexBuffer();
			},

			setBaseSize: function() {
				if(this._width != this._baseWidth || this._height != this._baseHeight) {
					this._width = this._baseWidth;
					this._height = this._baseHeight;
					this.updateVertexBuffer();
				}
			},

			isCulled: function(camera) {
				var x = this._x;
				var y = this._y;
				return x > camera.getMaxX()
					|| y > camera.getMaxY()
					|| x + this.getWidth() < camera.getMinX()
					|| y + this.getHeight() < camera.getMinY();
			},

			drawVertices: function(renderer, camera) {
				renderer.drawTriangleStrip();
				//pGL.glDrawArrays(GL10.GL_TRIANGLE_STRIP, 0, 4);
			},

			reset: function() {
				this._super();
				this.setBaseSize();

				var baseWidth = this.getBaseWidth();
				var baseHeight = this.getBaseHeight();

				this._rotationCenterX = baseWidth * 0.5;
				this._rotationCenterY = baseHeight * 0.5;

				this._scaleCenterX = this._rotationCenterX;
				this._scaleCenterY = this._rotationCenterY;
			},

			/*
			@Override
			public boolean contains(final float pX, final float pY) {
				return RectangularShapeCollisionChecker.checkContains(this, pX, pY);
			}
		*/
			getSceneCenterCoordinates: function() {
				return this.convertLocalToSceneCoordinates(this._width * 0.5, this._height * 0.5);
			},

			/*
			@Override
			public boolean collidesWith(final IShape pOtherShape) {
				if(pOtherShape instanceof RectangularShape) {
					final RectangularShape pOtherRectangularShape = (RectangularShape) pOtherShape;

					return RectangularShapeCollisionChecker.checkCollision(this, pOtherRectangularShape);
				} else {
					return false;
				}
			}*/
					
		
		});
		
			alert('RectangularShape2');
		
		return RectangularShape;

});