
//	#TinyGame.StateHandler
//		
TinyGame.StateHandler = function(game, states, default_state){
	this._game = game || this;
	this._cache = game._cache;

	this._bootCompleted = false;
	this._pendingActive = null;
	this._states = [];
	
	this.active = {
		state: null,

		_loaded: false,
		_loading: false,
		_initialized: false,

		_onLoad: null,
		_onInitialize: null,
		_onUpdate: null,
		_onDraw: null,
		_onPostDraw: null,
		_onDie: null
	};

	this._parseStates(states);
	if(default_state) this._pendingActive = default_state;
};
TinyGame.StateHandler.prototype._boot = function(){
	this._bootCompleted = true;
	this._setActive(this._pendingActive);
};
TinyGame.StateHandler.prototype._parseStates = function(states){
	for(var state in states){
		if(typeof states[state] === 'object'){
			this.add(state, states[state]);
		}
		else
		{
			this.add('Default', states);
			this._pendingActive = 'Default';
			break;
		}
	}
};
TinyGame.StateHandler.prototype._validState = function(state){
	if(this._states[state]) return true;

	var valid = true;
	for(var obj in state){
		if(typeof state[obj] !== 'function') valid = false;
	}
	return valid;
};
TinyGame.StateHandler.prototype._update = function(){
	if(!this.active.state) return;
	
	//	Calls Load once, if exists
	if(this.active._onLoad && !this.active._loaded){
		this.active._onLoad();
		this.active._loaded = true;
	}
	//	Calls Initialize once, if exists
	if(this.active._onInitialize && !this.active._initialized){
		this.active._onInitialize();
		this.active._initialized = true;
	}

	this._updateActive();
	this._drawActive();
};
TinyGame.StateHandler.prototype._addState = function(name, state, start){
	this._states[name] = new TinyGame.State(state);
	if(start) this._setActive(name);
};


//	Active State Methods ####
//	NOT INTENDED FOR PERSONAL USE!
TinyGame.StateHandler.prototype._setActive = function(state){
	
	//	Kills Last State Gracefully
	this._killActive();
	//	Sets Up New Active
	this._linkActive(state);

	//	DEBUG TEXT
	console.log("ACTIVE STATE:", "'" + state + "'");
};	
TinyGame.StateHandler.prototype._linkActive = function(state){
	if(!this._states[state]) return;	

	var newState = this._states[state];

	this.active.state = state;
	this.active._loaded = false;
	//this.Active._Loading = false;
	this.active._initialized = false;

	this.active._onLoad = newState._load ? newState._load.bind(this._game) : null;
	this.active._onInitialize = newState._initialize ? newState._initialize.bind(this._game) : null;
	this.active._onUpdate = newState._update ? newState._update.bind(this._game) : null;
	this.active._onDraw = newState._draw ? newState._draw.bind(this._game) : null;
	this.active._onDie = newState._die ? newState._die.bind(this._game) : null;
};
TinyGame.StateHandler.prototype._updateActive = function(){
	if(!this.active._onUpdate) return;
	this.active._onUpdate();
};
TinyGame.StateHandler.prototype._drawActive = function(){
	if(!this.active._onDraw) return;
	this.active._onDraw();

	//	Do POST DRAW CALLS HERE OR SOMETHING
	/*if(!this.Active._OnPostDraw) return;
	this.Active._OnPostDraw();*/
};
TinyGame.StateHandler.prototype._killActive = function(){
	if(this.active.state === null) return;
	if(this.active._onDie) this.active._onDie();

	//	Debug Text
	console.log("	KILLED STATE:", "'" + this.active.state + "'");
};
//	#########################


TinyGame.StateHandler.prototype.add = function(name, state, start){
	if(!this._validState(state)){
		console.error('TinyGame.STATEHANDLER.ADD: INVALID STATE OBJECT ', state);
		return;
	}
	this._states[name] = new TinyGame.State(state);
	if(start) this._setActive(name);
};
TinyGame.StateHandler.prototype.start = function(state){
	if(!this._bootCompleted){
		this._pendingActive = state;
		return;
	}
	if(!this._validState(state)) {
		console.error("TinyGame.StateHandler.Start: INVALID STATE '" + state + "'");
		return;
	}

	this._setActive(state);	
};

//	#TinyGame.State
TinyGame.State = function(state){
	this._load = state.load || null;
	this._initialize = state.initialize || null;
	this._update = state.update || null;
	this._draw = state.draw || null;
	this._postDraw = null;
	this._die = state.die || null;
};