define( ["bearengine/entity/primitive/baserectangle"],function(BaseRectangle) {

		var Rectangle = BaseRectangle.extend({
			init: function(x, y, width, height, vertexBuffer){
				this._super(x,y,width, height);	
			},
		
			onInitDraw: function(renderer) {
				this._super(renderer);
				//GLHelper.disableTextures(pGL);
				//GLHelper.disableTexCoordArray(pGL);
			}
		
		});
		
		return Rectangle;

});