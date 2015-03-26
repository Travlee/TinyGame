//	TinyGame.Math 
//		- Does math stuff 
TinyGame.Math = {
	Vectors: {
		Distance: function(obj_one, obj_two){
			var x, y, distance;
			x = obj_two.Position.X - obj_one.Position.X;
			y = obj_two.Position.Y - obj_one.Position.Y;
			return Math.sqrt(x * x + y * y);
		},
		Magnitude: function(v){
			var mag = (v.X * v.X) + (v.Y * v.Y);
			return Math.sqrt(mag);
		},
		DotProduct: function(v_one, v_two){
			return (v_one.X * v_two.X) + (v_one.Y * v_two.Y);
		},
		Normalize: function(v){},
		Length: function(v){}

	}
};