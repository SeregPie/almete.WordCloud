export default function(
	text,
	font,
	lineWidth,
	rotation,
	canvasWidth,
	canvasHeight,
	createCanvas,
) {
	let canvas = createCanvas();
	let ctx = canvas.getContext('2d');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx.translate(canvasWidth / 2, canvasHeight / 2);
	ctx.rotate(rotation);
	ctx.font = font;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(text, 0, 0);
	if (lineWidth > 0) {
		ctx.miterLimit = 1;
		ctx.lineWidth = lineWidth;
		ctx.strokeText(text, 0, 0);
	}
	let image = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
	return image;
}
