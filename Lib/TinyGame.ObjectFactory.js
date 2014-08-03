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
		TinyGame.GameObject.call(this, x, y);
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
	
	function Sprite(spriteSheet, x, y, frame){
		TinyGame.GameObject.call(this, x, y);
		this._type = "SPRITE";
		this._img = spriteSheet[0];

		this.width = spriteSheet[1];
		this.height = spriteSheet[2];
		this.frame = frame || 0;

		this._frames = [];
		for(var i=0, frame=0, yLen=this._img.height/this.height; i<yLen; i++){
			for(var ii=0, x=0, y=0, xLen=this._img.width/this.width; ii<xLen; ii++, frame++){
				x = ii*this.width;
				y = i*this.height;
				this._frames[frame] = [x, y];
			}
		}
			
		this.animations = new TinyGame.Animations(this);
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

	var obj = new Sprite(this._game._cache._spriteSheets[key], x, y, frame);
	this._game.objects._add(obj);
	return obj;
};
TinyGame.ObjectFactory.prototype.text = function(x, y, text, size, color){
	function Text(x, y, text, size, color){
		TinyGame.GameObject.call(this, x, y);
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
	var obj = new Text(x, y, text, size, color);
	this._game.text._add(obj);
	return obj;
};
TinyGame.ObjectFactory.prototype.image = function(){};
TinyGame.ObjectFactory.prototype.circle = function(){};
