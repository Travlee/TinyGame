//	#TinyGame.Cache
//	store all objects in one array
TinyGame.Cache = function(){
	this._assets = [];
	this._pending = 0;
	this._totalPending = 0;
};
TinyGame.Cache.prototype._clear = function(){
	this._assets = [];
	this._pending = 0;
	this._totalPending = 0;	
};

//	#TinyGame.Loader
TinyGame.Loader = function(game){
	this._cache = game._cache;
	this.completed = false;
	this.progress = 0;
};
TinyGame.Loader.prototype._onLoad = function(){
	this._cache._pending--;
	if(this._cache._pending === 0){
		this._cache._totalPending = 0;
		this.completed = true;
		this.progress = 100;
	}
	else{
		this.completed = false;
		this.progress = ((this._cache._totalPending - this._cache._pending) / this._cache._totalPending) * 100;
	}
};
TinyGame.Loader.prototype._onLoadError = function(caller, key){
	console.error('Error loading', caller, key);
};
TinyGame.Loader.prototype._onSpriteLoad = function(key, image, frame_width, frame_height){
	this._onLoad.call(this);
	this._cache._assets[key] = new TinyGame.SpriteSheet(image, frame_width, frame_height);
};
TinyGame.Loader.prototype._onImageLoad = function(key, img){
	this._onLoad.call(this);
	this._cache._assets[key] = img;
};
TinyGame.Loader.prototype._onAudioLoad = function(key, audio){
	this._onLoad.call(this);
	this._cache._assets[key] = audio;
};
TinyGame.Loader.prototype.image = function(key, img){
	this._cache._totalPending++;
	this._cache._pending++;
	var image = new Image();
	image.src = img;
	image.onerror = this._onLoadError.bind(this, key);
	image.onload = this._onImageLoad.bind(this, key, image);
};
TinyGame.Loader.prototype.spriteSheet = function(key, img, frame_width, frame_height){
	this._cache._totalPending++;
	this._cache._pending++;
	var image = new Image();
	image.src = img;
	image.onerror = this._onLoadError.bind(this, "spriteSheet", key);
	image.onload = this._onSpriteLoad.bind(this, key, image, frame_width, frame_height);
};
TinyGame.Loader.prototype.audio = function(key, audio_file){
	this._cache._pending++;
	this._cache._totalPending++;
	var audio = new Audio(audio_file);
	audio.oncanplaythrough = this._onAudioLoad.bind(this, key, audio);
	//audio.onerror = this._OnLoadError.bind(this);
};