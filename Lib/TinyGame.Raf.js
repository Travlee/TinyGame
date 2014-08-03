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