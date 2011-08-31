define(["bearengine/util/transformation"], function(Transformation) {
		
		//alert(Transformation);
		//alert('loading big ole entity!');
		
		var Entity = Class.extend({

			init: function(x,y){
				this._initialX = x;
				this._initialY = y;
				this._x = x;
				this._y = y;
				this._visible = true;
			},
			
			getParent: function() {
				return this._parent;
			},
			
			setParent: function(parentEntity) {
				return this._parent = parentEntity;
			},
			
			isVisible: function() {
				return this._visible;
			},

			setVisible: function(visible) {
				this._visible = visible;
			},
			
			getZIndex: function() {
				return this._zIndex;
			},

			setZIndex: function(zIndex) {
				this._zIndex = zIndex;
			},

			getX: function() {
				return this._x;
			},

			getY: function() {
				return this._y;
			},
			
			getInitialX: function() {
				return this._initialX;
			},

			getInitialY: function() {
				return this._initialY;
			},
			
			setPosition: function(x, y) {
				this._x = x;
				this._y = y;
			},
	
			setInitialPosition: function() {
				this._x = this._initialX;
				this._y = this._initialY;
			},
	
			getRotation: function() {
				return this._rotation;
			},

			setRotation: function(rotation) {
				this._rotation = rotation;
			},
			
			getRotationCenterX: function() {
				return this._rotationCenterX;
			},

			getRotationCenterY: function() {
				return this._rotationCenterY;
			},
	
			setRotationCenterX: function(rotationCenterX) {
				this._rotationCenterX = rotationCenterX;
			},
	
			setRotationCenterY: function(rotationCenterY) {
				this._rotationCenterY = pRotationCenterY;
			},

			setRotationCenter: function(rotationCenterX, rotationCenterY) {
				this._rotationCenterX = rotationCenterX;
				this._rotationCenterY = rotationCenterY;
			},

			isScaled: function() {
				return this._scaleX != 1 || this._scaleY != 1;
			},

			getScaleX: function() {
				return this._scaleX;
			},

			getScaleY: function() {
				return this._scaleY;
			},

			setScaleX: function(scaleX) {
				this._scaleX = scaleX;
			},

			setScaleY: function(scaleY) {
				this._scaleY = scaleY;
			},

			setScale: function(scaleX, scaleY) {
				this._scaleX = scaleX;
				this._scaleY = scaleY;
			},

			getScaleCenterX: function() {
				return this._scaleCenterX;
			},
			
			getScaleCenterY: function() {
				return this._scaleCenterY;
			},

			setScaleCenterX: function(scaleCenterX) {
				this._scaleCenterX = scaleCenterX;
			},
			
			setScaleCenterY: function(scaleCenterY) {
				this._scaleCenterY = scaleCenterY;
			},
			
			setScaleCenter: function(scaleCenterX, scaleCenterY) {
				this._scaleCenterX = scaleCenterX;
				this._scaleCenterY = scaleCenterY;
			},

			getRed: function() {
				return this._red;
			},

			getGreen: function() {
				return this._green;
			},

			getBlue: function() {
				return this._blue;
			},

			getAlpha: function() {
				return this._alpha;
			},

			/**
			 * @param pAlpha from <code>0.0f</code> (transparent) to <code>1.0f</code> (opaque)
			 */
			setAlpha: function(alpha) {
				this._alpha = alpha;
			},
			
			/**
			 * @param pRed from <code>0.0f</code> to <code>1.0f</code>
			 * @param pGreen from <code>0.0f</code> to <code>1.0f</code>
			 * @param pBlue from <code>0.0f</code> to <code>1.0f</code>
			 */
			setColor: function(red, green, blue) {
				this._red = red;
				this._green = green;
				this._blue = blue;
			},
			
			getChildCount: function() {
				if(this._children == null) {
					return 0;
				}
				return this._children.length;
			},
			
			getChild: function(index) {
				if(this._children == null) {
					return null;
				}
				return this._children[index];
			},

			getFirstChild: function() {
				return this.getChild(0);
			},
			
			getLastChild: function() {
				return this.getChild(this._children.length - 1);
			},

			/*
			@Override
			public void detachChildren() {
				if(this.mChildren == null) {
					return;
				}
				this.mChildren.clear(PARAMETERCALLABLE_DETACHCHILD);
			}*/

			attachChild: function(entity) {
				if(this._children == null) {
					this.allocateChildren();
				}

				this._children.add(entity);
				entity.setParent(this);
				entity.onAttached();
			},

			/*
			findChild: function(entityMatcher) {
				if(this._children == null) {
					return null;
				}
				return this.mChildren.find(pEntityMatcher);
			}*/

			/*
			@Override
			public void sortChildren() {
				if(this.mChildren == null) {
					return;
				}
				ZIndexSorter.getInstance().sort(this.mChildren);
			}

			@Override
			public void sortChildren(final Comparator<IEntity> pEntityComparator) {
				if(this.mChildren == null) {
					return;
				}
				ZIndexSorter.getInstance().sort(this.mChildren, pEntityComparator);
			}*/

			detachChild: function(entity) {
				if(this._children == null) {
					return false;
				}
				return this._children.remove(pEntity, PARAMETERCALLABLE_DETACHCHILD);
			},

			/*
				detachChild: function(entityMatcher) {
				if(this.mChildren == null) {
					return null;
				}
				return this.mChildren.remove(pEntityMatcher);
			}*/
			
			/*
				@Override
				public boolean detachChildren(final IEntityMatcher pEntityMatcher) {
					if(this.mChildren == null) {
						return false;
					}
					return this.mChildren.removeAll(pEntityMatcher, Entity.PARAMETERCALLABLE_DETACHCHILD);
				}
			*/
			
			registerUpdateHandler: function(updateHandler) {
				if(this._updateHandlers == null) {
					this.allocateUpdateHandlers();
				}
				this._updateHandlers.add(updateHandler);
			},

			unregisterUpdateHandler: function(updateHandler) {
				if(this._updateHandlers == null) {
					return false;
				}
				return this._updateHandlers.remove(updateHandler);
			},

			unregisterUpdateHandlers: function(updateHandlerMatcher) {
				if(this._updateHandlers == null) {
					return false;
				}
				return this._updateHandlers.removeAll(updateHandlerMatcher);
			},

			clearUpdateHandlers: function() {
				if(this._updateHandlers == null) {
					return;
				}
				this._updateHandlers.clear();
			},

			registerEntityModifier: function(entityModifier) {
				if(this._entityModifiers == null) {
					this.allocateEntityModifiers();
				}
				this._entityModifiers.add(entityModifier);
			},

			unregisterEntityModifier: function(entityModifier) {
				if(this._entityModifiers == null) {
					return false;
				}
				return this._entityModifiers.remove(entityModifier);
			},
		
			/*
			unregisterEntityModifiers: function(entityModifierMatcher) {
				if(this._entityModifiers == null) {
					return false;
				}
				return this.entityModifiers.removeAll(entityModifierMatcher);
			},

			clearEntityModifiers: function() {
				if(this._entityModifiers == null) {
					return;
				}
				this._entityModifiers.clear();
			}*/

			getSceneCenterCoordinates: function() {
				return this.convertLocalToSceneCoordinates(0, 0);
			},

			convertLocalToSceneCoordinates: function(x, y) {
				Entity.VERTICES_LOCAL_TO_SCENE_TMP[Constants.VERTEX_INDEX_X] = pX;
				Entity.VERTICES_LOCAL_TO_SCENE_TMP[Constants.VERTEX_INDEX_Y] = pY;
				this.getLocalToSceneTransformation().transform(Entity.VERTICES_LOCAL_TO_SCENE_TMP);
				return Entity.VERTICES_LOCAL_TO_SCENE_TMP;
			},

			convertSceneToLocalCoordinates: function(x,y) {
				Entity.VERTICES_SCENE_TO_LOCAL_TMP[Constants.VERTEX_INDEX_X] = pX;
				Entity.VERTICES_SCENE_TO_LOCAL_TMP[Constants.VERTEX_INDEX_Y] = pY;
				this.getSceneToLocalTransformation().transform(Entity.VERTICES_SCENE_TO_LOCAL_TMP);
				return Entity.VERTICES_SCENE_TO_LOCAL_TMP;
			},

			_localToSceneTransformation: new Transformation(),
			
			getLocalToSceneTransformation: function() {
				// TODO skip this calculation when the transformation is not "dirty"
				var localToSceneTransformation = this._localToSceneTransformation;
				localToSceneTransformation.setToIdentity();

				/* Scale. */
				var scaleX = this._scaleX;
				var scaleY = this._scaleY;
				
				if(scaleX != 1 || scaleY != 1) {
					var scaleCenterX = this._scaleCenterX;
					var scaleCenterY = this._scaleCenterY;

					/* TODO Check if it is worth to check for scaleCenterX == 0 && scaleCenterY == 0 as the two postTranslate can be saved.
					 * The same obviously applies for all similar occurrences of this pattern in this class. */

					localToSceneTransformation.postTranslate(-scaleCenterX, -scaleCenterY);
					localToSceneTransformation.postScale(scaleX, scaleY);
					localToSceneTransformation.postTranslate(scaleCenterX, scaleCenterY);
				}

				/* TODO There is a special, but very likely case when mRotationCenter and mScaleCenter are the same.
				 * In that case the last postTranslate of the scale and the first postTranslate of the rotation is superfluous. */

				/* Rotation. */
				var rotation = this._rotation;
				if(rotation != 0) {
					var rotationCenterX = this._rotationCenterX;
					var rotationCenterY = this._rotationCenterY;

					localToSceneTransformation.postTranslate(-rotationCenterX, -rotationCenterY);
					localToSceneTransformation.postRotate(rotation);
					localToSceneTransformation.postTranslate(rotationCenterX, rotationCenterY);
				}

				/* Translation. */
				localToSceneTransformation.postTranslate(this._x, this._y);

				var parent = this._parent;
				if(parent != null) {
					localToSceneTransformation.postConcat(parent.getLocalToSceneTransformation());
				}

				return localToSceneTransformation;
			},

			getSceneToLocalTransformation: function() {
				// TODO skip this calculation when the transformation is not "dirty"
				var sceneToLocalTransformation = this._sceneToLocalTransformation;
				sceneToLocalTransformation.setToIdentity();

				var parent = this._parent;
				if(parent != null) {
					sceneToLocalTransformation.postConcat(parent.getSceneToLocalTransformation());
				}

				/* Translation. */
				sceneToLocalTransformation.postTranslate(-this._x, -this._y);

				/* Rotation. */
				var rotation = this.mRotation;
				if(rotation != 0) {
					var rotationCenterX = this._rotationCenterX;
					var rotationCenterY = this._rotationCenterY;

					sceneToLocalTransformation.postTranslate(-rotationCenterX, -rotationCenterY);
					sceneToLocalTransformation.postRotate(-rotation);
					sceneToLocalTransformation.postTranslate(rotationCenterX, rotationCenterY);
				}

				/* TODO There is a special, but very likely case when mRotationCenter and mScaleCenter are the same.
				 * In that case the last postTranslate of the rotation and the first postTranslate of the scale is superfluous. */

				/* Scale. */
				var scaleX = this._scaleX;
				var scaleY = this._scaleY;
				if(scaleX != 1 || scaleY != 1) {
					var scaleCenterX = this._scaleCenterX;
					var scaleCenterY = this._scaleCenterY;

					sceneToLocalTransformation.postTranslate(-scaleCenterX, -scaleCenterY);
					sceneToLocalTransformation.postScale(1 / scaleX, 1 / scaleY);
					sceneToLocalTransformation.postTranslate(scaleCenterX, scaleCenterY);
				}

				return sceneToLocalTransformation;
			},

		
			onAttached: function() {

			},

			onDetached: function() {

			},

				/*
			@Override
			public Object getUserData() {
				return this.mUserData;
			}

			@Override
			public void setUserData(final Object pUserData) {
				this.mUserData = pUserData;
			}*/

		
			
			
			onDraw: function (renderer, camera) {
				if(this._visible) {
					this.onManagedDraw(renderer, camera);
				}
			},


			onUpdate: function(secondsElapsed) {
				if(!this._ignoreUpdate) {
					this.onManagedUpdate(secondsElapsed);
				}
			},
			
			
			reset: function() {
				this._visible = true;
				this._ignoreUpdate = false;

				this._x = this._initialX;
				this._y = this._initialY;
				this._rotation = 0;
				this._scaleX = 1;
				this._scaleY = 1;

				this._red = 1.0;
				this._green = 1.0;
				this._blue = 1.0;
				this._alpha = 1.0;

				if(this._entityModifiers != null) {
					this._entityModifiers.reset();
				}

				if(this._children != null) {
					var entities = this._children;
					for(var i = entities.length - 1; i >= 0; i--) {
						entities[i].reset();
					}
				}
			},

			// ===========================================================
			// Methods
			// ===========================================================

			/*
			protected void doDraw(final GL10 pGL, final Camera pCamera) {

			}*/

			allocateEntityModifiers: function() {
				this._entityModifiers = [];
			},

			allocateChildren: function() {
				this._children = [];
			},

			allocateUpdateHandlers: function() {
				this._updateHandlers = [];
			},

			onApplyTransformations: function(GL) {
				/* Translation. */
				this.applyTranslation(GL);

				/* Rotation. */
				this.applyRotation(GL);

				/* Scale. */
				this.applyScale(GL);
			},

			applyTranslation: function(GL) {
				GL.glTranslatef(this._x, this._y, 0);
			},

			applyRotation: function(GL) {
				var rotation = this._rotation;

				if(rotation != 0) {
					var rotationCenterX = this._rotationCenterX;
					var rotationCenterY = this._rotationCenterY;

					pGL.glTranslatef(rotationCenterX, rotationCenterY, 0);
					pGL.glRotatef(rotation, 0, 0, 1);
					pGL.glTranslatef(-rotationCenterX, -rotationCenterY, 0);

					/* TODO There is a special, but very likely case when mRotationCenter and mScaleCenter are the same.
					 * In that case the last glTranslatef of the rotation and the first glTranslatef of the scale is superfluous.
					 * The problem is that applyRotation and applyScale would need to be "merged" in order to efficiently check for that condition.  */
				}
			},

			applyScale: function(GL) {
				var scaleX = this._scaleX;
				var scaleY = this._scaleY;

				if(scaleX != 1 || scaleY != 1) {
					var scaleCenterX = this._scaleCenterX;
					var scaleCenterY = this._scaleCenterY;

					GL.glTranslatef(scaleCenterX, scaleCenterY, 0);
					GL.glScalef(scaleX, scaleY, 1);
					GL.glTranslatef(-scaleCenterX, -scaleCenterY, 0);
				}
			},

			onManagedDraw: function(GL, camera) {
				pGL.glPushMatrix();
				{
					this.onApplyTransformations(GL);

					this.doDraw(GL, camera);

					if(this._children != null) {
						var entities = this._children;
						var entityCount = entities.size();
						for(var i = 0; i < entityCount; i++) {
							entities.get(i).onDraw(GL, camera);
						}
					}
				}
				GL.glPopMatrix();
			},

			onManagedUpdate: function(secondsElapsed) {
				if(this._entityModifiers != null) {
					this._entityModifiers.onUpdate(secondsElapsed);
				}
				if(this._updateHandlers != null) {
					this._updateHandlers.onUpdate(secondsElapsed);
				}

				if(this._children != null) {
					var entities = this._children;
					var entityCount = entities.size();
					for(var i = 0; i < entityCount; i++) {
						entities.get(i).onUpdate(pSecondsElapsed);
					}
				}
			}

			

			
		});
		
		
		
		
		alert('loaded big ole entity!');
		
		Entity.VERTICES_SCENE_TO_LOCAL_TMP = [2];
		Entity.VERTICES_LOCAL_TO_SCENE_TMP = [2];
		
		alert('stuff!');
		
		return Entity;
    }
);