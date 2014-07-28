
//	TinyGame.World()
//		- Handles object physics, bounds checking, collisions and stuff yeah...
TinyGame.World = function(game){
	this._Game = game;
	this._Bounds = [this._Game.Scene.Width, this._Game.Scene.Height];
	this.EnableBounds = false;
};
TinyGame.World.prototype._Update = function(){

	this._Physics();
	if(this.EnableBounds) this._BoundsCheck();
	// call object's update method if exists
	
};
//	Update Object positions and Gravity and such...
TinyGame.World.prototype._Physics = function(){
	for(var i=0, len=this._Game.Objects._Objects.length; i<len; i++){
		var obj = this._Game.Objects._Objects[i];
		//	Adds Gravity to Velocity each update
		obj.Velocity.Add(obj.Gravity);

		// Probably not needed and stuff
		// if(obj.Velocity.X === 0 && obj.Velocity.Y === 0) continue;

		// Make updates frame-independent at some point idk when but yeah do it
		obj.Position.Add(obj.Velocity);
	};
};
//	Bounds checking, obviously...
//		- ADD RADIUS CHECKS FOR CIRCLES AND JUNK
TinyGame.World.prototype._BoundsCheck = function(){	

	for(var i=0, len=this._Game.Objects._Objects.length; i<len; i++){
		var obj = this._Game.Objects._Objects[i];
		if(obj.Velocity.X === 0 && obj.Velocity.Y === 0) continue;

		//	LEFT BOUNDS...
		if(obj.Position.X < 0){
			obj.Position.X = 0;
			obj.Velocity.X = 0;
		}
		//	RIGHT BOUNDS...
		else if(obj.Position.X + obj.Width > this._Bounds[0]){
			obj.Position.X = this._Bounds[0] - obj.Width;
			obj.Velocity.X = 0;
		}
		//	TOP BOUNDS...
		if(obj.Position.Y < 0){
			obj.Position.Y = 0;
			obj.Velocity.Y = 0;
		}
		//	BOTTOM BOUNDS...
		else if(obj.Position.Y + obj.Height > this._Bounds[1]){
			obj.Position.Y = this._Bounds[1] - obj.Height;			
			obj.Velocity.Y = 0;
		}
	};
};