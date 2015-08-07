
//	TinyGame.BaseObject()
//  Base Object Class-ish
//  
//      Todo:
//          - [] Add Speed/Accel to baseobject?
//          
TinyGame.BaseObject = function (x, y) {
    this._Type = null;
    this._ID = 0;
    this.Position = new TinyGame.Vector2d(x || 0, y || 0);
    // this.Speed = new TinyGame.Vector2d(0, 0);
    // this.Accel = new TinyGame.Vector2d(0, 0);
    this.Velocity = new TinyGame.Vector2d(0, 0);
    this.Gravity = new TinyGame.Vector2d(0, 0);
    this.Events = new TinyGame.EventHandler();

    //  Vision vector for line-of-sight checks; Not used yet
    this.Vision = new TinyGame.Vector2d();

    //  Variables for Move Methods
    //  REMOVE: Add Move logic to game engine
    this._Move = {
        _Pending: false,
        _Destination: new TinyGame.Vector2d(),
        _Speed: null
    };
    

    this.zIndex = 0;
};
TinyGame.BaseObject.prototype._Draw = function (context) { };

//  TinyGame.BaseObject._Update() <Private>
//      - Caller: TinyGame.World._Update()
//      - Notes: Used for the MoveTo method, allows for calling MoveTo() once, 
//                  and still having the object move. Issues with large speeds, 
//                  causing the object to 'bounce' back and forth,
//                  near the destination. Need to add some math to check the differences with applied.
//                  However I'm retarded and can't think up a solution yet. Pls fix.
TinyGame.BaseObject.prototype._Update = function () {

    //  Handles the Move Commands
    if (this._Move._Pending) {
        
        var target = new TinyGame.Vector2d(),
            xDifference = this._Move._Destination.X - this.Position.X,
            yDifference = this._Move._Destination.Y - this.Position.Y;

        target.Set(xDifference, yDifference);

        //  Checks the difference for both x/y, if greater than 1 applies the normal vector to velocity.
        //  If not, then resets this._Move vars 
        if (this.Position.X !== this._Move._Destination.X) {
            var destination = this._Move._Destination, speed = this._Move._Speed;
            // console.log(destination);
            target.Set(target.Normal().Multiply(speed));
            if ((Math.abs(xDifference) - target.X) < 0) {
                target.X = 0;
                //this.Position.X = this._Move._Destination.X;
                //console.log(this.Position.X);
            } 
            if ((Math.abs(yDifference) - target.Y) < 0) {
                target.Y = 0;
                this.Position.Y = this._Move._Destination.Y;
                //console.log(this.Position.Y);
            }
            this.Velocity.Set(target);
        } else {
            console.log('GOAL');
            this._Move._Pending = false;
            this._Move._Destination.Zero();
            this._Move._Speed = null;
        }
    }
};

//  TinyGame.BaseObject._GetID
//      - Returns: Self._ID
//      - Notes: Probably retarded, and redundant, and retarded.
TinyGame.BaseObject.prototype._GetID = function () {
    return this._ID;
};

//  TinyGame.BaseObject.CollidedWith(obj) <Public> [Not Used]
//      - Caller: TinyGame.Collisions;
//      - Args: the object(s) colliding with
//      - Notes: Extendable event tiggered when a collision is found between objects specified
//               in the self.AddCollision method for shit you want done on collision.
TinyGame.BaseObject.prototype.CollidedWith = function (objects) {};

//  TinyGame.BaseObject.AddCollision(obj) - <Public> DEAD
//      - Caller: User
//      - Calls: TinyGame.Collisions._Add()
//      - Args: (obj, [listObjects] || object)
//          - Arg0: First object, object to check for collisions against list of objects arg1
//          - Arg1: List, or single, object to check for collisions against.
//      - Notes: Disabled atm, not sure if I want game objects to have access to the game object    
TinyGame.BaseObject.prototype.AddCollision = function (objects, callback) {
    //this._Game.World.Collisions._Add(this, objects, callback);
    // perhaps bind an event handler to this, to call world.collisions._add when triggered?
};

TinyGame.BaseObject.prototype.Distance = function (obj) {
    return TinyGame.Math.Vectors.Distance(this, obj);
};

