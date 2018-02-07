import toBitImage from './toBitImage';

export default function({text, rotationRad, font, rectWidth, rectHeight}, spacing, createCanvas) {
	let canvas = createCanvas();
	let ctx = canvas.getContext('2d');
	let imageWidth = 1 + rectWidth * 2;
	let imageHeight = 1 + rectHeight * 2;
	canvas.width = imageWidth;
	canvas.height = imageHeight;
	ctx.translate(imageWidth / 2, imageHeight / 2);
	ctx.rotate(rotationRad);
	ctx.font = font;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(text, 0, 0);
	if (spacing > 0) {
		ctx.miterLimit = 1;
		ctx.lineWidth = 2 * spacing;
		ctx.strokeText(text, 0, 0);
	}
	let image = ctx.getImageData(0, 0, imageWidth, imageHeight).data;
	image = toBitImage(image, imageWidth, imageHeight);
	return [
		image,
		imageWidth,
		imageHeight,
	];
}
