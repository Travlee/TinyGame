TinyGame.Vector2 = function(x, y){
	this.x = x || 0;
	this.y = y || 0;
};
TinyGame.Vector2.prototype.zero = function(){
	this.x = 0;
	this.y = 0;
};
TinyGame.Vector2.prototype.set = function(x, y){
	if(typeof x === "object"){
		this.x = x.x;
		this.y = x.y;
	}
	else{
		this.x = x || 0;
		this.y = y || 0;		
	}
};
TinyGame.Vector2.prototype.setX = function(x){
	this.x = x || 0;		
};
TinyGame.Vector2.prototype.setY = function(y){
	this.y = y || 0;			
};
TinyGame.Vector2.prototype.invert = function(){
	this.x = this.x*-1;
	this.y = this.y*-1;
	return this;
};
TinyGame.Vector2.prototype.invertX = function(){
	this.x = this.x*-1;
	return this;
};
TinyGame.Vector2.prototype.invertY = function(){
	this.y = this.y*-1;
	return this;
};
TinyGame.Vector2.prototype.add = function(v){
	if(v instanceof TinyGame.Vector2){
		this.x += v.x;
		this.y += v.y;
	}else{
		this.x += v;
		this.y += v;
	}
	return this;
};
TinyGame.Vector2.prototype.substract = function(v){
	if(v instanceof TinyGame.Vector2){
		this.x -= v.x;
		this.y -= v.y;
	}else{
		this.x -= v;
		this.y -= v;
	}
	return this;
};
TinyGame.Vector2.prototype.multiply = function(v){
	if(v instanceof TinyGame.Vector2){
		this.x *= v.x;
		this.y *= v.y;
	}else{
		this.x *= v;
		this.y *= v;
	}
	return this;
};
TinyGame.Vector2.prototype.multiplyX = function(v){
	this.x *= v;
	return this;
};
TinyGame.Vector2.prototype.multiplyY = function(v){
	this.y *= v;
	return this;
};
TinyGame.Vector2.prototype.normalize = function(){
	var normal = new TinyGame.Vector2(this.x, this.y);
	var length = this.length();
	normal.x = normal.x/length;
	normal.y = normal.y/length;
	return normal;
};
TinyGame.Vector2.prototype.length = function(){
	var length = (this.x * this.x) + (this.y * this.y);
	return Math.sqrt(length);
};
TinyGame.Vector2.prototype.distance = function(v){
	var x, y;
	x = v.x - this.x;
	y = v.y - this.y;
	if(typeof sqrt === 'boolean' && sqrt === false){
		return x*x + y*y;
	}
	return Math.sqrt(x*x + y*y);
};
TinyGame.Vector2.prototype.qDistance = function(v){
	var x, y;
	x = v.x - this.x;
	y = v.y - this.y;
	return x*x + y*y;	
};