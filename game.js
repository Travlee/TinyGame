
//	#### GameObject Info ####
//	- havent decided yet

var test = {};
test.PreLoad = {
	load: function(){
		game.load.spriteSheet("ninja", "assets/squareNinja.png", 88, 88);
	},
	update: function(){
		if(game.load.completed()){
			game.states.start('Main');
		}
	}
};
test.Main = {
	initialize: function(){
	 	star = game.add.sprite("ninja", 720, 20, 20);
		star.zIndex = 1;

		ninja = game.add.sprite('ninja', 0, 0, 20);
		ninja.body.gravity.y = .6;
		ninja.body.enableBounds = true;
		ninja.body.velocity.x = 1;

		starText = this.add.text(star.position.x, star.position.y, star.distance(ninja), '10pt', "blue");

		ninja.animations.add("walkRight", [0, 1, 2, 3, 4], 30, true);
		ninja.animations.add("die", [15, 16], 20, false);
		ninja.animations.add("throw", [5, 6], 20, true);

		ninja.animations.play("walkRight");
	},
	update: function(){

		test.Main.StarLogic();

		starText.position.x = star.position.x;
		starText.position.y = star.position.y - 1;
		starText.text = Math.round(star.distance(ninja));

		//	Debugs stuff OBVIOUSLY
		test.Main.DebugText();
	},
	NinjaDie: function(){
		ninja.animations.play("die");
		ninja.body.velocity.x = 0;
	},
	// Block logic goes here
	StarLogic: function(){
		target = new TinyGame.Vector2d();
		target.x = ninja.position.x - star.position.x;
		target.y = ninja.position.y - star.position.y;

		var norm = target.normalize();
		var distance = star.distance(ninja);

		
		if(distance > 1){
			star.body.velocity = norm;				
		}
		else{
			star.body.velocity.X = 0;
			star.body.velocity.Y = 0;
			test.Main.NinjaDie();
			game.objects.remove(star);
			game.text.remove(starText);
		}
	},

	//	DRAW FPS/DELTA TIME
	DebugText: function(){
		//	Debug Stuffs
		var output = document.getElementById('debug_stuffs');
		output.innerHTML = "DeltaTime: " + game.time.delta;
		output.innerHTML += "<br />FPS: " + game.time.fps;
		output.innerHTML += "<br />objects: " + game.objects.count();
		output.innerHTML += "<br />text objects: " + game.text.count();
	}
};


var game = new TinyGame.Game(800, 500, 'container', test, 'PreLoad');


/*	Nonsense down here ##################################################################
*/