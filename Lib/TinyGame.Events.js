
//  Game Engine events: 
//      - Bounds Collision
//      - Object Collision
//      - Off Canvas
//      - AND MORE!
// 
//      Todo:
//          - [ ] Remove unnecessary assignment operations
//          - [ ] Use Custom Events for Triggering TG.Events
//          
TinyGame.EventHandler = function(game){
    this._Game = game;
    
    this.Bounds = new TinyGame.BoundsEventHandler();
    this.Input = new TinyGame.InputEventHandler(this._Game);

    // this._Last = null;
};

TinyGame.EventHandler.prototype._Update = function(){

    this.Bounds._Update();
    // this.Input._Update();

}; 
// TinyGame.EventHandler.prototype._Clear = function(){};

// TinyGame.EventHandler.prototype.RemoveBind = function(obj, type){
//     if(typeof type !== 'number') {
//         console.error("TinyGame.EventHandler.RemoveBind: Error args[1] NOT valid type; <int>||TinyGame.EventTypes");
//         return false;
//     }
//     switch(type){
//         case TinyGame.TYPES.BOUNDS.ANY:
//             obj.Events._Binds._Bounds._Any = null;
//             break;
//     }
// };

TinyGame.BoundsEventHandler = function(){
    
    this._Binds = {
        _None: [],
        _Left: [],
        _Right: [],
        _Top: [],
        _Bottom: [],
        _Any: []
    };

};
TinyGame.BoundsEventHandler.prototype._Update = function(){

    //  Call Bounds.None Binds
    for(var index in this._Binds._None){
        var bind = this._Binds._None[index];

        if(bind.obj.Events.Bounds.None){
            bind.callback();
        }
    }

    //  Call Bounds.Any Binds
    for(var index in this._Binds._Any){
        var bind = this._Binds._Any[index];

        if(!bind.obj.Events.Bounds.None){
            bind.callback();
        }
    }

    //  Call Bounds.Left Binds
    for(var index in this._Binds._Left){
        var bind = this._Binds._Left[index];

        if(bind.obj.Events.Bounds.Left){
            bind.callback();
        }
    }

    //  Call Bounds.Right Binds
    for(var index in this._Binds._Right){
        var bind = this._Binds._Right[index];

        if(bind.obj.Events.Bounds.Right){
            bind.callback();
        }
    }

    //  Call Bounds.Top Binds
    for(var index in this._Binds._Top){
        var bind = this._Binds._Top[index];

        if(bind.obj.Events.Bounds.Top){
            bind.callback();
        }
    }

    //  Call Bounds.Bottom Binds
    for(var index in this._Binds._Bottom){
        var bind = this._Binds._Bottom[index];

        if(bind.obj.Events.Bounds.Bottom){
            bind.callback();
        }
    }
};
TinyGame.BoundsEventHandler.prototype._Trigger = function(obj, type, state){

    //  Add Args Type Checking

    switch(type){
        case TinyGame.TYPES.BOUNDS.NONE:
            obj.Events.Bounds.None = state;
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
};
TinyGame.BoundsEventHandler.prototype.Bind = function(type, callback, obj){

    //  Add Args Type Checks

    if(typeof type !== 'number') {
        console.error("TinyGame.EventHandler.Bounds.Bind: Error args[1] NOT valid type; <int>||TinyGame.TYPES.BOUNDS");
        return false;
    }

    var bind = {
        obj: obj, 
        callback: callback.bind(obj)
    };

    switch(type){
        case TinyGame.TYPES.BOUNDS.ANY:
            this._Binds._Any.push(bind);
            break;
        case TinyGame.TYPES.BOUNDS.NONE:
            this._Binds._None.push(bind);
            break;
        case TinyGame.TYPES.BOUNDS.LEFT:
            this._Binds._Left.push(bind);
            break;
        case TinyGame.TYPES.BOUNDS.RIGHT:
            this._Binds._Right.push(bind);
            break;
        case TinyGame.TYPES.BOUNDS.TOP:
            this._Binds._Top.push(bind);
            break;
        case TinyGame.TYPES.BOUNDS.BOTTOM:
            this._Binds._Bottom.push(bind);
            break;
    }

};

TinyGame.InputEventHandler = function(game){
    this._Game = game;

    this._Binds = {
        _Keys: [],
        _Mouse: []

    };

};
TinyGame.InputEventHandler.prototype._Update = function(){};
TinyGame.InputEventHandler.prototype._Trigger = function(type, state){

    //  Add Args Type Checking

};
TinyGame.InputEventHandler.prototype.Bind = function(type, callback, context){
    
    //  Add Args Type Checking

    switch(type){
        case TinyGame.TYPES.INPUT.KEY_DOWN:
            // if(context){
            //     callback = callback.bind(context);
            // }
            // this._Binds._Keys.push(callback);
            // break;

            if(context){
                callback = callback.bind(context);
            }
            document.addEventListener("keydown", callback, false);
            break;

        case TinyGame.TYPES.INPUT.MOUSE:
            if(context){
                callback = callback.bind(context);
            }
            this._Binds._Mouse.push(callback);
            break;
    }
};

TinyGame.ObjectEvents = function(){
  
    this.Bounds = {
        None: false,
        Left: false,
        Right: false,
        Top: false,
        Bottom: false
    };
};

