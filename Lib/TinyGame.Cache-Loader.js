
//	#TinyGame.Cache
TinyGame.Cache = function(){
	this._assets = 0;
	this._pending = 0;
	this._spriteSheets = [];
	this._images = [];
	this._audio = [];
};
TinyGame.Cache.prototype._clear = function(){
	this._assets = 0;
	this._pending = 0;
	this._spriteSheets = [];
	this._images = [];
	this._audio = [];
};

//	#TinyGame.Loader
TinyGame.Loader = function(game){
	this._cache = game._cache;
};
TinyGame.Loader.prototype._onLoad = function(){
	this._cache._pending--;
};
TinyGame.Loader.prototype._onLoadError = function(e){
	//console.error();
	console.error('Error loading', e);
};
TinyGame.Loader.prototype.progress = function(){
	if(this._cache._pending === 0) return 100;
	var percent = ((this._cache._assets - this._cache._pending) / this._cache._assets) * 100;
	return percent;
};
TinyGame.Loader.prototype.completed = function(){
	if(this._cache._pending === 0) return true;
	return false;
};
TinyGame.Loader.prototype.image = function(key, img){
	this._cache._assets++;
	this._cache._pending++;
	var image = new Image();
	image.onload = this._onLoad.bind(this);
	image.src = img;
	image.onerror = this._onLoadError.bind(this, key);
	this._cache._images[key] = image;
};
TinyGame.Loader.prototype.spriteSheet = function(key, img, frame_width, frame_height){
	this._cache._assets++;
	this._cache._pending++;
	var image = new Image();
	image.onload = this._onLoad.bind(this);
	image.src = img;
	image.onerror = this._onLoadError.bind(this, key)
	this._cache._spriteSheets[key] = {image:image, width:frame_width, height:frame_height};
};
TinyGame.Loader.prototype.audio = function(name, audio_file){
	this._cache._assets++;
	this._cache._pending++;
	this._cache._audio[name] = new Audio(audio_file);
	this._cache._audio[name].oncanplaythrough = this._onLoad.bind(this);

	//this._Cache.Audio[name].onerror = this._OnLoadError.bind(this);
};