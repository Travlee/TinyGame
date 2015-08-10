
//  Game Engine events: 
//      - Bounds Collision
//      - Object Collision
//      - Off Canvas
//      - AND MORE!
// 
//      Todo:
//          - [ ] Remove unnecessary assignment operations
//          
TinyGame.EventHandler = function(game){
    this._Game = game;
    

    // this._Last = null;
};
// TinyGame.EventHandler.prototype._Update = function(){}; 
// TinyGame.EventHandler.prototype._Clear = function(){};

TinyGame.EventHandler.prototype._Trigger = {
    _Bounds: function(obj, type, state){

        switch(type){
            case TinyGame.TYPES.NONE:
                obj.Events.Bounds.None = state;
                if(obj.Events.Bounds.None === true){
                    if(obj.Events._Binds._Bounds._None) obj.Events._Binds._Bounds._None();
                }
                else {
                    if(obj.Events._Binds._Bounds._Any) obj.Events._Binds._Bounds._Any();
                }
                break;
            case TinyGame.TYPES.BOUNDS.LEFT:
                obj.Events.Bounds.Left = state;
                break;
            case TinyGame.TYPES.BOUNDS.RIGHT:
                obj.Events.Bounds.Right = state;
                break;
            case TinyGame.TYPES.BOUNDS.TOP:
                obj.Events.Bounds.Top = state;
                break;
            case TinyGame.TYPES.BOUNDS.BOTTOM:
                obj.Events.Bounds.Bottom = state;
                break;
        }
    }
};
TinyGame.EventHandler.prototype.Bind = function(obj, type, callback){
    if(typeof type !== 'number') {
        console.error("TinyGame.EventHandler.Bind: Error args[1] NOT valid type; <int>||TinyGame.EventTypes");
        return false;
    }
    switch(type){
        case TinyGame.TYPES.ANY:
            obj.Events._Binds._Bounds._Any = callback.bind(obj);
            break;
        case TinyGame.TYPES.NONE:
            obj.Events._Binds._Bounds._None = callback.bind(obj);
            break;
    }
};
TinyGame.EventHandler.prototype.RemoveBind = function(obj, type){
    if(typeof type !== 'number') {
        console.error("TinyGame.EventHandler.RemoveBind: Error args[1] NOT valid type; <int>||TinyGame.EventTypes");
        return false;
    }
    switch(type){
        case TinyGame.TYPES.ANY:
            obj.Events._Binds._Bounds._Any = null;
            break;
    }
};

TinyGame.ObjectEvents = function(){
    this._Binds = {
        _Bounds: {
            _None: null,
            _Left: null,
            _Right: null,
            _Top: null,
            _Bottom: null,
            _Any: null
        }
    };
    this.Bounds = {
        None: false,
        Left: false,
        Right: false,
        Top: false,
        Bottom: false
    };
};

