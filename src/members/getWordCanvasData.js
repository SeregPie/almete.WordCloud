import D2_rotateRect  from '../helpers/D2/rotateRect';
import Math_turnToRad from '../helpers/Math/turnToRad';

import getFont from './getFont';
import toBitImage from './toBitImage';
import trimBitImage from './trimBitImage';

export default function(
	text,
	fontStyle,
	fontVariant,
	fontWeight,
	fontSize,
	fontFamily,
	rotation,
	createCanvas,
) {
	rotation = Math_turnToRad(rotation);
	let font = getFont(fontStyle, fontVariant, fontWeight, fontSize, fontFamily);
	let canvas = createCanvas();
	let ctx = canvas.getContext('2d');
	ctx.font = font;
	let textWidth = ctx.measureText(text).width;
	let letterSize = Math.max(ctx.measureText('m').width, fontSize);
	let [rectWidth, rectHeight] = D2_rotateRect(textWidth, fontSize, rotation);
	let imageWidth = rectWidth + letterSize * 4;
	let imageHeight = rectHeight + letterSize * 4;
	canvas.width = imageWidth;
	canvas.height = imageHeight;
	ctx.translate(imageWidth / 2, imageHeight / 2);
	ctx.rotate(rotation);
	ctx.font = font;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(text, 0, 0);
	let image = ctx.getImageData(0, 0, imageWidth, imageHeight).data;
	image = toBitImage(image, imageWidth, imageHeight);
	//([image, imageWidth, imageHeight] = trimBitImage(image, imageWidth, imageHeight));
	return [
		textWidth,
		rectWidth,
		rectHeight,
		image,
		imageWidth,
		imageHeight,
	];
}
