
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

	 	block = game.Add.Rect(720, 20, 50, 50, 'green');
		// block.Body.Gravity.Y = .1;
		block.zIndex = 1;

		ninja = game.Add.Sprite('Ninja', 0, 0, 88, 88, {x:0, y:0, width:88, height:88, frames:1});
		ninja.Body.Gravity.Y = .6;
		ninja.Body.EnableBounds = true;
		ninja.Body.Velocity.X = 1;

		blockText = this.Add.Text(block.Position.X, block.Position.Y, block.Distance(ninja), '10pt', "blue");

		ninja.Add("walk_right", {x:0, y:0, width:88, height:88, frames:5, speed:75});
		ninja.Add("Die", {x:0, y:264, width:88, height:88, frames:2, repeat:false, speed:150});

		ninja.Play("walk_right");
	},
	Update: function(){

		test.Main.BlockLogic();

		blockText.Position.X = block.Position.X;
		blockText.Position.Y = block.Position.Y - 1;
		blockText.Text = Math.round(block.Distance(ninja));

		//	Debugs stuff OBVIOUSLY
		test.Main.DebugText();
	},
	NinjaDie: function(){
		ninja.Play("Die");
		ninja.Body.Velocity.X = 0;
	},
	// Block logic goes here
	BlockLogic: function(){
		target = new TinyGame.Vector2d();
		target.X = ninja.Position.X - block.Position.X;
		target.Y = ninja.Position.Y - block.Position.Y;

		var norm = target.Normalize();
		var distance = block.Distance(ninja);

		
		if(distance > 1){
			block.Body.Velocity = norm;				
		}
		else{
			block.Body.Velocity.X = 0;
			block.Body.Velocity.Y = 0;
			test.Main.NinjaDie();
			game.Objects.Remove(block);
			game.Text.Remove(blockText);
		}
	},

	//	DRAW FPS/DELTA TIME
	DebugText: function(){
		//	Debug Stuffs
		var output = document.getElementById('debug_stuffs');
		output.innerHTML = "DeltaTime: " + game.Time.Delta;
		output.innerHTML += "<br />FPS: " + game.Time.FPS;
		output.innerHTML += "<br />objects: " + game.Objects.Count();
		output.innerHTML += "<br />text objects: " + game.Text.Count();
	}
};


var game = new TinyGame.Game(800, 500, 'container', test, 'PreLoad');


/*	Nonsense down here ##################################################################
*/