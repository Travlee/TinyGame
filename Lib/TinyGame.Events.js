
//  Game Engine events: 
//      - Bounds Collision
//      - AND MORE!
TinyGame.EventHandler = function(game){
    this._Game = game;

    this.Bounds = new TinyGame.BoundsEvent();

    this._Last = null;
};
TinyGame.EventHandler.prototype._Update = function(){};
TinyGame.EventHandler.prototype._Clear = function(){};


TinyGame.BoundsEvent = function(){
    this.Left = false;
    this.Right = false;
    this.Top = false;
    this.Bottom = false;

};
TinyGame.BoundsEvent.prototype._Update = function(wall, bool){
    if(typeof bool !== 'boolean'){
        console.error("TinyGame.EventHandler.Bounds._Update(): Error args:0 NOT boolean");
        return false;
    }
    switch(wall){
        case 'LEFT':
            this.Left = bool;
            break;
        case 'RIGHT':
            this.Right = bool;
            break;
        case 'TOP':
            this.Top = bool;
            break;
        case 'BOTTOM':
            this.Bottom = bool;
            break;
        default:
            console.error("TinyGame.EventHandler.Bounds._Update(): Error args:1 NOT valid");
    }
};