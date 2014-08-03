//	#TinyGame.GameObject()
//		-Base Object Class-ish
TinyGame.GameObject = function(x, y){
	this._type = null;
	this.position = new TinyGame.Vector2d(x || 0, y || 0);
	this.body = new TinyGame.Body();

	// this.Anchor = new TinyGame.Vector2d(.5, .5); do later, too hard
	this.zIndex = 0;
};
TinyGame.GameObject.prototype._draw = function(context){};
TinyGame.GameObject.prototype._update = function(time){};
TinyGame.GameObject.prototype.distance = function(obj){
	return TinyGame.Math.Vectors.Distance(this, obj);
};

//	#TinyGame.ObjectsHandler()
TinyGame.ObjectsHandler = function(){
	this._objects = [];
};
TinyGame.ObjectsHandler.prototype._add = function(obj){
	this._objects.push(obj);
};
TinyGame.ObjectsHandler.prototype.remove = function(obj){
	for(var i=0, len=this._objects.length; i<len; i++){
		if(this._objects[i] === obj){
			this._objects.splice(i, 1);
			return;
		}
	}		
};
TinyGame.ObjectsHandler.prototype.clear = function(){
	this._objects = [];
};
TinyGame.ObjectsHandler.prototype.count = function(){
	return this._objects.length;
};