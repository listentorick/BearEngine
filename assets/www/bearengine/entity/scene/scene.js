define([
	"bearengine/entity/entity",
	"bearengine/entity/scene/background/colorbackground",
	], function(Entity, ColorBackground) {

		//alert('loading Scene');
		
		var Scene = Entity.extend({
		
			init: function(layerCount){
				this._super(0,0);
				this._background = new ColorBackground(0, 0, 0);
				this._backgroundEnabled = true;
				this._onAreaTouchTraversalBackToFront = true;
				this._touchAreaBindingEnabled = false;
				this._touchAreaBindings = [];
		/*		
				for(var i = layerCount - 1; i >= 0; i--) {
					this.attachChild(new Layer());
				}*/
	
			},
			
			getBackground: function() {
				return this.mBackground;
			},

			setBackground: function(background) {
				this._background = background;
			},
			
			isBackgroundEnabled: function() {
				return this._backgroundEnabled;
			},

			setBackgroundEnabled: function(enabled) {
				this._backgroundEnabled = enabled;
			},

			setOnSceneTouchListener: function(onSceneTouchListener) {
				this._onSceneTouchListener = onSceneTouchListener;
			},

			getOnSceneTouchListener: function() {
				return this._onSceneTouchListener;
			},

			hasOnSceneTouchListener: function() {
				return this._onSceneTouchListener != null;
			},

			setOnAreaTouchListener: function(onAreaTouchListener) {
				this._onAreaTouchListener = onAreaTouchListener;
			},

			getOnAreaTouchListener: function() {
				return this._onAreaTouchListener;
			},

			hasOnAreaTouchListener: function() {
				return this._onAreaTouchListener != null;
			},

			/*
	private void setParentScene(final Scene pParentScene) {
		this.mParentScene = pParentScene;
	}

	public boolean hasChildScene() {
		return this.mChildScene != null;
	}

	public Scene getChildScene() {
		return this.mChildScene;
	}

	public void setChildSceneModal(final Scene pChildScene) {
		this.setChildScene(pChildScene, true, true, true);
	}

	public void setChildScene(final Scene pChildScene) {
		this.setChildScene(pChildScene, false, false, false);
	}

	public void setChildScene(final Scene pChildScene, final boolean pModalDraw, final boolean pModalUpdate, final boolean pModalTouch) {
		pChildScene.setParentScene(this);
		this.mChildScene = pChildScene;
		this.mChildSceneModalDraw = pModalDraw;
		this.mChildSceneModalUpdate = pModalUpdate;
		this.mChildSceneModalTouch = pModalTouch;
	}

	public void clearChildScene() {
		this.mChildScene = null;
	}
*/
			setOnAreaTouchTraversalBackToFront: function() {
				this._onAreaTouchTraversalBackToFront = true;
			},

			setOnAreaTouchTraversalFrontToBack: function() {
				this._onAreaTouchTraversalBackToFront = false;
			},

			/**
			 * Enable or disable the binding of TouchAreas to PointerIDs (fingers).
			 * When enabled: TouchAreas get bound to a PointerID (finger) when returning true in
			 * {@link Shape#onAreaTouched(TouchEvent, float, float)} or
			 * {@link IOnAreaTouchListener#onAreaTouched(TouchEvent, ITouchArea, float, float)}
			 * with {@link MotionEvent#ACTION_DOWN}, they will receive all subsequent {@link TouchEvent}s
			 * that are made with the same PointerID (finger)
			 * <b>even if the {@link TouchEvent} is outside of the actual {@link ITouchArea}</b>!
			 * 
			 * @param pTouchAreaBindingEnabled
			 */
			setTouchAreaBindingEnabled: function(touchAreaBindingEnabled) {
				if(this._touchAreaBindingEnabled && !touchAreaBindingEnabled) {
					this._touchAreaBindings.clear();
				}
				this._touchAreaBindingEnabled = touchAreaBindingEnabled;
			},

			isTouchAreaBindingEnabled: function() {
				return this._touchAreaBindingEnabled;
			},	

			// ===========================================================
			// Methods for/from SuperClass/Interfaces
			// ===========================================================

			
			onManagedDraw: function(renderer,camera) {
				var childScene = this._childScene;

				if(childScene == null || !this._childSceneModalDraw) {
					if(this._backgroundEnabled) {
						camera.onApplyPositionIndependentMatrix(renderer); //we dont care about the position of the camera here
						//GLHelper.setModelViewIdentityMatrix(renderer);

						this._background.onDraw(renderer, camera);
					}

					camera.onApplyMatrix(renderer);//the position/rotation etc of the camera matters here
					//GLHelper.setModelViewIdentityMatrix(renderer);
					
					this._super(renderer, camera);
					//super.onManagedDraw(GL, camera);
				}

				if(childScene != null) {
					childScene.onDraw(GL, camera);
				}
			},

			onManagedUpdate: function(secondsElapsed) {
				this._secondsElapsedTotal += secondsElapsed;

				//this.mRunnableHandler.onUpdate(pSecondsElapsed);

				var childScene = this._childScene;
				if(childScene == null || !this._childSceneModalUpdate) {
					this._background.onUpdate(secondsElapsed);
					//super.onManagedUpdate(secondsElapsed);
					this._super(secondsElapsed);
				}

				if(childScene != null) {
					childScene.onUpdate(pSecondsElapsed);
				}
			},

			onSceneTouchEvent: function (sceneTouchEvent) {
			/*
				var action = sceneTouchEvent.getAction();
				var isActionDown = sceneTouchEvent.isActionDown();

				if(this._touchAreaBindingEnabled && !isActionDown) {
					var touchAreaBindings = this._touchAreaBindings;
					var boundTouchArea = touchAreaBindings.get(sceneTouchEvent.getPointerID());
					// In the case a ITouchArea has been bound to this PointerID,
					// we'll pass this this TouchEvent to the same ITouchArea. 
					if(boundTouchArea != null) {
						var sceneTouchEventX = sceneTouchEvent.getX();
						var sceneTouchEventY = sceneTouchEvent.getY();

						// Check if boundTouchArea needs to be removed. 
						switch(action) {
							case MotionEvent.ACTION_UP:
							case MotionEvent.ACTION_CANCEL:
								touchAreaBindings.remove(sceneTouchEvent.getPointerID());
						}
						var handled = this.onAreaTouchEvent(sceneTouchEvent, sceneTouchEventX, sceneTouchEventY, boundTouchArea);
						if(handled != null && handled) {
							return true;
						}
					}
				}

				var childScene = this._childScene;
				if(childScene != null) {
					var handledByChild = this.onChildSceneTouchEvent(pSceneTouchEvent);
					if(handledByChild) {
						return true;
					} else if(this._childSceneModalTouch) {
						return false;
					}
				}

				var sceneTouchEventX = sceneTouchEvent.getX();
				var sceneTouchEventY = sceneTouchEvent.getY();

				var touchAreas = this._touchAreas;
				if(touchAreas != null) {
					final int touchAreaCount = touchAreas.size();
					if(touchAreaCount > 0) {
						if(this.mOnAreaTouchTraversalBackToFront) { // Back to Front. 
							for(int i = 0; i < touchAreaCount; i++) {
								final ITouchArea touchArea = touchAreas.get(i);
								if(touchArea.contains(sceneTouchEventX, sceneTouchEventY)) {
									final Boolean handled = this.onAreaTouchEvent(pSceneTouchEvent, sceneTouchEventX, sceneTouchEventY, touchArea);
									if(handled != null && handled) {
										// If binding of ITouchAreas is enabled and this is an ACTION_DOWN event,
										//  bind this ITouchArea to the PointerID. 
										if(this.mTouchAreaBindingEnabled && isActionDown) {
											this.mTouchAreaBindings.put(pSceneTouchEvent.getPointerID(), touchArea);
										}
										return true;
									}
								}
							}
						} else { // Front to back. 
							for(int i = touchAreaCount - 1; i >= 0; i--) {
								final ITouchArea touchArea = touchAreas.get(i);
								if(touchArea.contains(sceneTouchEventX, sceneTouchEventY)) {
									final Boolean handled = this.onAreaTouchEvent(pSceneTouchEvent, sceneTouchEventX, sceneTouchEventY, touchArea);
									if(handled != null && handled) {
										// If binding of ITouchAreas is enabled and this is an ACTION_DOWN event
										//   bind this ITouchArea to the PointerID.
										if(this.mTouchAreaBindingEnabled && isActionDown) {
											this.mTouchAreaBindings.put(pSceneTouchEvent.getPointerID(), touchArea);
										}
										return true;
									}
								}
							}
						}
					}
				}
				// If no area was touched, the Scene itself was touched as a fallback.
				if(this.mOnSceneTouchListener != null){
					return this.mOnSceneTouchListener.onSceneTouchEvent(this, pSceneTouchEvent);
				} else {
					return false;
				}*/
			},

			onAreaTouchEvent: function(sceneTouchEvent, sceneTouchEventX, sceneTouchEventY, touchArea) {
			/*
				final float[] touchAreaLocalCoordinates = touchArea.convertSceneToLocalCoordinates(sceneTouchEventX, sceneTouchEventY);
				final float touchAreaLocalX = touchAreaLocalCoordinates[Constants.VERTEX_INDEX_X];
				final float touchAreaLocalY = touchAreaLocalCoordinates[Constants.VERTEX_INDEX_Y];

				final boolean handledSelf = touchArea.onAreaTouched(pSceneTouchEvent, touchAreaLocalX, touchAreaLocalY);
				if(handledSelf) {
					return Boolean.TRUE;
				} else if(this.mOnAreaTouchListener != null) {
					return this.mOnAreaTouchListener.onAreaTouched(pSceneTouchEvent, touchArea, touchAreaLocalX, touchAreaLocalY);
				} else {
					return null;
				}*/
			},

			/*
			protected boolean onChildSceneTouchEvent(final TouchEvent pSceneTouchEvent) {
				return this.mChildScene.onSceneTouchEvent(pSceneTouchEvent);
			}*/

			reset: function() {
				this._super();

				this.clearChildScene();
			},

			
			setParent: function(entity) {
				//		super.setParent(pEntity);
			}

			// ===========================================================
			// Methods
			// ===========================================================
		/*
			public void postRunnable(final Runnable pRunnable) {
				this.mRunnableHandler.postRunnable(pRunnable);
			}

			public void registerTouchArea(final ITouchArea pTouchArea) {
				this.mTouchAreas.add(pTouchArea);
			}

			public boolean unregisterTouchArea(final ITouchArea pTouchArea) {
				return this.mTouchAreas.remove(pTouchArea);
			}

			public boolean unregisterTouchAreas(final ITouchAreaMatcher pTouchAreaMatcher) {
				return this.mTouchAreas.removeAll(pTouchAreaMatcher);
			}

			public void clearTouchAreas() {
				this.mTouchAreas.clear();
			}

			public ArrayList<ITouchArea> getTouchAreas() {
				return this.mTouchAreas;
			}

			
			public void back() {
				this.clearChildScene();

				if(this.mParentScene != null) {
					this.mParentScene.clearChildScene();
					this.mParentScene = null;
				}
			}*/


		});
		
		return Scene;
    }
);