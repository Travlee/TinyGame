
//	TinyGame.World()
//		- Handles object physics, bounds checking, collisions and stuff yeah...
TinyGame.World = function(game){
	this._game = game;
	this._objects = game.objects._objects;
	this.bounds = {left:0, top:0, right:this._game.scene.width, bottom:this._game.scene.height};
	this.width = this._game.scene.width || 0;
	this.height = this._game.scene.height || 0;
};
TinyGame.World.prototype._update = function(gameTime){
	// Make updates framerate-independent
	for(var i=0, len=this._objects.length; i<len; i++){
		var obj = this._objects[i];

		if(obj._update) obj._update(gameTime);
		if(obj.body.collideBounds) this._checkBounds(obj);
	}	
};
TinyGame.World.prototype._checkBounds = function(obj){	
	if(!obj.body.collideBounds) return;
	//	left BOUNDS...
	if(obj.position.x < this.bounds.left){
		obj.position.x = this.bounds.left;
		obj.body.velocity.invertX().multiplyX(obj.body.bounce.x);
	}
	//	right BOUNDS...
	else if(obj.position.x + obj.body.width > this.bounds.right){
		obj.position.x = this.bounds.right - obj.body.width;
		obj.body.velocity.invertX().multiplyX(obj.body.bounce.x);
	}
	//	top BOUNDS...
	if(obj.position.y < this.bounds.top){
		obj.position.y = this.bounds.top;
		obj.body.velocity.invertY().multiplyY(obj.body.bounce.y);
	}
	//	bottom BOUNDS...
	else if(obj.position.y + obj.body.height > this.bounds.bottom){
		obj.position.y = this.bounds.bottom - obj.body.height;			
		obj.body.velocity.invertY().multiplyY(obj.body.bounce.y);
	}	
};