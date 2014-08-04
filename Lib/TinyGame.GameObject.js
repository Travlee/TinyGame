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
TinyGame.GameObject.prototype.kill = function(){
	if(this._type === "TEXT"){
		this._game.text.remove(this);
	}
	else{
		this._game.objects.remove(this);
	}
};