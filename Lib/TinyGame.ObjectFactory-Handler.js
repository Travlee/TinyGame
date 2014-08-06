//	#TinyGame.ObjectFactory()
//		-Makes objects/stores in Game.Objects=TinyGame.ObjectsHandler()
TinyGame.ObjectFactory = function(game){
	this._game = game;
};
TinyGame.ObjectFactory.prototype.rect = function(x, y, width, height, color){
	var obj = new TinyGame.Rect(this._game, x, y, width, height, color);
	this._game.objects._add(obj);
	return obj;
};
TinyGame.ObjectFactory.prototype.sprite = function(key, x, y, frame){
	var obj = new TinyGame.Sprite(this._game, key, x, y, frame);
	this._game.objects._add(obj);
	return obj;
};
TinyGame.ObjectFactory.prototype.text = function(x, y, text, size, color){
	var obj = new TinyGame.Text(this._game, x, y, text, size, color);
	this._game.text._add(obj);
	return obj;
};
TinyGame.ObjectFactory.prototype.tileSprite = function(){};
TinyGame.ObjectFactory.prototype.circle = function(){};

//	#TinyGame.ObjectsHandler()
//	
TinyGame.ObjectsHandler = function(){
	this._objects = [];
};
TinyGame.ObjectsHandler.prototype._add = function(obj){
	this._objects.push(obj);
};
TinyGame.ObjectsHandler.prototype.remove = function(obj){
	for(var i=0, len=this._objects.length; i<len; i++){
		if(this._objects[i] === obj){
			this._objects.splice(i, 1);
			return;
		}
	}		
};
TinyGame.ObjectsHandler.prototype.clear = function(){
	this._objects = [];
};
TinyGame.ObjectsHandler.prototype.count = function(){
	return this._objects.length;
};