
// #TinyGame.Time()
TinyGame.Time = function(){

	//	DONT LOOK AT ME DAMNIT, IM NAKED
	this._StartTime = new Date().getTime();
	this._Last = 0;
	this._LastCheck = 0;

	//	Public Members
	this.Delta = 0;
	this.Seconds = 0;
	this.FPS = 0;
};
TinyGame.Time.prototype._Update = function(time){
	this.Delta = time - this._Last || 0;
	this.Seconds = Math.floor(time / 1000);
	this._FPS(time);
	this._Last = time;
};
TinyGame.Time.prototype._FPS = function(time){
	if((time - this._LastCheck) > 200){
		this.FPS = Math.floor(1000/this.Delta);
		this._LastCheck = time;
	}
};