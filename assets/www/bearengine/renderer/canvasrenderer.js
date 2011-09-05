define(function() {
			
	alert('loading CanvasRenderer!');
		var CanvasRenderer = Class.extend({

			init: function(){
				this._drawingCanvas = document.getElementById("gameCanvas");
				this._drawingContext = this._drawingCanvas.getContext('2d');
			},
			
			translate: function(x,y){
				this._drawingContext.translate(x,y);
			},
			
			rotate: function(angle){
				this._drawingContext.rotate(angle);
			},
			
			scale: function(scaleX,scaleY){
			
			},
			
			_vertices: [],
			
			setColor: function(r,g,b,a){
			
			},
			
			selectVertices: function(vertices){
				this._vertices = vertices;
			},
			
			begin: function(){
				this._drawingContext.save();
			
			},
			
			end: function(){
				this._drawingContext.restore();
			},
			
			drawTriangleStrip: function(){
			}
			
		
		});
		
		return CanvasRenderer;
    }
);