//  TinyGame.BaseObject.MoveTo(destination, speed) <Public>
//      - Args: Object || Position Vector, Speed = Null 
//          - destination <Object>: The Object or Position Vector, for the object to be moved to.
//              - ex: <TinyGame.BaseObject> || [1, 1] <Array> || <TinyGame.Vector2>
//          - speed <Float> || <Integer>: not required; object will be set to destination if no speed is supplied.
//      - Returns: <Null>
//      - Notes: Moves itself to another object, or position vector, either instantly or at a specified speed.
//              Need a solution for allowing the movement to a static object or position. Basically a private method that
//              the game engine calls each update, to move the object to the last called position without the user having to 
//              call the public method each update. The Engine needs to handle this nonsense.
//              Another thought, the target velocity vector should be added to the current velocity,
//              instead of overriding and replacing.
TinyGame.BaseObject.prototype._BAKMoveTo = function (destination, speed) {

    //  Initalizes a new local TinyGame.Vector2d object
    var target = new TinyGame.Vector2d();

    //  Sets target vector to destination
    if (destination instanceof TinyGame.BaseObject) {
        target.Set(destination.Position);
    } else {
        target.Set(destination[0], destination[1]);
    }

    //  Moves the object at specified speed
    if (speed) {
        target.X = destination.Position.X - this.Position.X;
        target.Y = destination.Position.Y - this.Position.Y;
        //this.Velocity.Set(target.Normalize().Multiply(speed));

        //  This makes shit pretty cool-like. However, need to change the order of 
        //  applying gravity/velocity in the world.physics updates, and seting the velocity here.
        //  Not sure if thats the solution im looking for or not. I'm simply hoping to achieve
        //  instead of setting the velocity, here, add on to the velocity applied by the
        //  physics engine for gravity. Pls baby jebus, send me a sign.
        this.Velocity.Add(target.Normal().Multiply(speed));
    } else {
        
        //  no Speed
        if (destination instanceof TinyGame.BaseObject) {
            this.Position.Set(target);
        } else {
            this.Position.Set(target.X, target.Y);
        }
    }

};

TinyGame.BaseObject.prototype.MoveTo = function (destination, speed) {

    //  Initalizes a new local TinyGame.Vector2d object
    var target = new TinyGame.Vector2d();

    //  Sets target vector to destination
    if (destination instanceof TinyGame.BaseObject) {
        target.Set(destination.Position);
    } else {
        target.Set(destination[0], destination[1]);
    }

    if (!speed) {
        this.Position.Set(target);
    } else {
        this._Move._Pending = true;
        this._Move._Destination = target;
        this._Move._Speed = speed;
    }
};


//  TinyGame.BaseObject.Track <Public>
//      - Notes: Continuiously follows the object specified.
TinyGame.BaseObject.prototype.Track = function (obj) { };

//  TinyGame.BaseObject.PathTo <Public>
//      - Notes: Path finding method, one day im sure i'll make this a reality.
TinyGame.BaseObject.prototype.PathTo = function () { };



//	#TinyGame.ObjectFactory()
//		-Makes objects/stores in Game.Objects/TinyGame.ObjectsHandler()
TinyGame.ObjectFactory = function (game) {
    this._Game = game;
    this._Types = {
        RECT: "RECT",
        SPRITE: "SPRITE"
    };

    //  Object count; To give objects a unique ID
    this._ObjectCount = 0;
};
//  TinyGame.ObjectFactory._LinkObject() - Private
//      - Caller: Objects on creation;
//      - Returns: the Object, with a Game Object 
//      - Notes: My solution for giving each object a reference to the Game object, for certain things 
//                  like adding collisions to the game world. The other solution I thought of was to create
//                  an event handler that triggered when the object.addcollision method was called. Still might
//                  implement that idk. 
//                  Also applies a unique ID to each object
TinyGame.ObjectFactory.prototype._LinkObject = function (obj) {

    //  Binds the Game object; Private use
    //obj._Game = this._Game
    //  Stores the obj in Games.Objects
    this._Game.Objects.Add(obj);
    //  Applies a unique ID
    obj._ID = this._ObjectCount++;

    return obj;
};

