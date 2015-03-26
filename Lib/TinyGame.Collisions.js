
//  TinyGame.Collisions()
//      - Caller: TinyGame.World
//      - Calls: TinyGame.QuadTree
//      - Args: TinyGame.Game <Object>
//      - Returns: <Null>
TinyGame.Collisions = function (game) {
    this._Game = game;
    this._Canvas = game.Scene.Canvas;
    this._CollisionObjects = [];
};

TinyGame.Collisions.prototype._Update = function () {
    
    //  Populate a local variable of objects to throw into the quadtree
    var _Objects = [];

    //  Loop each collision object
    for (var collisions in this._CollisionObjects) {

        var obj = this._CollisionObjects[collisions][0],
            objList = this._CollisionObjects[collisions][1],
            callback = this._CollisionObjects[collisions][2];

        //console.log(callback);

        //  If the collisions object is a list, add all to quadtree
        if (typeof objList === 'object') {
            for(var index in objList){
                _Objects.push(objList[index]);
            }
        } else {
            _Objects.push(objList);
        }

    }

};

//  TinyGame.Collisions.Add() - Public
//      - Caller: User
//      - Args: (obj, [listObjects] || object)
//          - Arg0: First object, master object
//          - Arg1: List, or single, object to check for collisions against.
TinyGame.Collisions.prototype.Add = function (obj, objects, callback) {
    this._CollisionObjects.push([obj, objects, callback]);
};

//  TinyGame.Collisions._Remove
//      - WARNING: Not tested, almost definitely doesn't work as intended!!
//      - Notes: Perhaps add a delete object queue in the collisions update method, 
//                  so to avoid removing objects while iterating through.
TinyGame.Collisions.prototype._Remove = function (obj) {
    for(var i = 0, len = this._CollisionObjects.length; i < len; i++) {
        if (this._CollisionObjects[i][0] === obj) {
            this._CollisionObjects.splice(i, 1);
        }
    }
    
};

//  TinyGame.QuadTree(game)
//      - Caller: TinyGame.Collisions
//      - Calls: TinyGame.Node
//      - Args: TinyGame.Game; Object
//      - Returns: null
TinyGame.QuadTree = function (bounds) {

    //  Bounds of Quadtree; Array [Width, Height]
    this._Bounds = bounds || [0,0];
    this._Nodes = []; // needs to be initialized
    this._NodeMaxObjects = 4; // Max objects in each node
    this._NodeTreeMaxSplits = 2; // Max times nodes can be split
    // collision class that puts objects into quadtree when adding collisions objects?

};

TinyGame.QuadTree.prototype._Update = function () {

};
TinyGame.QuadTree.prototype._Insert = function () {

};
TinyGame.QuadTree.prototype._Retrieve = function () {

};

//  TinyGame.Node()
//      - Caller: QuadTree
//      - Args: Boundaries; Height, Width;
TinyGame.Node = function (height, width) {
    this.Height = height || 0;
    this.Width = width || 0;
    this._Objects = [];

};
TinyGame.Node.prototype._Split = function () {

};

// Old Code, reference only
function QuadTree(canvas) {

    var maxSplits = 2,
		objects = [],
		possibleCollisions = [];

    this.run = function () {
        // Can't collide with shit if there's not at least 2 objects 
        if (!objects.length >= 2) return false;

        // Get inital quad
        var quad = getQuad(new Bounds(canvas.w / 2, canvas.h / 2), objects);

        // loops each index in quad to check if subnodes are needed
        for (var index in quad.index) {
            splitQuad(quad, quad[index]);
        }
    };
    this.Insert = function (obj) {
        objects.push(obj);
    };

    this.Remove = function (obj) {
        for (var index in objects) {
            if (objects[index] === obj) {
                objects.splice(index, 1);
                break;
            }
        }
    };
    var getQuad = function (bounds, objects) {
        var quad = new Quad(bounds);
        for (var i = 0, count = objects.length; i < count; i++) {
            var obj = objects[i];
            if (obj.pos.x >= bounds.Left) {
                if (obj.pos.y <= bounds.Top) {
                    quad.index.one.push(obj);	// Top-Right
                }
                else {
                    quad.index.two.push(obj);	// Bottom-Right
                }
            }
            else {
                if (obj.pos.y <= bounds.Left) {
                    quad.index.three.push(obj);	// Top-Left
                }
                else {
                    quad.index.four.push(obj);	// Bottom-Left 
                }
            }
        }
        return quad;
    };
    var splitQuad = function (quad, index) {

        for (var i = 0; i < maxSplits; i++) {
            var subQuad = getQuad(new Bounds(quad.bounds.left / 2, quad.bounds.top / 2), index);
            if (!node.objects.length >= 2) break;



        }

    };
    var checkNodes = function () {


        var bounds = new Bounds(canvas.w / 2, canvas.h / 2);
        var nodes = split(bounds, this.objects);
        for (var node in nodes) {
            if (typeof node === 'function') break;
            if (nodes[node].length >= 2) {
                var subBounds = new Bounds(bounds.left / 2, bounds.top / 2);
                var subNodes = getNodes(subBounds, nodes[node]);
                for (var subNode in subNodes) {
                    if (typeof subNode === 'function') break;
                    if (subNodes[subNode].length >= 2) possibleCollisions.push(subNodes[subNode]);
                }

            }
        }
    };
}