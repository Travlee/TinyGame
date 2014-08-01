//	#TinyGame.GameObject()
//		-Base Object Class-ish
TinyGame.GameObject = function(x, y){
	this._Type = null;
	this.Position = new TinyGame.Vector2d(x || 0, y || 0);
	this.Body = new TinyGame.Body();

	// this.Anchor = new TinyGame.Vector2d(.5, .5); do later, too hard
	this.zIndex = 0;
};
TinyGame.GameObject.prototype._Draw = function(context){};
TinyGame.GameObject.prototype._Update = function(time){};
TinyGame.GameObject.prototype.Distance = function(obj){
	return TinyGame.Math.Vectors.Distance(this, obj);
};

//	#TinyGame.ObjectsHandler()
TinyGame.ObjectsHandler = function(){
	this._Objects = [];
};
TinyGame.ObjectsHandler.prototype._Add = function(obj){
	this._Objects.push(obj);
};
TinyGame.ObjectsHandler.prototype.Remove = function(obj){
	for(var i=0, len=this._Objects.length; i<len; i++){
		if(this._Objects[i] === obj){
			this._Objects.splice(i, 1);
			return;
		}
	}		
};
TinyGame.ObjectsHandler.prototype.Clear = function(){
	this._Objects = [];
};
TinyGame.ObjectsHandler.prototype.Count = function(){
	return this._Objects.length;
};