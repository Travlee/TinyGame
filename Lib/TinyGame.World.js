
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
	this._MoveQueue = [];

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
	if (this.EnableBounds) this._BoundsCheck();
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

	    //	Adds Gravity to Velocity each update
		obj.Velocity.Add(obj.Gravity);

		// Probably not needed and stuff
		// if(obj.Velocity.X === 0 && obj.Velocity.Y === 0) continue;

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
			obj.Events.Bounds._Update('LEFT', true);
		} else {
			//	Bounds Event
			obj.Events.Bounds._Update('LEFT', false);
		}
		//	RIGHT BOUNDS...
		if(obj.Position.X + obj.Width > this.Width){
			obj.Position.X = this.Width - obj.Width;
			obj.Velocity.X = 0;

			// Bounds Event
			obj.Events.Bounds._Update('RIGHT', true);
		}
		else {
			//	Bounds Event
			obj.Events.Bounds._Update('RIGHT', false);
		}
		//	TOP BOUNDS...
		if(obj.Position.Y < 0){
			obj.Position.Y = 0;
			obj.Velocity.Y = 0;

			// Bounds Event
			obj.Events.Bounds._Update('TOP', true);
		}
		else{
			//	Bounds Event
			obj.Events.Bounds._Update('TOP', false);
		}
		//	BOTTOM BOUNDS...
		if(obj.Position.Y + obj.Height > this.Height){
			obj.Position.Y = this.Height - obj.Height;			
			obj.Velocity.Y = 0;

			// Bounds Event
			obj.Events.Bounds._Update('BOTTOM', true);
		}
		else{
			//	Bounds Event
			obj.Events.Bounds._Update('BOTTOM', false);
		}
	}
};