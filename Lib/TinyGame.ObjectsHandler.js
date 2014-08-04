//	#TinyGame.ObjectsHandler()
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