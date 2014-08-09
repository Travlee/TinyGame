//	TinyGame.Physics()
//
TinyGame.Physics = function(game){
	this._game = game || null;
	this._objects = game.objects._objects;
	this._collisionObjects = [];
	this._overlapObjects = [];
};
TinyGame.Physics.prototype._checkCollisions = function(){
	for(var i=0, len=this._collisionObjects.length; i<len; i++){
		var objectOne = this._collisionObjects[i][0];
		var objectTwo = this._collisionObjects[i][1];
		var callback = this._collisionObjects[i][2];

		//	AABB vs AABB
		if(objectOne._type !== TinyGame.types.circle && objectOne._type !== TinyGame.types.circle){
			
		}
		
	}
};
TinyGame.Physics.prototype._checkOverlaps = function(){
	for(var i=0, len=this._overlapObjects.length; i<len; i++){
		var objectOne = this._overlapObjects[i][0];
		var objectTwo = this._overlapObjects[i][1];
		var callback = this._overlapObjects[i][2];

		//	AABB vs AABB
		if(objectOne._type !== TinyGame.types.circle && objectOne._type !== TinyGame.types.circle){
			if(objectOne.position.x + objectOne.body.width >= objectTwo.position.x && objectOne.position.x <= objectTwo.position.x + objectTwo.body.width){
				if(objectOne.position.y + objectOne.body.height >= objectTwo.position.y && objectOne.position.y <= objectTwo.position.y + objectTwo.body.height){
					callback(objectOne, objectTwo);
					return;			
				}
			}
		}
		//	AABB vs Circle
		else if(objectOne._type === TinyGame.types.circle || objectTwo._type === TinyGame.types.circle){
			// do later
		}
	}
};
TinyGame.Physics.prototype._update = function(gameTime){
	// Apply gravity and velocity to objects, then update positions
	for(var i=0, len=this._objects.length; i<len; i++){
		var obj = this._objects[i];
		if(obj.body.velocity.x === 0 && obj.body.velocity.y === 0 
			&& obj.body.gravity.x === 0 && obj.body.gravity.y === 0) continue;

		//	Adds Gravity to Velocity
		obj.body.velocity.add(obj.body.gravity);
		//	Adds Velocity to Position
		obj.position.add(obj.body.velocity);
	};

	if(this._overlapObjects.length !== 0) this._checkOverlaps();
	if(this._collisionObjects.length !== 0) this._checkCollisions();
};
TinyGame.Physics.prototype._addCollide = function(obj_one, obj_two, callback){
	this._collisionObjects.push([obj_one, obj_two, callback]);
};
TinyGame.Physics.prototype._addOverlap = function(obj_one, obj_two, callback){
	this._overlapObjects.push([obj_one, obj_two, callback]);
};

//	TinyGame.Body()
//
TinyGame.Body = function(self){
	this._self = self;
	this._game = self._game;

	this.velocity = new TinyGame.Vector2();
	this.width = 0;
	this.height = 0;
	this.radius = 0;

	//	physics
	this.collideBounds = false;
	this.gravity = new TinyGame.Vector2();	
	this.bounce = new TinyGame.Vector2();
};
TinyGame.Body.prototype.overlap = function(obj, callback){
	this._game.physics._addOverlap(this._self, obj, callback);
};
TinyGame.Body.prototype.collide = function(obj, callback){
	this._game.physics._addCollision(this._self, obj, callback);
};

//	TinyGame.QuadTree()
//
TinyGame.QuadTree = function(){};