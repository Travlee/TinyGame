
//	#### GameObject Info ####
//	- havent decided yet

var test = {};
test.PreLoad = {
	load: function(){
		game.load.image('shuriken', "assets/shuriken.png");
		game.load.spriteSheet('ninja', "assets/square-ninja.png", 88, 88);
	},
	update: function(){
		if(game.load.completed){
			game.states.start('Main');
		}
	}
};
test.Main = {
	initialize: function(){
	 	shuriken = game.add.sprite('shuriken', 720, 20);
		shuriken.zIndex = 1;

		ninja = game.add.sprite('ninja', 0, 0);
		ninja.body.gravity.y = .6;
		ninja.body.enableBounds = true;
		ninja.body.velocity.x = 1;


		shurikenText = this.add.text(shuriken.position.x, shuriken.position.y, shuriken.distance(ninja), '10pt', "blue");

		ninja.animations.add("walkRight", [0, 1, 2, 3, 4], 15, true);
		ninja.animations.add("die", [15, 16], 20, false);
		ninja.animations.add("throw", [5, 6], 20, true);

		ninja.animations.play("walkRight");
	},
	update: function(){

		test.Main.StarLogic();

		shurikenText.position.x = shuriken.position.x;
		shurikenText.position.y = shuriken.position.y - 1;
		shurikenText.text = Math.round(shuriken.distance(ninja));

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
		target.x = ninja.position.x - shuriken.position.x;
		target.y = ninja.position.y - shuriken.position.y;

		var norm = target.normalize();
		var distance = shuriken.distance(ninja);

		
		if(distance > 1){
			shuriken.body.velocity = norm;				
		}
		else{
			shuriken.body.velocity.X = 0;
			shuriken.body.velocity.Y = 0;
			test.Main.NinjaDie();
			shuriken.kill();
			shurikenText.kill();
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