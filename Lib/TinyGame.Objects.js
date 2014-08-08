//	#TinyGame.GameObject()
//		-Base Object Class-ish
TinyGame.GameObject = function(x, y){
	this._type = null;
	this.position = new TinyGame.Vector2(x || 0, y || 0);
	this.body = new TinyGame.Body();

	// this.Anchor = new TinyGame.Vector2(.5, .5); do later, too hard
	this.layer = 0;
};
TinyGame.GameObject.prototype._draw = function(context) {};
TinyGame.GameObject.prototype._update = function(time) {};
TinyGame.GameObject.prototype.update = function(time){};
TinyGame.GameObject.prototype.distance = function(obj) {
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

//	TinyGame.Body()
//
TinyGame.Body = function(){
	this.velocity = new TinyGame.Vector2();
	this.width = 0;
	this.height = 0;
	this.radius = 0;

	//	physics
	this.collideBounds = false;
	this.gravity = new TinyGame.Vector2();	
	this.bounce = new TinyGame.Vector2();
};

//	TinyGame.AnimationManager()
//
TinyGame.AnimationManager = function(sprite){
	this._sprite = sprite;
	this._animations = [];
	this._isPlaying = false;

	this._key = null;
	this._frames = null;
	this._rate = null;
	this._loop = false;
	this._lastTime = 0;
	this._currentFrame = 0;
};
TinyGame.AnimationManager.prototype._update = function(time){
	if(this._lastTime === 0) this._lastTime = time;

	if(time > this._lastTime + (1000/this._rate)){
		this._lastTime = time;
		if(this._currentFrame < this._frames.length - 1){
			this._currentFrame++;
		}
		else{
			if(this._loop) this._currentFrame = 0;
			else this.stop();
		}
	}
	this._sprite.frame = this._frames[this._currentFrame];
};
TinyGame.AnimationManager.prototype.add = function(key, frames, frate, loop){
	//	add argument parsing at some point
	this._animations[key] = [frames, frate, loop];
};
TinyGame.AnimationManager.prototype.play = function(key){
	if(!this._animations[key]) {
		console.error("Sprite.AnimationManager.Play():", "Invalid Animation Key");
		return;
	}
	else if(key === this._key) return;
	this._isPlaying = true;
	var animation = this._animations[key];
	this._key = key;
	this._frames = animation[0];
	this._rate = animation[1];
	this._loop = animation[2];
	this._lastTime = 0;
	this._currentFrame = 0;
};
TinyGame.AnimationManager.prototype.stop = function(){
	this._isPlaying = false;
};

//	TinyGame.Sprite()
//	
TinyGame.Sprite = function(game, key, x, y, frame){
	TinyGame.GameObject.call(this, x, y);
	this._game = game;
	this._type = TinyGame.TYPES.SPRITE;

	var ss = this._game._cache._assets[key];
	if(ss instanceof TinyGame.SpriteSheet){
		this.animations = new TinyGame.AnimationManager(this);
		this._image = ss.image;
		this._frames = ss.frames;
		this._currentFrame = null;
		this.frame = frame || 0;
		this.body.width = ss.fWidth;
		this.body.height = ss.fHeight;
	}
	else{
		this._image = ss;
		this._frames = null;
		this._currentFrame = null;
		this.body.width = ss.width;
		this.body.height = ss.height;
	}
};
TinyGame.Sprite.prototype = Object.create(TinyGame.GameObject.prototype);
TinyGame.Sprite.prototype._update = function(time){
	if(!this._frames) return;
	if(this.animations._isPlaying){
		this.animations._update(time);
	}
	this._currentFrame = this._frames[this.frame];
};
TinyGame.Sprite.prototype._draw = function(context, time){
	if(this._frames){
		context.drawImage(this._image, this._currentFrame.x, this._currentFrame.y, this.body.width, this.body.height, this.position.x, this.position.y, this.body.width, this.body.height);
	}
	else{
		context.drawImage(this._image, this.position.x, this.position.y, this.body.width, this.body.height);
	}
};
TinyGame.Sprite.prototype.autoScroll = function(axis, speed){

};

// TinyGame.Line()
//	-do later
TinyGame.Line = function(){};
TinyGame.Line.prototype = Object.create(TinyGame.GameObject.prototype);
TinyGame.Line.prototype._draw = function(context){};

//	TinyGame.Text()
//
TinyGame.Text = function(game, x, y, text, size, color){
	TinyGame.GameObject.call(this, x, y);
	this._game = game;
	this._type = "TEXT";
	this.text = text;
	this.size = size || '20pt';
	this.color = color || 'black';
	this.font = "Verdana, Geneva, sans-serif";
};
TinyGame.Text.prototype = Object.create(TinyGame.GameObject.prototype);
TinyGame.Text.prototype._draw = function(context){
	context.font = this.size + " " + this.font;
	context.fillStyle = this.color;
	context.fillText(this.text, this.position.x, this.position.y);
};

//	TinyGame.Rect()
//
TinyGame.Rect = function(game, x, y, width, height, color){
	TinyGame.GameObject.call(this, x, y);
	this._game = game;
	this._type = "RECT";
	this.width = width || 0;
	this.height = height || 0;
	this.color = color || "black";
}
TinyGame.Rect.prototype = Object.create(TinyGame.GameObject.prototype);
TinyGame.Rect.prototype._draw = function(context){
	context.fillStyle = this.color;
	context.fillRect(this.position.x, this.position.y, this.width, this.height);
};