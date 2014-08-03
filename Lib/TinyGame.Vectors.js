TinyGame.Vector2d = function(x, y){
	this.x = x || 0;
	this.y = y || 0;
};
TinyGame.Vector2d.prototype.add = function(v){
	if(v instanceof TinyGame.Vector2d){
		this.x += v.x;
		this.y += v.y;
	}else{
		this.x += v;
		this.y += v;
	}
	return this;
};
TinyGame.Vector2d.prototype.substract = function(v){
	if(v instanceof TinyGame.Vector2d){
		this.x -= v.x;
		this.y -= v.y;
	}else{
		this.x -= v;
		this.y -= v;
	}
	return this;
};
TinyGame.Vector2d.prototype.multiply = function(v){
	if(v instanceof TinyGame.Vector2d){
		this.x *= v.x;
		this.y *= v.y;
	}else{
		this.x *= v;
		this.y *= v;
	}
	return this;
};
TinyGame.Vector2d.prototype.normalize = function(){
	var normal = new TinyGame.Vector2d(this.x, this.y);
	var length = this.length();
	normal.x = normal.x/length;
	normal.y = normal.y/length;
	return normal;
};
TinyGame.Vector2d.prototype.length = function(){
	var length = (this.x * this.x) + (this.y * this.y);
	return Math.sqrt(length);
};