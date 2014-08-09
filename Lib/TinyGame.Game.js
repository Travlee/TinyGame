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
//			-Required if passing in an object filled with states, or nothing will run by default
TinyGame.Game = function(width, height, parent_id, states, default_state){
	
	// Status Stuff
	this._bootCompleted = false;
	this._isRunning = false;
	this._paused = false;

	// Private Stuffs
	this._cache = null; 

	// Settings stuff
	// this.enableStepping = false;

	// Public Objects
	this.time = null;
	this._cache = null;
	this.add = null;
	this.load = null;
	this.objects = null;
	//this.Rand = null;
	// this.input = null; 
	this.math = null;
	this.physics = null;
	this.scene = new TinyGame.Scene(this, width, height, parent_id, 'white');
	this.states = new TinyGame.StateHandler(this, states || null, default_state || null);
	this.world = null;
	
	if(document.readyState === 'complete' || document.readyState === 'interactive'){
		this._boot();
	}
	else{
		var self = this;
		document.addEventListener('DOMContentLoaded', function(){self._boot();}, false);		
	}
}
TinyGame.Game.prototype._boot = function(){
	if(this._bootCompleted) return;
	this._bootCompleted = true;
	document.removeEventListener('DOMContentLoaded', this._boot);
	
	this._cache = new TinyGame.Cache();
	this.add = new TinyGame.ObjectFactory(this);
	this.time = new TinyGame.Time();
	this.load = new TinyGame.Loader(this);
	// this.input = new TinyGame.Input(this);
	this.objects = new TinyGame.ObjectsHandler(this);
	this.physics = new TinyGame.Physics(this);
	this.math = TinyGame.Math;
	this.states._boot();
	this.scene._boot();
	this.world = new TinyGame.World(this);

	this.raf = new TinyGame.RequestAnimationFrame(this, this._run);
	this.raf.start();
};
TinyGame.Game.prototype._run = function(time){
	if(!this._isRunning) this._isRunning = true;

	//	Game Loop Stuffs
	this.time._update(time);
	this.states._update(this.time.gameTime);
	// this.input._update();
	this.physics._update(this.time.gameTime);
	this.world._update(this.time.gameTime);
	this.scene._update(this.time.gameTime);
};