//  TinyGame.ObjectFactory.Rect
//      - Returns: TinyGame.Rect 
TinyGame.ObjectFactory.prototype.Rect = function (x, y, width, height, color) {
    var obj = new TinyGame.Rect(x, y, width, height, color);
    return this._LinkObject(obj);
};

//	TinyGame.ObjectFactory.Sprite
//      - Returns: TinyGame.Sprite
//      - Args: (image, x, y, width, height, clip)
//		    - Image title from cache
//		    - X/Y position
//		    - X/Y Frame
//		    - Width/Height Frame
//		    - Width/Height scale for the image
//      - Notes: Animations not working
TinyGame.ObjectFactory.prototype.Sprite = function (image, x, y, width, height, clip) {
    var obj = new TinyGame.Sprite(this._Game._Cache._Images[image], x, y, width, height, clip);
    return this._LinkObject(obj);
};
TinyGame.ObjectFactory.prototype.Text = function (x, y, text, size, color) {
    
    var obj = new TinyGame.Text(x, y, text, size, color);
    return this._LinkObject(obj);
};
TinyGame.ObjectFactory.prototype.Image = function () { };
TinyGame.ObjectFactory.prototype.Circle = function () { };

//	#TinyGame.ObjectsHandler()
TinyGame.ObjectsHandler = function () {
    this._Objects = [];
    this._TextObjects = [];
};
TinyGame.ObjectsHandler.prototype.Add = function (obj) {
    this._Objects.push(obj);
};
TinyGame.ObjectsHandler.prototype.Clear = function () {
    this._Objects = [];
};
TinyGame.ObjectsHandler.prototype.Count = function () {
    return this._Objects.length;
};

TinyGame.Sprite = function (image, x, y, width, height, clip) {
    TinyGame.BaseObject.call(this, x, y);
    this._Type = "SPRITE";
    this._Image = image || "";
    this.Width = width || 0;
    this.Height = height || 0;
    if (!clip && typeof clip !== 'object') { this._StaticFrame = null; }
    else {
        this._StaticFrame = { X: clip.x, Y: clip.y, Width: clip.width, Height: clip.height };
    }
    this._State = "STATIC";	// Used for animations
};
TinyGame.Sprite.prototype = Object.create(TinyGame.BaseObject.prototype);
TinyGame.Sprite.prototype.Animations = {
    _Animations: [],
    Add: function (title, clip) {
        this._Animations[title] = clip;
    },
    Play: function (title) {
        //console.log(this._Animations[title]);   // DEBUG - Prints the animation object to the console
    },
    Pause: function () {

    }
};
TinyGame.Sprite.prototype._Draw = function (context) {
    if (this._State === 'STATIC') {
        if (!this._StaticFrame) {
            context.drawImage(this._Image, this.Position.X, this.Position.Y, this.Width, this.Height);
        }
        else {
            context.drawImage(this._Image, this._StaticFrame.X, this._StaticFrame.Y, this._StaticFrame.Width, 
                                this._StaticFrame.Height, this.Position.X, this.Position.Y, this.Width, this.Height);
        }
    }
    else {

    }
};
TinyGame.Text = function (x, y, text, size, color) {
    TinyGame.BaseObject.call(this, x, y);
    this.Text = text;
    this.Size = size || '20pt';
    this.Color = color || 'black';
    this.Font = "Verdana, Geneva, sans-serif";
};
TinyGame.Text.prototype = Object.create(TinyGame.BaseObject.prototype);
TinyGame.Text.prototype._Draw = function (context) {
    context.font = this.Size + " " + this.Font;
    context.fillStyle = this.Color;
    context.fillText(this.Text, this.Position.X, this.Position.Y);
};
TinyGame.Rect = function (x, y, width, height, color) {
    TinyGame.BaseObject.call(this, x, y);
    this._Type = "RECT";
    this.Width = width || 0;
    this.Height = height || 0;
    this.Color = color || "black";
};
TinyGame.Rect.prototype = Object.create(TinyGame.BaseObject.prototype);
TinyGame.Rect.prototype._Draw = function (context) {
    context.fillStyle = this.Color;
    context.fillRect(this.Position.X, this.Position.Y, this.Width, this.Height);
};