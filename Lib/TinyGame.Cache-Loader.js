
//	#TinyGame.Cache
TinyGame.Cache = function(){
	this._Assets = 0;
	this._Pending = 0;
	this._Images = [];
	this._Audio = [];
};
TinyGame.Cache.prototype._Clear = function(){
	this._Assets = 0;
	this._Pending = 0;
	this._Images = [];
	this._Audio = [];
};

//	#TinyGame.Loader
TinyGame.Loader = function(game){
	this._Cache = game._Cache;
};
TinyGame.Loader.prototype._OnLoad = function(){
	this._Cache._Pending--;
};
TinyGame.Loader.prototype._OnLoadError = function(e){
	//console.error();
	console.error('Error loading', e);
};
TinyGame.Loader.prototype.Progress = function(){
	if(this._Cache._Pending === 0) return 100;
	var percent = ((this._Cache._Assets - this._Cache._Pending) / this._Cache._Assets) * 100;
	return percent;
};
TinyGame.Loader.prototype.Completed = function(){
	if(this._Cache._Pending === 0) return true;
	return false;
};
TinyGame.Loader.prototype.Image = function(name, image_file){
	this._Cache._Assets++;
	this._Cache._Pending++;
	this._Cache._Images[name] = new Image();
	this._Cache._Images[name].onload = this._OnLoad.bind(this);
	this._Cache._Images[name].src = image_file;
	this._Cache._Images[name].onerror = this._OnLoadError.bind(this, name);
};
TinyGame.Loader.prototype.Audio = function(name, audio_file){
	this._Cache._Assets++;
	this._Cache._Pending++;
	this._Cache._Audio[name] = new Audio(audio_file);
	this._Cache._Audio[name].oncanplaythrough = this._OnLoad.bind(this);

	//this._Cache.Audio[name].onerror = this._OnLoadError.bind(this);
};
//  Add in a sprite cache type, so you can add animations straight to the cache; Maybe?