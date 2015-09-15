
//	TinyGame.World()
//		- Notes: Handles object physics, bounds checking, collisions and stuff yeah...
TinyGame.World = function(game){
	this._Game = game;
	// this.Bounds = {};
	this.Width = this._Game.Scene.Width;
	this.Height = this._Game.Scene.Height;
	this.Collisions = new TinyGame.Collisions(game);
	this.EnableBounds = false;

    // MoveTo Object Queue - [Inactive]
	// this._MoveQueue = []; remove

};
//  TinyGame.World._Update() <Private>
//      - Caller: TinyGame.Game._Run(), main game loop
//      - Args: None
//      - Returns: Not shit
//      - Notes: One day, reduce the number of loops to one main loop in World._Update()
TinyGame.World.prototype._Update = function(){

    this._Physics();

    //  Make an object loop here, then call each method to act on a single object. 
    //  performance things
	if(this.EnableBounds) this._BoundsCheck();
	this.Collisions._Update();

};

//	TinyGame.World._Physics() <Private>
//      - Caller: TinyGame.World._Update()
//      - Notes: Applies velocity and updates objects in world.
TinyGame.World.prototype._Physics = function(){
	for(var i=0, len=this._Game.Objects._Objects.length; i<len; i++){
	    var obj = this._Game.Objects._Objects[i];

    	//  Call each Object's _Update method
        obj._Update(this._Game);

		// Skips Objects with no Velocity or Acceleration
		if(obj.Velocity.isZero() && obj.Acceleration.isZero() && obj.Gravity.isZero()) continue;


	    //	If Speed & Accerlation props aren't 0
	    //	Remove Speed as a requirement for Acceleration Work
		if(!obj.Speed.isZero() && !obj.Acceleration.isZero()){


			//	If Accleration.X is Positive
			if(obj.Acceleration.X >= 0){
				if(obj.Velocity.X + obj.Acceleration.X < obj.Speed.X){
					obj.Velocity.X += obj.Acceleration.X;
				}
				else{
					obj.Velocity.X = obj.Speed.X;
				}
			}
			else {
				if(obj.Velocity.X - obj.Acceleration.X <= -obj.Speed.X){
					obj.Velocity.X += obj.Acceleration.X;
				}
				else {
					obj.Velocity.X = -obj.Speed.X;
				}
			}

			// If Acceleration.Y is Positive
			if(obj.Acceleration.Y >= 0){
				if(obj.Velocity.Y + obj.Acceleration.Y < obj.Speed.Y){
					obj.Velocity.Y += obj.Acceleration.Y;
				}
				else{
					obj.Velocity.Y = obj.Speed.Y;
				}
			}
			else {
				if(obj.Velocity.Y - obj.Acceleration.Y >= -obj.Speed.Y){
					obj.Velocity.Y += obj.Acceleration.Y;
					// console.log('hi');
				}
				else {
					obj.Velocity.Y = -obj.Speed.Y;
				}
			}
			
		}

		//	Add Gravity to Velocity 
		obj.Velocity.Add(obj.Gravity);

		// Make updates frame-independent at some point idk when but yeah do it
		obj.Position.Add(obj.Velocity);
	}
};
//	Bounds checking, obviously...
//		- ADD RADIUS CHECKS FOR CIRCLES AND JUNK
//      - Notes: Remove the loop from this method, have the bounds check on single objects when called,
//                  so to save on some level of performance when dealing with large arrays of objects
TinyGame.World.prototype._BoundsCheck = function(){
	for(var i=0, len=this._Game.Objects._Objects.length; i<len; i++){
		var obj = this._Game.Objects._Objects[i];
		if(obj.Velocity.X === 0 && obj.Velocity.Y === 0) continue;

		//	LEFT BOUNDS...
		if(obj.Position.X < 0){
			obj.Position.X = 0;
			obj.Velocity.X = 0;

			//	Bounds Event
			if(!obj.Events.Bounds.Left) this._Game.Events.Bounds._Trigger(obj, TinyGame.TYPES.BOUNDS.LEFT, true);
		} 
		else if(obj.Events.Bounds.Left){
			this._Game.Events.Bounds._Trigger(obj, TinyGame.TYPES.BOUNDS.LEFT, false);				
		}

		//	RIGHT BOUNDS...
		if(obj.Position.X + obj.Width > this.Width){
			obj.Position.X = this.Width - obj.Width;
			obj.Velocity.X = 0;

			// Bounds Event
			if(!obj.Events.Bounds.Right) this._Game.Events.Bounds._Trigger(obj, TinyGame.TYPES.BOUNDS.RIGHT, true);
		}
		else if(obj.Events.Bounds.Right){
			this._Game.Events.Bounds._Trigger(obj, TinyGame.TYPES.BOUNDS.RIGHT, false);
		}

		//	TOP BOUNDS...
		if(obj.Position.Y < 0){
			obj.Position.Y = 0;
			obj.Velocity.Y = 0;

			// Bounds Event
			if(!obj.Events.Bounds.Top) this._Game.Events.Bounds._Trigger(obj, TinyGame.TYPES.BOUNDS.TOP, true);
		}
		else if(obj.Events.Bounds.Top){
			this._Game.Events.Bounds._Trigger(obj, TinyGame.TYPES.BOUNDS.TOP, false);
		}

		//	BOTTOM BOUNDS...
		if(obj.Position.Y + obj.Height > this.Height){
			obj.Position.Y = this.Height - obj.Height;			
			obj.Velocity.Y = 0;

			// Bounds Event
			if(!obj.Events.Bounds.Bottom) this._Game.Events.Bounds._Trigger(obj, TinyGame.TYPES.BOUNDS.BOTTOM, true);
		}
		else if(obj.Events.Bounds.Bottom){
			this._Game.Events.Bounds._Trigger(obj, TinyGame.TYPES.BOUNDS.BOTTOM, false);
		}

		//	NONE Bounds
		if(!obj.Events.Bounds.Left && !obj.Events.Bounds.Right &&
			!obj.Events.Bounds.Top && !obj.Events.Bounds.Bottom){
			if(!obj.Events.Bounds.None) this._Game.Events.Bounds._Trigger(obj, TinyGame.TYPES.BOUNDS.NONE, true);
		}
		else if(obj.Events.Bounds.None){
			this._Game.Events.Bounds._Trigger(obj, TinyGame.TYPES.BOUNDS.NONE, false);
		}
	}
};