
// #TinyGame.Time()
TinyGame.Time = function(){

	//	DONT LOOK AT ME DAMNIT, IM NAKED:
	this._startTime = new Date().getTime();
	this._last = 0;
	this._lastCheck = 0;

	//	Public:
	this.current = 0;
	this.delta = 0;
	this.seconds = 0;
	this.fps = 0;
};
TinyGame.Time.prototype._update = function(time){
	this.current = time;
	this.delta = time - this._last || 0;
	this.seconds = Math.floor(time / 1000);
	this._fps(time);
	this._last = time;
};
TinyGame.Time.prototype._fps = function(time){
	if((time - this._lastCheck) > 200){
		this.fps = Math.floor(1000/this.delta);
		this._lastCheck = time;
	}
};