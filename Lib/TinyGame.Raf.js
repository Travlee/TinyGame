//	#TinyCanvas.RequestAnimationFrame(context || null, callback) 
TinyGame.RequestAnimationFrame = function(context, callback){
	
	// Polyfill for window.Raf not done
    (function(){
    	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    })();

	this.StartId = null;
	this.Running = false;
	this.Callback = callback.bind(context || this);
    this._Raf = true;

    var self = this;
    this.Loop = function(time){
    	if(!self.Running) return;
    	self.Callback(time);
		self.StartId = window.requestAnimationFrame(self.Loop);
    };
};
TinyGame.RequestAnimationFrame.prototype.Start = function(){
	this.Running = true;
	this.Loop();
};
TinyGame.RequestAnimationFrame.prototype.Stop = function(){
	window.cancelAnimationFrame(this.StartId);
	this.Running = false;
};