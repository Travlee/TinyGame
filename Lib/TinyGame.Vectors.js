TinyGame.Vector2d = function(x, y){
	this.X = x || 0;
	this.Y = y || 0;
};
/**
 * [Set description]
 * @param {[type]} x [description]
 * @param {[type]} y [description]
 */
TinyGame.Vector2d.prototype.Set = function (x, y) {
    if (x instanceof TinyGame.Vector2d) {
        this.X = x.X;
        this.Y = x.Y;
    } else {
        this.X = x;
        this.Y = y;
    }
    return this;
};
//  Probably retarded, but idk.
TinyGame.Vector2d.prototype.Get = function () {
    return this;
};
TinyGame.Vector2d.prototype.Add = function(v){
	if(v instanceof TinyGame.Vector2d){
		this.X += v.X;
		this.Y += v.Y;
	}else{
		this.X += v;
		this.Y += v;
	}
	return this;
};
TinyGame.Vector2d.prototype.Substract = function(v){
	if(v instanceof TinyGame.Vector2d){
		this.X -= v.X;
		this.Y -= v.Y;
	}else{
		this.X -= v;
		this.Y -= v;
	}
	return this;
};
TinyGame.Vector2d.prototype.Multiply = function(v){
	if(v instanceof TinyGame.Vector2d){
		this.X *= v.X;
		this.Y *= v.Y;
	}else{
		this.X *= v;
		this.Y *= v;
	}
	return this;
};
TinyGame.Vector2d.prototype.Normal = function(){
	var normal = new TinyGame.Vector2d(this.X, this.Y);
	var length = this.Length();
	normal.X = normal.X/length;
	normal.Y = normal.Y/length;
	return normal;
};
TinyGame.Vector2d.prototype.Length = function(){
	var length = (this.X * this.X) + (this.Y * this.Y);
	return Math.sqrt(length);
};
TinyGame.Vector2d.prototype.Zero = function () {
    this.X = 0;
    this.Y = 0;
}