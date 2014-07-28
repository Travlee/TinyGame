
//	#### GameObject Info ####
//	- havent decided yet

var test = {};
test.PreLoad = {
	Load: function(){
		game.Load.Image("Ninja", "assets/squareNinja.png");
	},
	Update: function(){
		if(game.Load.Completed()){
			game.States.Start('Main');
		}
	}
};
test.Main = {
	Initialize: function(){

		game.World.EnableBounds = true;

	 	block = game.Add.Rect(740, 3, 50, 50, 'green');
	 	// block.Velocity.X = 1;
	 	// block.Velocity.Y = 1;
		// block.Gravity.Y = .1;

		ninja = game.Add.Sprite('Ninja', 50, 50, 88, 88, {x:0, y:0, width:88, height:88});
		ninja.Gravity.Y = .6;
		ninja.Velocity.X = 1;

		blockText = this.Add.Text(block.Position.X, block.Position.Y, block.Distance(ninja), '10pt', "blue");

		ninja.Animations.Add("walk_right", {x:0, y:0, width:88, height:88, frames:5});

		ninja.Animations.Play("walk_right");
	},
	Update: function(){

		test.Main.BlockLogic();

		blockText.Position.X = block.Position.X;
		blockText.Position.Y = block.Position.Y - 1;
		blockText.Text = Math.round(block.Distance(ninja));

		//	Debugs stuff OBVIOUSLY
		test.Main.DebugText();
	},
	// Block logic goes here
	BlockLogic: function(){
		target = new TinyGame.Vector2d();
		target.X = ninja.Position.X - block.Position.X;
		target.Y = ninja.Position.Y - block.Position.Y;

		var norm = target.Normalize();

		if(block.Distance(ninja) > 1){
			block.Velocity = norm;
		}
		else{
			block.Velocity.X = 0;
			block.Velocity.Y = 0;
		}
	},

	//	DRAW FPS/DELTA TIME
	DebugText: function(){
		//	Debug Stuffs
		var output = document.getElementById('debug_stuffs');
		output.innerHTML = "DeltaTime: " + game.Time.Delta;
		output.innerHTML += "<br />FPS: " + game.Time.FPS;
		output.innerHTML += "<br />objects: " + game.Objects.Count();
		output.innerHTML += "<br />NINJA - BLOCK: " + block.Distance(ninja);
		output.innerHTML += "<br />BLOCK to NINJA: (x: " + Math.round(target.X) + ", y: " + Math.round(target.Y) + ")";
	}
};


var game = new TinyGame.Game(800, 500, 'container', test, 'PreLoad');


/*	Nonsense down here ##################################################################




*/