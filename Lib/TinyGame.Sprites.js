TinyGame.Animations = function(sprite){
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
TinyGame.Animations.prototype._update = function(time){
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
TinyGame.Animations.prototype.add = function(key, frames, frate, loop){
	//	add argument parsing at some point
	this._animations[key] = [frames, frate, loop];
};
TinyGame.Animations.prototype.play = function(key){
	if(!this._animations[key]) {
		console.error("Sprite.Animations.Play():", "Invalid Animation Key");
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
TinyGame.Animations.prototype.stop = function(){
	this._isPlaying = false;
};