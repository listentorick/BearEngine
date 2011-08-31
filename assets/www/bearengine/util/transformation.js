define(function() {

		//alert('loading transformation!');

		var Transformation = Class.extend({
			
			init: function(){
				this._a = 1.0;
				this._d = 1.0;
			},
			
			reset: function() {
				this.setToIdentity();
			},

			setToIdentity: function() {
				this._a = 1.0;
				this._d = 1.0;

				this._b = 0.0;
				this._c = 0.0;
				this._tx = 0.0;
				this._ty = 0.0;
			},

			preTranslate: function(x, y) {
				var transformation = TransformationPool.obtain();
				this.preConcat(transformation.setToTranslate(x, y));
				TransformationPool.recycle(transformation);
			},

			postTranslate: function(x, y) {
				var transformation = TransformationPool.obtain();
				this.postConcat(transformation.setToTranslate(x, y));
				TransformationPool.recycle(transformation);
			},

			setToTranslate: function(x, y) {
				this._a = 1;
				this._b = 0;
				this._c = 0;
				this._d = 1;
				this._tx = pX;
				this._ty = pY;
				return this;
			},

			preScale: function(scaleX, scaleY) {
				var transformation = TransformationPool.obtain();
				this.preConcat(transformation.setToScale(x, y));
				TransformationPool.recycle(transformation);
			},

			postScale: function(scaleX, scaleY) {
				var transformation = TransformationPool.obtain();
				this.postConcat(transformation.setToScale(scaleX, scaleY));
				TransformationPool.recycle(transformation);
			},

			setToScale: function(scaleX, scaleY) {
				this._a = scaleX;
				this._b = 0;
				this._c = 0;
				this._d = scaleY;
				this._tx = 0;
				this._ty = 0;
				return this;
			},

			preRotate: function(angle) {
				var transformation = TransformationPool.obtain();
				this.preConcat(transformation.setToRotate(angle));
				TransformationPool.recycle(transformation);
			},

			postRotate: function(angle) {
				var transformation = TransformationPool.obtain();
				this.postConcat(transformation.setToRotate(angle));
				TransformationPool.recycle(transformation);
			},

			setToRotate: function(angle) {
				var angleRad = MathUtils.degToRad(angle);
				var sin = FloatMath.sin(angleRad);
				var cos = FloatMath.cos(angleRad);
				this._a = cos;
				this._b = sin;
				this._c = -sin;
				this._d = cos;
				this._tx = 0;
				this._ty = 0;
				return this;
			},

			postConcat: function(transformation) {
				var a1 = this._a;
				var a2 = transformation.a;

				var b1 = this._b;
				var b2 = transformation.b;

				var c1 = this._c;
				var c2 = transformation._c;

				var d1 = this._d;
				var d2 = transformation._d;

				var tx1 = this._tx;
				var tx2 = transformation._tx;

				var ty1 = this._ty;
				var ty2 = transformation._ty;

				this._a = a1 * a2 + b1 * c2;
				this._b = a1 * b2 + b1 * d2;
				this._c = c1 * a2 + d1 * c2;
				this._d = c1 * b2 + d1 * d2;
				this._tx = tx1 * a2 + ty1 * c2 + tx2;
				this._ty = tx1 * b2 + ty1 * d2 + ty2;
			},

			preConcat: function(transformation) {
				var a1 = transformation._a;
				var a2 = this._a;

				var b1 = transformation._b;
				var b2 = this._b;

				var c1 = transformation._c;
				var c2 = this._c;

				var d1 = transformation._d;
				var d2 = this._d;

				var tx1 = transformation._tx;
				var tx2 = this._tx;

				var ty1 = transformation._ty;
				var ty2 = this._ty;

				this._a = a1 * a2 + b1 * c2;
				this._b = a1 * b2 + b1 * d2;
				this._c = c1 * a2 + d1 * c2;
				this._d = c1 * b2 + d1 * d2;
				this._tx = tx1 * a2 + ty1 * c2 + tx2;
				this._ty = tx1 * b2 + ty1 * d2 + ty2;
			},

			transform: function(vertices) {
				var count = vertices.length / 2;
				var i = 0;
				var j = 0;
				while(--count >= 0) {
					var x = vertices[i++];
					var y = vertices[i++];
					vertices[j++] = x * this._a + y * this._c + this._tx;
					vertices[j++] = x * this._b + y * this._d + this._ty;
				}
			}

		});
		
		return Transformation;
    }
);