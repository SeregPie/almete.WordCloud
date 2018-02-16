export default function(
	text,
	lineWidth,
	font,
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
	let imagePixels = [];
	for (let pixelLeft = 0; pixelLeft < canvasWidth; ++pixelLeft) {
		for (let pixelTop = 0; pixelTop < canvasHeight; ++pixelTop) {
			if (image[(canvasWidth * pixelTop + pixelLeft) * 4 + 3]) {
				imagePixels.push([pixelLeft, pixelTop]);
			}
		}
	}
	return imagePixels;
}
