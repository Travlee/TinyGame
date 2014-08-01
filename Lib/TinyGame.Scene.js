//	TinyGame.Scene()
//		- Handles Drawing everything and stuff yeah
TinyGame.Scene = function(game, width, height, parent_id, bg_color){
	this._Game = game;
	
	this.Canvas = null;
	this.Context = null;

	this.Width = width;
	this.Height = height;
	this.Parent = parent_id;
	this.bgColor = bg_color || 'white';
};
TinyGame.Scene.prototype._Boot = function(){
	this.Canvas = TinyGame.Canvas(this.Width, this.Height, this.Parent);
	this.Context = this.Canvas.getContext('2d');
};
TinyGame.Scene.prototype._Update = function(){
	//	Clears Scene, DUH READ IT
	this._ClearScene();

	// Merges GameObjects and TextObjects
	var objects = this._Game.Objects._Objects.concat(this._Game.Text._Objects);
	
	//	Sorts objects based on zIndex, higher last
	objects.sort(function(a, b){return a.zIndex - b.zIndex;});

	//	Draw objects
	for(var i=0, len=objects.length; i<len; i++){
		var obj = objects[i];
		
		//	Check if object is off-canvas before drawing..
		//	finish this later
		//	also needs radius checks
		if(obj.Position.X + obj.Width > this.Width || obj.Position.X < 0){ };

		//	Add Transforms for anchors later
		obj._Draw(this.Context, this._Game.Time.Current);
	};
};
TinyGame.Scene.prototype._ClearScene = function(){
	this.Context.fillStyle = this.bgColor;
	this.Context.fillRect(0, 0, this.Width, this.Height);
};

// Add private method for sorting objects based on z_index for layering also sometime