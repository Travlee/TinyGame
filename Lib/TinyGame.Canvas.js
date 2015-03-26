
//	TinyGame.Canvas() - Object
//
TinyGame.Canvas = function(width, height, parent_id, id){
	var canvas = document.createElement('canvas');
	canvas.id = id || 'TinyCanvas-Canvas-Canvas';
	canvas.width = width;
	canvas.height = height;
	if(!parent_id) { document.body.appendChild(canvas); }
	else { document.getElementById(parent_id).appendChild(canvas); }
	return canvas;
};

//	TinyCanvas.RequestAnimationFrame(context || null, callback) 
//
TinyGame.RequestAnimationFrame = function (context, callback) {

    // Polyfill for window.Raf
    (function () {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    })();

    this.StartId = null;
    this.Running = false;
    this.Callback = callback.bind(context || this);
    this._Raf = true;

    var self = this;
    this.Loop = function (time) {
        if (!self.Running) return;
        self.Callback(time);
        self.StartId = window.requestAnimationFrame(self.Loop);
    };
};
TinyGame.RequestAnimationFrame.prototype.Start = function () {
    this.Running = true;
    this.Loop();
};
TinyGame.RequestAnimationFrame.prototype.Stop = function () {
    //window.cancelAnimationFrame(this.StartId); // No worko
    this.Running = false;
};