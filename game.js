
//	#### GameObject Info ####
//	- havent decided yet

var test = {};
test.PreLoad = {
	load: function(){
		game.load.image('shuriken', "assets/shuriken.png");
		game.load.spriteSheet('ninja', "assets/square-ninja.png", 72, 72);
	},
	update: function(){
		if(game.load.completed){
			game.states.start('Main');
		}
	}
};
test.Main = {
	initialize: function(){
	 	shuriken = game.add.sprite('shuriken', 720, 20, 20);
		shuriken.layer = 1;

		ninja = game.add.sprite('ninja', 0, 0);
		ninja.body.gravity.setY(1);
		ninja.body.collideBounds = true;
		ninja.body.velocity.setX(1);
		ninja.body.bounce.setY(.2);

		// ninja.body.overlap(shuriken, test.Main.NinjaHit);

		ninja.body.overlap(shuriken, test.Main.NinjaHit);

		shurikenText = game.add.text(shuriken.position.x, shuriken.position.y, shuriken.position.distance(ninja.position), '10pt', "blue");

		ninja.animations.add("walkRight", [0, 1, 2, 3, 4], 15, true);
		ninja.animations.add("die", [7, 8], 20, false);
		ninja.animations.add("throw", [5, 6], 20, true);

		ninja.animations.play("walkRight");
	},
	update: function(){

		test.Main.ShurikenLogic();

		shurikenText.position.set(shuriken.position.x, shuriken.position.y);
		shurikenText.text = Math.floor(shuriken.position.distance(ninja.position));

		//	Debugs stuff OBVIOUSLY
		test.Main.DebugText();
	},
	NinjaHit: function(ninja, shuriken){
		test.Main.ShurikenDie();
		ninja.animations.play("die");
		ninja.body.velocity.zero();
		ninja.body.bounce.zero();
	},
	// Block logic goes here
	ShurikenLogic: function(){
		var distance = shuriken.position.distance(ninja.position);
		var target = new TinyGame.Vector2((ninja.position.x + (ninja.body.width/2)) - (shuriken.position.x + (shuriken.body.width/2)), (ninja.position.y + (ninja.body.height/2)) - (shuriken.position.y + (shuriken.body.height/2)));
		
		shuriken.body.velocity.set(target.normalize().multiply(5));				
	},
	ShurikenDie: function(){
		shuriken.kill();
		shurikenText.kill();
	},

	//	DRAW FPS/DELTA TIME
	DebugText: function(){
		//	Debug Stuffs
		var output = document.getElementById('debug_stuffs');
		output.innerHTML = "DeltaTime: " + game.time.delta;
		output.innerHTML += "<br />FPS: " + game.time.fps;
		output.innerHTML += "<br />objects: " + game.objects.count();
	}
};


var game = new TinyGame.Game(800, 500, 'container', test, 'PreLoad');


/*	Nonsense down here ##################################################################
*/