import D2_rotateRect  from '../helpers/D2/rotateRect';

import toBitImage from './toBitImage';

export default function({text, font, fontSize, rotationRad}, spacing, createCanvas) {
	let canvas = createCanvas();
	let ctx = canvas.getContext('2d');
	ctx.font = font;
	let textWidth = ctx.measureText(text).width;
	let textHeight = fontSize;
	let [rectWidth, rectHeight] = D2_rotateRect(textWidth, textHeight, rotationRad);
	let generousLetterSize = Math.max(ctx.measureText('m').width, fontSize);
	let generousTextWidth = textWidth + generousLetterSize * 2;
	let generousTextHeight = textHeight + generousLetterSize * 2;
	let [imageWidth, imageHeight] = D2_rotateRect(generousTextWidth, generousTextHeight, rotationRad);
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
		textWidth,
		rectWidth,
		rectHeight,
		image,
		imageWidth,
		imageHeight,
	];
}
