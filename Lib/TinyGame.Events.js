
//  Game Engine events: 
//      - Bounds Collision
//      - Object Collision
//      - Off Canvas
//      - AND MORE!
//      Move events to each object, not Game globals; Im retarded
//      Notes:
//          Remove unnecessary assignment operations
TinyGame.EventHandler = function(game){
    this._Game = game;

    this.Bounds = new TinyGame.BoundsEvent();
    
    this._Binds = {

    };

    this._Last = null;
};
TinyGame.EventHandler.prototype._Update = function(){};
TinyGame.EventHandler.prototype._Clear = function(){};

TinyGame.EventHandler.prototype.Bind = function(type, callback){
    if(typeof type !== 'number')
    switch(type){

    }
};

TinyGame.BoundsEvent = function(){
    this.Left = false;
    this.Right = false;
    this.Top = false;
    this.Bottom = false;

    // this.Active = false;
};

//  Renamed to Impact
TinyGame.BoundsEvent.prototype._Update = function(wall, state){
    if(typeof state !== 'boolean'){
        console.error("TinyGame.EventHandler.Bounds._Update(): Error args:0 NOT boolean");
        return false;
    }
    switch(wall){
        case 'LEFT':
            this.Left = state;
            break;
        case 'RIGHT':
            this.Right = state;
            break;
        case 'TOP':
            this.Top = state;
            break;
        case 'BOTTOM':
            this.Bottom = state;
            break;
        default:
            console.error("TinyGame.EventHandler.Bounds._Update(): Error args:1 NOT valid");
    }

};
TinyGame.EventTypes = {
    BOUNDS: 0
};