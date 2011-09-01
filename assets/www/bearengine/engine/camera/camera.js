define(function() {

		var Camera = Class.extend({

			init: function(x,y,width,height){
				this._minX = x;
				this._maxX = x + width;
				this._minY = y;
				this._maxY = y + height;
				this._rotation = 0;
				this._cameraSceneRotation = 0;				
			},
			
			getMinX: function() {
				return this._minX;
			},

			getMaxX: function() {
				return this._maxX;
			},

			getMinY: function() {
				return this._minY;
			},

			getMaxY: function() {
				return this._maxY;
			},	

			getNearZClippingPlane: function() {
				return this._nearZ;
			},

			getFarZClippingPlane: function() {
				return this._farZ;
			},

			setNearZClippingPlane: function(nearZClippingPlane) {
				this._nearZ = nearZClippingPlane;
			},

			setFarZClippingPlane: function(farZClippingPlane) {
				this._farZ = farZClippingPlane;
			},

			setZClippingPlanes: function(nearZClippingPlane, farZClippingPlane) {
				this._nearZ = nearZClippingPlane;
				this._farZ = farZClippingPlane;
			},

			getWidth: function() {
				return this._maxX - this._minX;
			},

			getHeight: function() {
				return this._maxY - this._minY;
			},

			getCenterX: function() {
				var minX = this._minX;
				return minX + (this._maxX - minX) * 0.5;
			},

			getCenterY: function() {
				var minY = this._minY;
				return minY + (this._maxY - minY) * 0.5;
			},

			setCenter: function(centerX, centerY) {
				var dx = centerX - this.getCenterX();
				var dy = centerY - this.getCenterY();

				this._minX += dx;
				this._maxX += dx;
				this._minY += dy;
				this._maxY += dy;
			},

			offsetCenter: function(x, y) {
				this.setCenter(this.getCenterX() + x, this.getCenterY() + y);
			},
			
			getHUD: function() {
				return this._HUD;
			},

			setHUD: function(HUD) {
				this._HUD = HUD;
				HUD.setCamera(this);
			},

			hasHUD: function() {
				return this._HUD != null;
			},

			setChaseEntity: function(chaseEntity) {
				this._chaseEntity = chaseEntity;
			},

			getRotation: function() {
				return this._rotation;
			},

			setRotation: function(rotation) {
				this._rotation = rotation;
			},

			getCameraSceneRotation: function() {
				return this._cameraSceneRotation;
			},

			setCameraSceneRotation: function(cameraSceneRotation) {
				this._cameraSceneRotation = cameraSceneRotation;
			},

			onUpdate: function(secondsElapsed) {
				if(this._HUD != null) {
					this._HUD.onUpdate(secondsElapsed);
				}

				if(this._chaseEntity != null) {
					var centerCoordinates = this._chaseEntity.getSceneCenterCoordinates();
					this.setCenter(centerCoordinates[VERTEX_INDEX_X], centerCoordinates[VERTEX_INDEX_Y]);
				}
			},

			reset: function() {

			},

			onDrawHUD: function(renderer) {
				if(this._HUD != null) {
					this._HUD.onDraw(renderer, this);
				}
			},

			isRectangularShapeVisible: function(rectangularShape) {
				var otherLeft = rectangularShape.getX();
				var otherTop = rectangularShape.getY();
				var otherRight = rectangularShape.getWidthScaled() + otherLeft;
				var otherBottom = rectangularShape.getHeightScaled() + otherTop;

				// TODO Should also use RectangularShapeCollisionChecker
				return BaseCollisionChecker.checkAxisAlignedRectangleCollision(this.getMinX(), this.getMinY(), this.getMaxX(), this.getMaxY(), otherLeft, otherTop, otherRight, otherBottom);
			},

			onApplyMatrix: function(renderer) {
				//return;
				//GLHelper.setProjectionIdentityMatrix(pGL);

				//this is creating a projection which defines the view onto the world
				//pGL.glOrthof(this.getMinX(), this.getMaxX(), this.getMaxY(), this.getMinY(), this._nearZ, this._farZ);

				var rotation = this._rotation;
				if(rotation != 0) {
					this.applyRotation(renderer, this.getCenterX(), this.getCenterY(), rotation);
				}
			},

			onApplyPositionIndependentMatrix: function(renderer){
				return;
				GLHelper.setProjectionIdentityMatrix(pGL);
				
				var width = this._maxX - this._minX;
				var height = this._maxY - this._minY;

				pGL.glOrthof(0, width, height, 0, this._nearZ, this._farZ);

				var rotation = this._rotation;
				if(rotation != 0) {
					this.applyRotation(renderer, width * 0.5, height * 0.5, rotation);
				}
		
			},

			onApplyCameraSceneMatrix: function(renderer) {
				return;
				GLHelper.setProjectionIdentityMatrix(pGL);

				var width = this._maxX - this._minX;
				var height = this._maxY - this._minY;

				pGL.glOrthof(0, width, height, 0, this.mNearZ, this.mFarZ);

				var cameraSceneRotation = this.mCameraSceneRotation;
				if(cameraSceneRotation != 0) {
					this.applyRotation(pGL, width * 0.5, height * 0.5, cameraSceneRotation);
				}
			},

			applyRotation: function(renderer, rotationCenterX, rotationCenterY, angle) {
				//return;
				//pGL.glTranslatef(pRotationCenterX, rotationCenterY, 0);  
				//pGL.glRotatef(angle, 0, 0, 1);
				//pGL.glTranslatef(-rotationCenterX, -rotationCenterY, 0);
				renderer.translate(rotationCenterX,rotationCenterY);
				renderer.rotate(angle);
				renderer.translate(-rotationCenterX, -rotationCenterY);
			},

			/*
	public void convertSceneToCameraSceneTouchEvent(final TouchEvent pSceneTouchEvent) {
		this.unapplySceneRotation(pSceneTouchEvent);

		this.applySceneToCameraSceneOffset(pSceneTouchEvent);

		this.applyCameraSceneRotation(pSceneTouchEvent);
	}

	public void convertCameraSceneToSceneTouchEvent(final TouchEvent pCameraSceneTouchEvent) {
		this.unapplyCameraSceneRotation(pCameraSceneTouchEvent);

		this.unapplySceneToCameraSceneOffset(pCameraSceneTouchEvent);

		this.applySceneRotation(pCameraSceneTouchEvent);
	}

	protected void applySceneToCameraSceneOffset(final TouchEvent pSceneTouchEvent) {
		pSceneTouchEvent.offset(-this.mMinX, -this.mMinY);
	}

	protected void unapplySceneToCameraSceneOffset(final TouchEvent pCameraSceneTouchEvent) {
		pCameraSceneTouchEvent.offset(this.mMinX, this.mMinY);
	}

	private void applySceneRotation(final TouchEvent pCameraSceneTouchEvent) {
		final float rotation = -this.mRotation;
		if(rotation != 0) {
			VERTICES_TOUCH_TMP[VERTEX_INDEX_X] = pCameraSceneTouchEvent.getX();
			VERTICES_TOUCH_TMP[VERTEX_INDEX_Y] = pCameraSceneTouchEvent.getY();

			MathUtils.rotateAroundCenter(VERTICES_TOUCH_TMP, rotation, this.getCenterX(), this.getCenterY());

			pCameraSceneTouchEvent.set(VERTICES_TOUCH_TMP[VERTEX_INDEX_X], VERTICES_TOUCH_TMP[VERTEX_INDEX_Y]);
		}
	}

	private void unapplySceneRotation(final TouchEvent pSceneTouchEvent) {
		final float rotation = this.mRotation;

		if(rotation != 0) {
			VERTICES_TOUCH_TMP[VERTEX_INDEX_X] = pSceneTouchEvent.getX();
			VERTICES_TOUCH_TMP[VERTEX_INDEX_Y] = pSceneTouchEvent.getY();

			MathUtils.revertRotateAroundCenter(VERTICES_TOUCH_TMP, rotation, this.getCenterX(), this.getCenterY());

			pSceneTouchEvent.set(VERTICES_TOUCH_TMP[VERTEX_INDEX_X], VERTICES_TOUCH_TMP[VERTEX_INDEX_Y]);
		}
	}

	private void applyCameraSceneRotation(final TouchEvent pSceneTouchEvent) {
		final float cameraSceneRotation = -this.mCameraSceneRotation;

		if(cameraSceneRotation != 0) {
			VERTICES_TOUCH_TMP[VERTEX_INDEX_X] = pSceneTouchEvent.getX();
			VERTICES_TOUCH_TMP[VERTEX_INDEX_Y] = pSceneTouchEvent.getY();

			MathUtils.rotateAroundCenter(VERTICES_TOUCH_TMP, cameraSceneRotation, (this.mMaxX - this.mMinX) * 0.5f, (this.mMaxY - this.mMinY) * 0.5f);

			pSceneTouchEvent.set(VERTICES_TOUCH_TMP[VERTEX_INDEX_X], VERTICES_TOUCH_TMP[VERTEX_INDEX_Y]);
		}
	}

	private void unapplyCameraSceneRotation(final TouchEvent pCameraSceneTouchEvent) {
		final float cameraSceneRotation = -this.mCameraSceneRotation;

		if(cameraSceneRotation != 0) {
			VERTICES_TOUCH_TMP[VERTEX_INDEX_X] = pCameraSceneTouchEvent.getX();
			VERTICES_TOUCH_TMP[VERTEX_INDEX_Y] = pCameraSceneTouchEvent.getY();

			MathUtils.revertRotateAroundCenter(VERTICES_TOUCH_TMP, cameraSceneRotation, (this.mMaxX - this.mMinX) * 0.5f, (this.mMaxY - this.mMinY) * 0.5f);

			pCameraSceneTouchEvent.set(VERTICES_TOUCH_TMP[VERTEX_INDEX_X], VERTICES_TOUCH_TMP[VERTEX_INDEX_Y]);
		}
	}

	public void convertSurfaceToSceneTouchEvent(final TouchEvent pSurfaceTouchEvent, final int pSurfaceWidth, final int pSurfaceHeight) {
		final float relativeX;
		final float relativeY;

		final float rotation = this.mRotation;
		if(rotation == 0) {
			relativeX = pSurfaceTouchEvent.getX() / pSurfaceWidth;
			relativeY = pSurfaceTouchEvent.getY() / pSurfaceHeight;
		} else if(rotation == 180) {
			relativeX = 1 - (pSurfaceTouchEvent.getX() / pSurfaceWidth);
			relativeY = 1 - (pSurfaceTouchEvent.getY() / pSurfaceHeight);
		} else {
			VERTICES_TOUCH_TMP[VERTEX_INDEX_X] = pSurfaceTouchEvent.getX();
			VERTICES_TOUCH_TMP[VERTEX_INDEX_Y] = pSurfaceTouchEvent.getY();

			MathUtils.rotateAroundCenter(VERTICES_TOUCH_TMP, rotation, pSurfaceWidth / 2, pSurfaceHeight / 2);

			relativeX = VERTICES_TOUCH_TMP[VERTEX_INDEX_X] / pSurfaceWidth;
			relativeY = VERTICES_TOUCH_TMP[VERTEX_INDEX_Y] / pSurfaceHeight;
		}

		this.convertAxisAlignedSurfaceToSceneTouchEvent(pSurfaceTouchEvent, relativeX, relativeY);
	}

	private void convertAxisAlignedSurfaceToSceneTouchEvent(final TouchEvent pSurfaceTouchEvent, final float pRelativeX, final float pRelativeY) {
		final float minX = this.getMinX();
		final float maxX = this.getMaxX();
		final float minY = this.getMinY();
		final float maxY = this.getMaxY();

		final float x = minX + pRelativeX * (maxX - minX);
		final float y = minY + pRelativeY * (maxY - minY);

		pSurfaceTouchEvent.set(x, y);
	}
			
			
			
			
			
			
			
			
			*/
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		});
		
		return Camera;
    }
);