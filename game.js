
//	#### GameObject Info ####
//	- havent decided yet

var test = {};
test.PreLoad = {
	load: function(){
		// game.load.image('shuriken', "assets/shuriken.png");
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
	 	shuriken = game.add.sprite('ninja', 720, 20, 20);
		shuriken.layer = 1;

		ninja = game.add.sprite('ninja', 0, 0);
		ninja.body.gravity.set(0, .6);
		ninja.body.enableBounds = true;
		ninja.body.velocity.set(1);


		shurikenText = this.add.text(shuriken.position.x, shuriken.position.y, shuriken.distance(ninja), '10pt', "blue");

		ninja.animations.add("walkRight", [0, 1, 2, 3, 4], 15, true);
		ninja.animations.add("die", [15, 16], 20, false);
		ninja.animations.add("throw", [5, 6], 20, true);

		ninja.animations.play("walkRight");
	},
	update: function(){

		test.Main.StarLogic();

		shurikenText.position.set(shuriken.position.x, shuriken.position.y);
		shurikenText.text = Math.floor(shuriken.position.distance(ninja.position));

		//	Debugs stuff OBVIOUSLY
		test.Main.DebugText();
	},
	NinjaDie: function(){
		ninja.animations.play("die");
		ninja.body.velocity.zero();
	},
	// Block logic goes here
	StarLogic: function(){
		var distance = shuriken.distance(ninja);
		var target = new TinyGame.Vector2(ninja.position.x - shuriken.position.x, ninja.position.y - shuriken.position.y);
		
		if(distance > 1){
			shuriken.body.velocity.set(target.normalize().multiply(4));

							
		}
		else{
			shuriken.body.velocity.zero();
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