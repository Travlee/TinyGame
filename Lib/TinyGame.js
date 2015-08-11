
//	TinyGame Framework
//		-Requires TinyCanvas Library
//		-by Lee
//		
//		Todo:
// 			- [ ]
// 			
(function(){
	if(window.requestAnimationFrame === 'undefined'){
		alert("Game Loop Issues Because I'm Lazy.");
		console.error("Game loop issues because I'm lazy.");
	}
})();

var TinyGame = {
	Version: 0
};
//	#TinyGame(width, height, parent_id, states, default_state)
//		-width <int> REQUIRED}: 
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
TinyGame.Game = function(width, height, parent_id, states, default_state){
	
	// Status Stuff
	this._BootCompleted = false;
	this._IsRunning = false;
	this._Paused = false;

	// Private Stuffs
	this._Cache = null; 

	// Settings stuff
	//this.EnableFPS = true;	DONT KNOW YET...
	//this.EnableStepping = false;    // Also doesn't exist yet

	// Public Objects
	this.Time = null;
	this.FPS = null;
	this.Add = null;
	this.Load = null;
	this.Objects = null;
	this.Events = null;
	//this.Rand = null;
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
};
//  TinyGame.game._Boot() - Private
//      - Caller: EventListener->DOMContentLoaded
//      - Returns: Not shit
TinyGame.Game.prototype._Boot = function(){
	if(this._BootCompleted) return;
	this._BootCompleted = true;
	document.removeEventListener('DOMContentLoaded', this._Boot);
	
	this._Cache = new TinyGame.Cache();
	this.Add = new TinyGame.ObjectFactory(this);
	this.Time = new TinyGame.Time();
	this.Load = new TinyGame.Loader(this);
	this.Objects = new TinyGame.ObjectsHandler(this);
	this.Events = new TinyGame.EventHandler(this);
	this.Math = TinyGame.Math;
	this.Scene._Boot();
	this.World = new TinyGame.World(this);
	this.States._Boot();

	this.Raf = new TinyGame.RequestAnimationFrame(this, this._Run);
	this.Raf.Start();
};
TinyGame.Game.prototype._Run = function(time){
	if(!this._IsRunning) this._IsRunning = true;

	//	Game Loop Stuffs
	this.Time._Update(time);
	this.States._Update();
	this.Scene._Update();
	this.World._Update();
	this.Events._Update();
	

	//	Debug Stuffs
};