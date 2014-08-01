
//	TinyGame Html5 Game Framework
//		-by TravLee

(function(){
	if(window.requestAnimationFrame === 'undefined'){
		alert("Game Loop Issues Because I'm Lazy.");
		console.error("Game loop issues because I'm lazy.");
	}
	/*if(){

	}*/
})();

//	#TinyGame(width, height, parent_id, states, default_state)
//		-width {INTEGER, REQUIRED}: 
//			canvas width
//		-height {INTEGER, REQUIRED}: 
//			canvas height
//		-parent_id {STRING, OPTIONAL = ''}: 
//			id of parent_div to store the canvas object, or empty string
//		-states {OBJECT, REQUIRED}: 
//			STATE-OBJECT = {Load: Callback, Initialize: callback, ...}
//				-Require: Load/Update/Draw Callbacks
//				-Possible States(In Order): Load/Initialize/Update/Draw/Die 
//			ex. {Load: load, Initialize: init, Update: update, Draw: draw}
//			ex. var MyGame = {Menu: STATE-OBJECT, LevelOne: STATE-OBJECT, Pause: STATE-OBJECT, ...};
//		-default_state (STRING, OPTIONAL-ISH*)
//			Required if passing in an object filled with states, or nothing will run by default

var TinyGame = {
	Version: 0.1 //	idk why this is here
};
TinyGame.Game = function(width, height, parent_id, states, default_state){
	
	// Status Stuff
	this._BootCompleted = false;
	this._IsRunning = false;
	this._Paused = false;

	// Private Stuffs
	this._Cache = null; 

	// Settings stuff
	this.EnableStepping = false;

	// Public Objects
	this.Time = null;
	this.FPS = null;
	this.Add = null;
	this.Load = null;
	this.Objects = null;
	this.Text = null;
	//this.Rand = null;
	this.Input = null; 
	this.Math = null;
	this.Scene = new TinyGame.Scene(this, width, height, parent_id, 'white');
	this.States = new TinyGame.StateHandler(this, states || null, default_state || null);
	this.World = null;
	
	if(document.readyState === 'complete' || document.readyState === 'interactive'){
		this._Boot();
	}
	else{
		var self = this;
		document.addEventListener('DOMContentLoaded', function(){self._Boot();}, false);		
	}
}
TinyGame.Game.prototype._Boot = function(){
	if(this._BootCompleted) return;
	this._BootCompleted = true;
	document.removeEventListener('DOMContentLoaded', this._Boot);
	
	this._Cache = new TinyGame.Cache();
	this.Add = new TinyGame.ObjectFactory(this);
	this.Time = new TinyGame.Time();
	this.Load = new TinyGame.Loader(this);
	this.Input = new TinyGame.Input(this);
	this.Objects = new TinyGame.ObjectsHandler(this);
	this.Text = new TinyGame.ObjectsHandler(this);
	this.Math = TinyGame.Math;
	this.States._Boot();
	this.Scene._Boot();
	this.World = new TinyGame.World(this);

	this.Raf = new TinyGame.RequestAnimationFrame(this, this._Run);
	this.Raf.Start();
};
TinyGame.Game.prototype._Run = function(time){
	if(!this._IsRunning) this._IsRunning = true;

	//	Game Loop Stuffs
	this.Time._Update(time);
	this.States._Update();
	this.Input._Update();
	this.Scene._Update();
	this.World._Update();	// call world before scene
};