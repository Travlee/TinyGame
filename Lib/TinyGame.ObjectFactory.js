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
	this._Game.Objects._Add(obj);

	return obj;
};
TinyGame.ObjectFactory.prototype.Sprite = function(image, x, y, width, height, clip){
	
	function Animation(animation){
		this._StartX = animation.x;
		this._StartY = animation.y;
		this._FrameWidth = animation.width;
		this._FrameHeight = animation.height;
		this._Speed = animation.speed || 150;
		this._Frames = animation.frames;
		this._Repeat = animation.repeat;
		//	add code for vertical/horizontal sheets
		// this._RowFrames = true;	
		if(typeof animation.repeat === "boolean") this._Repeat = animation.repeat;
		else this._Repeat = true;
	}
	function Sprite(img, x, y, width, height, sprite){
		TinyGame.GameObject.call(this, x, y);
		this._Type = "SPRITE";
		this._Image = img || "";
		this.Width = width || 0;
		this.Height = height || 0;
		
		// Animations
		this._Animations = [];

		this.Active = {
			Stopped:false,
			Animation:null,
			X:0,
			Y:0,
			StartX:0,
			StartY:0,
			Width:0,
			Height:0,
			Frames:0,
			Repeat:0,
			Speed:0,
			_CurrentFrame:0,
			_LastFrameTime:0
		};

		if(sprite && typeof sprite === 'object'){ 
			this.Add("Default", sprite);
		}
		else{
			this.Add("Default", {x:0, y:0, width:this.Width, height:this.Height, frames:1, repeat:false});
		}
		this.Play("Default");
	}	
	Sprite.prototype = Object.create(TinyGame.GameObject.prototype);
	Sprite.prototype.Add = function(title, animation){
		this._Animations[title] = new Animation(animation);
	};
	Sprite.prototype.Play = function(title){
		if(this._Animations[title] && this.Active.Animation !== title){
			this.Active.Stopped = false;
			this.Active.Animation = title;
			this.Active._CurrentFrame = 1;
			this.Active._LastFrameTime = 0;

			var animation = this._Animations[title];
			this.Active.X = animation._StartX;
			this.Active.Y = animation._StartY;
			this.Active.StartX = animation._StartX;
			this.Active.StartY = animation._StartY;
			this.Active.Width = animation._FrameWidth;
			this.Active.Height = animation._FrameHeight;
			this.Active.Frames = animation._Frames;
			this.Active.Repeat = animation._Repeat;
			this.Active.Speed = animation._Speed;
		}
	};
	Sprite.prototype.Stop = function(){
		this.Active.Stopped = true;
	};
	Sprite.prototype._Draw = function(context, time){
		if(!this.Active.Stopped && this.Active.Frames !== 1){
			if(this.Active._LastFrameTime === 0) this.Active._LastFrameTime = time;
			if(time > this.Active._LastFrameTime + this.Active.Speed){
				this.Active._LastFrameTime = time;

				if(this.Active._CurrentFrame < this.Active.Frames){					
					this.Active.X += this.Active.Width;
					this.Active._CurrentFrame++;
				}
				else{
					if(this.Active.Repeat) {
						this.Active._CurrentFrame = 1;
						this.Active.X = this.Active.StartX;
					}
					else{
						this.Stop();
					}					
				}
			}
		}
		context.drawImage(this._Image, this.Active.X, this.Active.Y, this.Active.Width, this.Active.Height, this.Position.X, this.Position.Y, this.Width, this.Height);
	};

	// Create Object
	var obj = new Sprite(this._Game._Cache._Images[image], x, y, width, height, clip);
	// Store it
	this._Game.Objects._Add(obj);
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
	this._Game.Text._Add(obj);
	return obj;
};
TinyGame.ObjectFactory.prototype.Image = function(){};
TinyGame.ObjectFactory.prototype.Circle = function(){};