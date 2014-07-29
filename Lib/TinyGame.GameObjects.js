//	#TinyGame.GameObject()
//		-Base Object Class-ish
TinyGame.GameObject = function(x, y){
	this._Type = null;
	this.Position = new TinyGame.Vector2d(x || 0, y || 0);
	this.Velocity = new TinyGame.Vector2d(0, 0);
	this.Gravity = new TinyGame.Vector2d(0, 0);

	this.zIndex = 0;
};
TinyGame.GameObject.prototype._Draw = function(context){

};
TinyGame.GameObject.prototype._Update = function(){

};
TinyGame.GameObject.prototype.Distance = function(obj){
	return TinyGame.Math.Vectors.Distance(this, obj);
};

//	make this later!!!!
TinyGame.TextObject = function(x, y){
	// this.Position = new TinyGame.Vec2();
};


//	#TinyGame.ObjectFactory()
//		-Makes objects/stores in Game.Objects/TinyGame.ObjectsHandler()
TinyGame.ObjectFactory = function(game){
	this._Game = game;
	this._Types = {
		RECT: "RECT",
		SPRITE: "SPRITE"
	};
};
TinyGame.ObjectFactory.prototype.Rect = function(x, y, width, height, color){

	function Rect(x, y, width, height, color){
		TinyGame.GameObject.call(this, x, y);
		this._Type = "RECT";
		this.Width = width || 0;
		this.Height = height || 0;
		this.Color = color || "black";
	}
	Rect.prototype = Object.create(TinyGame.GameObject.prototype);
	Rect.prototype._Draw = function(context){
		context.fillStyle = this.Color;
		context.fillRect(this.Position.X, this.Position.Y, this.Width, this.Height);
	};

	var obj = new Rect(x, y, width, height, color);
	
	//	Adds object to game
	this._Game.Objects.Add(obj);

	return obj;
};

//	Sprite Object()
//		- Image title from cache
//		- X/Y position
//		Sprite Clip Object
//			- X:/Y: clip start
//			- Width:/Height: Frame
//		- Width/Height scale for the image
TinyGame.ObjectFactory.prototype.Sprite = function(image, x, y, width, height, clip){
	
	function Animation(img, animation, repeat){
		this._Image = img;
		this._StartX = animation.x;
		this._StartY = animation.y;
		this._FrameWidth = animation.width;
		this._FrameHeight = animation.height;
		this._Speed = animation.speed || 150;
		this._Repeat = (repeat === false)?false:true;
		this._CurrentFrame = 1;
		this._TotalFrames = animation.frames;
		this._LastFrameTime = 0;
	}
	Animation.prototype._Draw = function(context, x, y, width, height){
		var frameX, frameY;
		frameX = this._StartX + (this._FrameWidth * (this._CurrentFrame - 1));
		frameY = this._StartY;
		context.drawImage(this._Image, frameX, frameY, this._FrameWidth, this._FrameHeight, 
							x, y, width, height);
		if(game.Time.Current > this._LastFrameTime + this._Speed){
			this._LastFrameTime = game.Time.Current;

			if(this._CurrentFrame < this._TotalFrames){
				this._CurrentFrame++;
			}
			else{ 
				if(this._Repeat) this._CurrentFrame = 1;
			}
			
		}
	};
	function Sprite(img, x, y, width, height, clip){
		TinyGame.GameObject.call(this, x, y);
		this._Type = "SPRITE";
		this._Image = img || "";
		this.Width = width || 0;
		this.Height = height || 0;
		if(!clip && typeof clip !== 'object'){ this._StaticFrame = null;}
		else{
			this._StaticFrame = { X: clip.x, Y: clip.y, Width: clip.width, Height: clip.height};
		}
		// Animations
		this._Animations = [];
		this._Playing = false;
	}	
	Sprite.prototype = Object.create(TinyGame.GameObject.prototype);
	Sprite.prototype.Add = function(title, animation, repeat){
		this._Animations[title] = new Animation(this._Image, animation, repeat);
	};
	Sprite.prototype.Play = function(title){
		if(this._Animations[title]){
			this._Playing = title;
		}
	};
	Sprite.prototype.Stop = function(){
		this._Playing = false;
	};
	Sprite.prototype._Draw = function(context){
		if(!this._Playing){
			if(!this._StaticFrame){
				context.drawImage(this._Image, this.Position.X, this.Position.Y, this.Width, this.Height);
			}
			else{
				context.drawImage(this._Image, this._StaticFrame.X, this._StaticFrame.Y, this._StaticFrame.Width, this._StaticFrame.Height, this.Position.X, this.Position.Y, this.Width, this.Height);			
			}
		}
		else{
			this._Animations[this._Playing]._Draw(context, this.Position.X, this.Position.Y, this.Width, this.Height);
		}	
	};

	// Create Object
	var obj = new Sprite(this._Game._Cache._Images[image], x, y, width, height, clip);
	// Store it
	this._Game.Objects.Add(obj);
	// Return it
	return obj;
};
TinyGame.ObjectFactory.prototype.Text = function(x, y, text, size, color){
	function Text(x, y, text, size, color){
		TinyGame.GameObject.call(this, x, y);
		this.Text = text;
		this.Size = size || '20pt';
		this.Color = color || 'black';
		this.Font = "Verdana, Geneva, sans-serif";
	}
	Text.prototype = Object.create(TinyGame.GameObject.prototype);
	Text.prototype._Draw = function(context){
		context.font = this.Size + " " + this.Font;
		context.fillStyle = this.Color;
		context.fillText(this.Text, this.Position.X, this.Position.Y);
	};
	var obj = new Text(x, y, text, size, color);
	this._Game.Objects.Add(obj);
	return obj;
};
TinyGame.ObjectFactory.prototype.Image = function(){};
TinyGame.ObjectFactory.prototype.Circle = function(){};

//	#TinyGame.ObjectsHandler()
TinyGame.ObjectsHandler = function(){
	this._Objects = [];
	this._TextObjects = [];
};
TinyGame.ObjectsHandler.prototype.Add = function(obj){
	this._Objects.push(obj);
};
TinyGame.ObjectsHandler.prototype.Clear = function(){
	this._Objects = [];
};
TinyGame.ObjectsHandler.prototype.Count = function(){
	return this._Objects.length;
};