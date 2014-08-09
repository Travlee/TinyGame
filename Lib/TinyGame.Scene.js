//	TinyGame.Scene()
//		- Handles Drawing everything and stuff yeah
TinyGame.Scene = function(game, width, height, parent_id, bg_color){
	this._game = game;
	
	this.canvas = null;
	this.context = null;

	this.width = width;
	this.height = height;
	this.parent = parent_id;
	this.bgColor = bg_color || 'white';
};
TinyGame.Scene.prototype._boot = function(){
	this.canvas = TinyGame.Canvas(this.width, this.height, this.parent);
	this.context = this.canvas.getContext('2d');
};
TinyGame.Scene.prototype._update = function(){
	//	Clears Scene, DUH READ IT
	this._clearScene();

	var objects = this._game.objects._objects;
	
	//	Sorts objects based on zIndex, higher last
	objects.sort(function(a, b){return a.layer - b.layer;});

	//	Draw objects
	for(var i=0, len=objects.length; i<len; i++){
		var obj = objects[i];
		
		//	Check if object is off-canvas before drawing..
		//	finish this later
		//	also needs radius checks
		if(obj.position.x + obj.width > this.width || obj.position.x < 0){ };

		//	Add Transforms for anchors later
		obj._draw(this.context);
	};
};
TinyGame.Scene.prototype._clearScene = function(){
	this.context.fillStyle = this.bgColor;
	this.context.fillRect(0, 0, this.width, this.height);
};

// Add private method for sorting objects based on z_index for layering also sometime