
//	TinyGame.World()
//		- Handles object physics, bounds checking, collisions and stuff yeah...
TinyGame.World = function(game){
	this._Game = game;
	this.Bounds = {LEFT:0, TOP:0, RIGHT:this._Game.Scene.Width, BOTTOM:this._Game.Scene.Height};
};
TinyGame.World.prototype._Update = function(){
	// Make updates frame-independent at some point idk when but yeah do it
	// call object's update method if exists

	// Apply gravity and velocity to objects, then update positions
	for(var i=0, len=this._Game.Objects._Objects.length; i<len; i++){
		var obj = this._Game.Objects._Objects[i];
		if(obj.Body.Velocity.X === 0 && obj.Body.Velocity.Y === 0 
			&& obj.Body.Gravity.X === 0 && obj.Body.Gravity.Y === 0) continue;

		//	Adds Gravity to Velocity vector
		obj.Body.Velocity.Add(obj.Body.Gravity);
		//	Update positions
		obj.Position.Add(obj.Body.Velocity);

		//	Bounds checking
		if(obj.Body.EnableBounds) this._BoundsCheck(obj);
	};	

	
	
};
//	idk about this yet
TinyGame.World.prototype._Physics = function(){
	
};
//	Bounds checking, obviously...
//		- ADD RADIUS CHECKS FOR CIRCLES AND JUNK
TinyGame.World.prototype._BoundsCheck = function(obj){	
	if(!obj.Body.EnableBounds) return;

	//	LEFT BOUNDS...
	if(obj.Position.X < this.Bounds.LEFT){
		obj.Position.X = this.Bounds.LEFT;
		obj.Body.Velocity.X = 0;
	}
	//	RIGHT BOUNDS...
	else if(obj.Position.X + obj.Width > this.Bounds.RIGHT){
		obj.Position.X = this.Bounds.RIGHT - obj.Width;
		obj.Body.Velocity.X = 0;
	}
	//	TOP BOUNDS...
	if(obj.Position.Y < this.Bounds.TOP){
		obj.Position.Y = this.Bounds.TOP;
		obj.Body.Velocity.Y = 0;
	}
	//	BOTTOM BOUNDS...
	else if(obj.Position.Y + obj.Height > this.Bounds.BOTTOM){
		obj.Position.Y = this.Bounds.BOTTOM - obj.Height;			
		obj.Body.Velocity.Y = 0;
	}
};