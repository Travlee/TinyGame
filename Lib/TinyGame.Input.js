
//	OLD - must rework sometime, maybe
TinyGame.Input = function(game){
	this._Game = game;
	this._Keys = {
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

	this.EnableKeys = false;
	this.EnableMouse = false;



};
TinyGame.Input.prototype.Add = function(key, callback){
	// document.addEventListener(key, );
};
TinyGame.Input.prototype._Update = function(){

};
TinyGame.Input.prototype._KeyDown = function(){};
TinyGame.Input.prototype._KeyUp = function(){};
TinyGame.Input.prototype._MouseDown = function(){};