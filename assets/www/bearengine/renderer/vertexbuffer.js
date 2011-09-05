define( function() {

	var VertexBuffer = Class.extend({
		init: function(){
			this._bufferData = [];
		},
		
		update: function(){
		},
		
		getBufferData: function(){
			return this._bufferData;			
		}
			
	});
	
	return VertexBuffer;

});