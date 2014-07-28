//	TinyGame.Canvas() - Object
TinyGame.Canvas = function(width, height, parent_id, id){
	var canvas = document.createElement('canvas');
	canvas.id = id || 'TinyCanvas-Canvas-Canvas';
	canvas.width = width;
	canvas.height = height;
	if(!parent_id) { document.body.appendChild(canvas); }
	else { document.getElementById(parent_id).appendChild(canvas); }
	return canvas;
};