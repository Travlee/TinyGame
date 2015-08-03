console.log("FILE: 'game.js'");

//	#### GameObject Info ####
//	So, your gameobject can include a Load callback, OnLoading state, and as many other states 
//	your game may need. Load/OnLoading are optional.
//	It can also be as simple as Load/Initialize/Update and Draw callbacks 

var test = {};
test.PreLoad = {
    Load: function () {
        game.Load.Image("Ninja", "assets/squareNinja.png");
    },
    Update: function () {
        if (game.Load.Completed()) {
            game.States.Start('Main');
        }
    }
};
test.Main = {
    Initialize: function () {

        game.World.EnableBounds = true;

        block = game.Add.Rect(740, 3, 50, 50, 'green');
        //block.Gravity.Y = .2;
        //blockTwo = game.Add.Rect(200, 3, 50, 50, 'blue');
        

        ninja = game.Add.Sprite('Ninja', 50, 50, 88, 88, { x: 0, y: 0, width: 88, height: 88 });
        ninja.Gravity.Y = 0.6;
        ninja.Velocity.X = 0.2;
        game.World.Collisions.Add(ninja, [block], test.Main.NinjaImpact);
        // block.MoveTo(ninja, 10);
        //blockTwo.MoveTo([700, 200], 8);


        blockText = this.Add.Text(block.Position.X, block.Position.Y, block.Distance(ninja), '10pt', "blue");

        //  still havent implemented working animations - pls fix
        ninja.Animations.Add("walk_right", { x: 0, y: 0, width: 88, height: 88, frames: 5 });

        ninja.Animations.Play("walk_right");

    },
    Update: function () {

        test.Main.BlockLogic();

        blockText.Position.X = block.Position.X;
        blockText.Position.Y = block.Position.Y - 1;
        blockText.Text = Math.round(block.Distance(ninja));

        //	Debugs stuff OBVIOUSLY
        test.Main.DebugText();
    },
    // Block logic goes here
    BlockLogic: function () {


        // Moves the blockTwo to Ninja
        //blockTwo.MoveTo(ninja, 3);

        // Moves block to ninja
        //block.MoveTo(ninja, .5);
    },

    //	DRAW FPS/DELTA TIME
    DebugText: function () {
        //	Debug Stuffs
        var output = document.getElementById('debug_stuffs');
        output.innerHTML = "DeltaTime: " + game.Time.Delta;
        output.innerHTML += "<br />FPS: " + game.Time.FPS;
        output.innerHTML += "<br />objects: " + game.Objects.Count();
        output.innerHTML += "<br />NINJA - BLOCK: " + block.Distance(ninja);
        //output.innerHTML += "<br />BLOCK to NINJA: (x: " + Math.round(target.X) + ", y: " + Math.round(target.Y) + ")";
    },
    NinjaImpact: function () {
        console.log("Ninja Hit");
    }
};


var game = new TinyGame.Game(800, 500, 'container', test, 'PreLoad');


/*	Nonsense down here ##################################################################




*/