//	TinyGame.Math 
//		- Does math stuff 
TinyGame.Math = {
	Vectors: {
		Distance: function(obj_one, obj_two){
			var x, y, distance;
			x = obj_two.position.x - obj_one.position.x;
			y = obj_two.position.y - obj_one.position.y;
			return Math.sqrt(x * x + y * y);
		},
		Magnitude: function(v){
			var mag = (v.x * v.x) + (v.y * v.y);
			return Math.sqrt(mag);
		},
		DotProduct: function(v_one, v_two){
			return (v_one.x * v_two.x) + (v_one.y * v_two.y);
		},
		Normalize: function(v){},
		Length: function(v){}

	}
};