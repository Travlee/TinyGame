
//	TinyGame Html5 Game Framework
//		-by TravLee
(function(){
	if(window.requestAnimationFrame === 'undefined'){
		alert("Game Loop Issues Because I'm Lazy.");
		console.error("Game loop issues because I'm lazy.");
	}
})();
var TinyGame = {
	types: {
		sprite: "SPRITE",
		text:"TEXT",
		rect:"RECT",
		circle:"CIRCLE"
	}
};

TinyGame.SpriteSheet = function(image, frameWidth, frameHeight){
	this.image = image || null;
	this.width = image.width;
	this.height = image.height;
	this.fWidth = frameWidth || null;
	this.fHeight = frameHeight || null;

	this.frames = [];

	for(var i=0, frame=0, yLen=this.height/this.fHeight; i<yLen; i++){
		for(var ii=0, x=0, y=0, xLen=this.width/this.fWidth; ii<xLen; ii++, frame++){
			x = ii*this.fWidth;
			y = i*this.fHeight;
			this.frames[frame] = {x:x, y:y};
		}
	}		
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
    	window.requestAnimationFrame = window.requestAnimationFrame 
    								|| window.mozRequestAnimationFrame 
    								|| window.webkitRequestAnimationFrame 
    								|| window.msRequestAnimationFrame;
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
TinyGame.RequestAnimationFrame.prototype = {
	start: function(){
		this.running = true;
		this.loop();
	},
	stop: function(){
		window.cancelAnimationFrame(this.startId);
		this.running = false;
	}
};

