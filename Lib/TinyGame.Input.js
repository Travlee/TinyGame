TinyGame.Input = function(game){
	var self = this;
	this.Game = game;
	this.keysDown = [];

	this.Get = function(key){
		if(this.keysDown[key] != undefined)
		{
			return true;
		}
		return false
	};
	this.Remove = function(key){
		delete self.keysDown[key];
	};
	this.KeyDown = function(e){
		self.keysDown[e.keyCode] = true;
	};
	this.KeyUp = function(e){
		delete self.keysDown[e.keyCode];
	};
};