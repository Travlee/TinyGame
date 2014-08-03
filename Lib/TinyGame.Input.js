
//	OLD - must rework sometime, maybe
TinyGame.Input = function(game){
	this._game = game;
	this._keys = {
		Backspace:8,
		Enter:13,
		Space:32,
		LeftArrow:37,
		UpArrow:38,
		RightArrow:39,
		DownArrow:40,
		A:65,
		D:68,
		S:83,
		W:87
	};

	this.enableKeys = false;
	this.enableMouse = false;
};
TinyGame.Input.prototype.add = function(key, callback){
	// document.addEventListener(key, );
};
TinyGame.Input.prototype._update = function(){

};
TinyGame.Input.prototype._keyDown = function(){};
TinyGame.Input.prototype._keyUp = function(){};
TinyGame.Input.prototype._mouseDown = function(){};