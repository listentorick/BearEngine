define( ["bearengine/renderer/vertexbuffer"], function(VertexBuffer) {

	var RectangularVertexBuffer = VertexBuffer.extend({		
		update: function(width,height){

			var bufferData = this._bufferData;
			
			bufferData[0] = 0; //x
			bufferData[1] = 0; //y

			bufferData[2] = 0; //x
			bufferData[3] = height; //y2

			bufferData[4] = width; //x2
			bufferData[5] = 0; //y

			bufferData[6] = width; //x2
			bufferData[7] = height; //y2

		}	
	});
	
	return RectangularVertexBuffer;

});