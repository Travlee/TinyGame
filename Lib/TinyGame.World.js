
//	TinyGame.World()
//		- Handles object physics, bounds checking, collisions and stuff yeah...
TinyGame.World = function(game){
	this._game = game;
	this.bounds = {left:0, top:0, right:this._game.scene.width, bottom:this._game.scene.height};
};
TinyGame.World.prototype._update = function(){
	// Make updates frame-independent at some point idk when but yeah do it
	// call object's update method if exists

	// Apply gravity and velocity to objects, then update positions
	for(var i=0, len=this._game.objects._objects.length; i<len; i++){
		var obj = this._game.objects._objects[i];
		if(obj.body.velocity.x === 0 && obj.body.velocity.y === 0 
			&& obj.body.gravity.x === 0 && obj.body.gravity.y === 0) continue;

		//	Adds Gravity to Velocity vector
		obj.body.velocity.add(obj.body.gravity);
		//	Update positions
		obj.position.add(obj.body.velocity);

		//	Bounds checking
		if(obj.body.enableBounds) this._boundsCheck(obj);
	};	

	
	
};
//	idk about this yet
TinyGame.World.prototype._physics = function(){};

//	Bounds checking, obviously...
//		- ADD RADIUS CHECKS FOR CIRCLES AND JUNK
TinyGame.World.prototype._boundsCheck = function(obj){	
	if(!obj.body.enableBounds) return;

	//	left BOUNDS...
	if(obj.position.x < this.bounds.left){
		obj.position.x = this.bounds.left;
		obj.body.velocity.x = 0;
	}
	//	right BOUNDS...
	else if(obj.position.x + obj.body.width > this.bounds.right){
		obj.position.x = this.bounds.right - obj.body.width;
		obj.body.velocity.x = 0;
	}
	//	top BOUNDS...
	if(obj.position.y < this.bounds.top){
		obj.position.y = this.bounds.top;
		obj.body.velocity.y = 0;
	}
	//	bottom BOUNDS...
	else if(obj.position.y + obj.body.height > this.bounds.bottom){
		obj.position.y = this.bounds.bottom - obj.body.height;			
		obj.body.velocity.y = 0;
	}
};