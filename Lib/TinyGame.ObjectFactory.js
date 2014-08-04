//	#TinyGame.ObjectFactory()
//		-Makes objects/stores in Game.Objects/TinyGame.ObjectsHandler()
TinyGame.ObjectFactory = function(game){
	this._game = game;
	this._types = {
		RECT: "RECT",
		SPRITE: "SPRITE"
	};
};
TinyGame.ObjectFactory.prototype.rect = function(x, y, width, height, color){

	function Rect(x, y, width, height, color){
		TinyGame.GameObject.call(this, this._game, x, y);
		this._type = "RECT";
		this.width = width || 0;
		this.height = height || 0;
		this.color = color || "black";
	}
	Rect.prototype = Object.create(TinyGame.GameObject.prototype);
	Rect.prototype._draw = function(context){
		context.fillStyle = this.color;
		context.fillRect(this.position.x, this.position.y, this.width, this.height);
	};

	var obj = new Rect(x, y, width, height, color);
	
	//	Adds object to game
	this._game.objects._add(obj);

	return obj;
};
TinyGame.ObjectFactory.prototype.sprite = function(key, x, y, frame){
	
	function Sprite(game, image, x, y, frame){
		TinyGame.GameObject.call(this, x, y);
		this._game = game;
		this._type = "SPRITE";
		this._img = image.image || image;
		this.width = image.width;
		this.height = image.height;
		this.animations = new Animations(this);
		
		this.frame = frame || 0;
		this._frames = [];
		this._currentFrame = null;
		for(var i=0, frame=0, yLen=this._img.height/this.height; i<yLen; i++){
			for(var ii=0, x=0, y=0, xLen=this._img.width/this.width; ii<xLen; ii++, frame++){
				x = ii*this.width;
				y = i*this.height;
				this._frames[frame] = [x, y];
			}
		}	
	}	
	Sprite.prototype = Object.create(TinyGame.GameObject.prototype);
	Sprite.prototype._update = function(time){
		if(this.animations._isPlaying){
			this.animations._update(time);
		}
		this._currentFrame = this._frames[this.frame];
	};
	Sprite.prototype._draw = function(context, time){
		context.drawImage(this._img, this._currentFrame[0], this._currentFrame[1], this.width, this.height, this.position.x, this.position.y, this.width, this.height);
	};
	function Animations(sprite){
		this._sprite = sprite;
		this._animations = [];
		this._isPlaying = false;

		this._key = null;
		this._frames = null;
		this._rate = null;
		this._loop = false;
		this._lastTime = 0;
		this._currentFrame = 0;
	};
	Animations.prototype._update = function(time){
		if(this._lastTime === 0) this._lastTime = time;

		if(time > this._lastTime + (1000/this._rate)){
			this._lastTime = time;
			if(this._currentFrame < this._frames.length - 1){
				this._currentFrame++;
			}
			else{
				if(this._loop) this._currentFrame = 0;
				else this.stop();
			}
		}
		this._sprite.frame = this._frames[this._currentFrame];
	};
	Animations.prototype.add = function(key, frames, frate, loop){
		//	add argument parsing at some point
		this._animations[key] = [frames, frate, loop];
	};
	Animations.prototype.play = function(key){
		if(!this._animations[key]) {
			console.error("Sprite.Animations.Play():", "Invalid Animation Key");
			return;
		}
		else if(key === this._key) return;
		this._isPlaying = true;
		var animation = this._animations[key];
		this._key = key;
		this._frames = animation[0];
		this._rate = animation[1];
		this._loop = animation[2];
		this._lastTime = 0;
		this._currentFrame = 0;
	};
	Animations.prototype.stop = function(){
		this._isPlaying = false;
	};


	if(this._game._cache._spriteSheets[key]){
		var image = this._game._cache._spriteSheets[key];
	}
	else{
		var image = this._game._cache._images[key];
	}
	var obj = new Sprite(this._game, image, x, y, frame);
	this._game.objects._add(obj);
	return obj;
};
TinyGame.ObjectFactory.prototype.text = function(x, y, text, size, color){
	function Text(game, x, y, text, size, color){
		TinyGame.GameObject.call(this, x, y);
		this._game = game;
		this._type = "TEXT";
		this.text = text;
		this.size = size || '20pt';
		this.color = color || 'black';
		this.font = "Verdana, Geneva, sans-serif";
	}
	Text.prototype = Object.create(TinyGame.GameObject.prototype);
	Text.prototype._draw = function(context){
		context.font = this.size + " " + this.font;
		context.fillStyle = this.color;
		context.fillText(this.text, this.position.x, this.position.y);
	};
	var obj = new Text(this._game, x, y, text, size, color);
	this._game.text._add(obj);
	return obj;
};
TinyGame.ObjectFactory.prototype.image = function(){};
TinyGame.ObjectFactory.prototype.circle = function(){};
