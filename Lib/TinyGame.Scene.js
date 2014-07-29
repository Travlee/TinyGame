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

	//	Draw objects
	for(var i=0, len=this._Game.Objects._Objects.length; i<len; i++){
		//	Check if object is off-canvas before drawing..
		// if(){ };

		this._Game.Objects._Objects[i]._Draw(this.Context, this._Game.Time.Current);
	};	
};
TinyGame.Scene.prototype._ClearScene = function(){
	this.Context.fillStyle = this.bgColor;
	this.Context.fillRect(0, 0, this.Width, this.Height);
};

// Add private method for sorting objects based on z_index for layering also sometime