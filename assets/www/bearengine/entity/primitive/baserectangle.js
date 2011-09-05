define([
"bearengine/entity/shape/rectangularshape",
"bearengine/renderer/rectanglevertexbuffer"
],function(RectangularShape, RectangleVertexBuffer) {

	var BaseRectangle = RectangularShape.extend({
		init: function(x, y, width, height, vertexBuffer){
			if(!vertexBuffer){
				//construct a rectangular vertex buffer
				vertexBuffer = new RectangleVertexBuffer();
			}
			this._super(x,y,width, height,vertexBuffer);	
		},
	
		onUpdateVertexBuffer: function(){
			this.getVertexBuffer().update(this._width, this._height);
		}
	
	});
	
	return BaseRectangle;

});