
//	TinyGame.StateHandler
//		- Add a pending-state check at the start of each lopp
TinyGame.StateHandler = function(game, states, default_state){
	this._Game = game || this;
	this._Cache = game._Cache;

	this._BootCompleted = false;
	this._PendingActive = null;
	this._States = [];
	
	this.Active = {
		State: null,

		_Loaded: false,
		_Loading: false,
		_Initialized: false,

		_OnLoad: null,
		_OnInitialize: null,
		_OnUpdate: null,
		_OnDraw: null,
		_OnPostDraw: null,
		_OnDie: null
	};

	this._ParseStates(states);
	if(default_state) this._PendingActive = default_state;
};
TinyGame.StateHandler.prototype._Boot = function(){
	this._BootCompleted = true;
	this._SetActive(this._PendingActive);
};
TinyGame.StateHandler.prototype._ParseStates = function(states){
	for(var state in states){
		if(typeof states[state] === 'object'){
			this.Add(state, states[state]);
		}
		else
		{
			this.Add('Default', states);
			this._PendingActive = 'Default';
			break;
		}
	}
};

//	Added a typeof: 'object' check along with 'function' to allow for custom
//		props/objects to be added to state::objects in addition to state::methods.
//	CHANGE: Change the check to see if each property of the state object has an object
//		that has at least update(or one of: init/preload/etc..) methods and such.
//		Then only add that object, and skip non-matches.
TinyGame.StateHandler.prototype._ValidState = function(state){
	if(this._States[state]) return true;

	for(var obj in state){
		if(typeof state[obj] === 'function' || typeof state[obj] === 'object'){ 
			// console.log(state, state[obj]);

			return true;
		}
		// console.info('	OBJECT:', state, 'PROP:', state[obj]);
		return false;
	}
};
TinyGame.StateHandler.prototype._Update = function(){
	if(!this.Active.State) return;
	
	//	Calls Load once, if exists
	if(this.Active._OnLoad && !this.Active._Loaded){
		this.Active._OnLoad();
		this.Active._Loaded = true;
	}
	//	Calls Initialize once, if exists
	if(this.Active._OnInitialize && !this.Active._Initialized){
		this.Active._OnInitialize();
		this.Active._Initialized = true;
	}

	this._UpdateActive();
	this._DrawActive();
};
TinyGame.StateHandler.prototype._AddState = function(name, state, start){
	this._States[name] = new TinyGame.State(state);
	if(start) this._SetActive(name);
};


//	Active State Methods ####
//	NOT INTENDED FOR PERSONAL USE!
TinyGame.StateHandler.prototype._SetActive = function(state){
	
	//	Kills Last State Gracefully
	this._KillActive();
	//	Sets Up New Active
	this._LinkActive(state);

	//	DEBUG TEXT
	console.log("ACTIVE STATE:", "'" + state + "'");
};	
TinyGame.StateHandler.prototype._LinkActive = function(state){
	if(!this._States[state]) return;	

	var newState = this._States[state];

	this.Active.State = state;
	this.Active._Loaded = false;
	//this.Active._Loading = false;
	this.Active._Initialized = false;

	this.Active._OnLoad = newState._Load ? newState._Load.bind(this._Game) : null;
	this.Active._OnInitialize = newState._Initialize ? newState._Initialize.bind(this._Game) : null;
	this.Active._OnUpdate = newState._Update ? newState._Update.bind(this._Game) : null;
	this.Active._OnDraw = newState._Draw ? newState._Draw.bind(this._Game) : null;
	this.Active._OnDie = newState._Die ? newState._Die.bind(this._Game) : null;
};
TinyGame.StateHandler.prototype._UpdateActive = function(){
	if(!this.Active._OnUpdate) return;
	this.Active._OnUpdate();
};
TinyGame.StateHandler.prototype._DrawActive = function(){
	if(!this.Active._OnDraw) return;
	this.Active._OnDraw();

	//	Do POST DRAW CALLS HERE OR SOMETHING
	/*if(!this.Active._OnPostDraw) return;
	this.Active._OnPostDraw();*/
};
TinyGame.StateHandler.prototype._KillActive = function(){
	if(this.Active.State === null) return;
	if(this.Active._OnDie) this.Active._OnDie();

	//	Debug Text
	console.log("	KILLED STATE:", "'" + this.Active.State + "'");
};
//	#########################


TinyGame.StateHandler.prototype.Add = function(name, state, start){
	if(!this._ValidState(state)){
		console.error('TinyGame.StateHandler.Add: INVALID STATE OBJECT ', name);
		return;
	}
	this._States[name] = new TinyGame.State(state);
	if(start) this._SetActive(name);
};
TinyGame.StateHandler.prototype.Start = function(state){
	if(!this._BootCompleted){
		this._PendingActive = state;
		return true;
	}
	if(!this._ValidState(state)) {
		console.error("TinyGame.StateHandler.Start: INVALID STATE '" + state + "'");
		return false;
	}

	this._SetActive(state);	
};

//	#TinyGame.State
TinyGame.State = function(state){
	this._Load = state.Load || null;
	this._Initialize = state.Initialize || null;
	this._Update = state.Update || null;
	this._Draw = state.Draw || null;
	this._PostDraw = null;
	this._Die = state.Die || null;
};