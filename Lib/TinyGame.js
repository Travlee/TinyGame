
//	TinyGame Html5 Game Framework
//		-by TravLee
(function(){
	if(window.requestAnimationFrame === 'undefined'){
		alert("Game Loop Issues Because I'm Lazy.");
		console.error("Game loop issues because I'm lazy.");
	}
})();
var TinyGame = {
	Version: 0.1 //	idk why this is here
};

TinyGame.SpriteSheet = function(){};

TinyGame.Body = function(){
	this.velocity = new TinyGame.Vector2d();
	this.gravity = new TinyGame.Vector2d();
	this.enableBounds = false;	
};

//	TinyGame.Canvas() - Object
TinyGame.Canvas = function(width, height, parent_id, id){
	var canvas = document.createElement('canvas');
	canvas.id = id || 'TinyCanvas-Canvas-Canvas';
	canvas.width = width;
	canvas.height = height;
	if(!parent_id) { document.body.appendChild(canvas); }
	else { document.getElementById(parent_id).appendChild(canvas); }
	return canvas;
};

//	#TinyCanvas.RequestAnimationFrame(context || null, callback) 
TinyGame.RequestAnimationFrame = function(context, callback){
	
	// Polyfill for window.Raf not done
    (function(){
    	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    })();

	this.startId = null;
	this.running = false;
	this.callback = callback.bind(context || this);
    this._raf = true;

    var self = this;
    this.loop = function(time){
    	if(!self.running) return;
    	self.callback(time);
		self.startId = window.requestAnimationFrame(self.loop);
    };
};
TinyGame.RequestAnimationFrame.prototype.start = function(){
	this.running = true;
	this.loop();
};
TinyGame.RequestAnimationFrame.prototype.stop = function(){
	window.cancelAnimationFrame(this.startId);
	this.running = false;
};

TinyGame.Vector2d = function(x, y){
	this.x = x || 0;
	this.y = y || 0;
};
TinyGame.Vector2d.prototype.add = function(v){
	if(v instanceof TinyGame.Vector2d){
		this.x += v.x;
		this.y += v.y;
	}else{
		this.x += v;
		this.y += v;
	}
	return this;
};
TinyGame.Vector2d.prototype.substract = function(v){
	if(v instanceof TinyGame.Vector2d){
		this.x -= v.x;
		this.y -= v.y;
	}else{
		this.x -= v;
		this.y -= v;
	}
	return this;
};
TinyGame.Vector2d.prototype.multiply = function(v){
	if(v instanceof TinyGame.Vector2d){
		this.x *= v.x;
		this.y *= v.y;
	}else{
		this.x *= v;
		this.y *= v;
	}
	return this;
};
TinyGame.Vector2d.prototype.normalize = function(){
	var normal = new TinyGame.Vector2d(this.x, this.y);
	var length = this.length();
	normal.x = normal.x/length;
	normal.y = normal.y/length;
	return normal;
};
TinyGame.Vector2d.prototype.length = function(){
	var length = (this.x * this.x) + (this.y * this.y);
	return Math.sqrt(length);
};