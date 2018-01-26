import Math_turnToRad from '../helpers/Math/turnToRad';

export default function(
	text,
	fontStyle,
	fontVariant,
	fontWeight,
	fontSize,
	fontFamily,
	imageWidth,
	imageHeight,
	rotation,
) {
	rotation = Math_turnToRad(rotation);
	let font = [fontStyle, fontVariant, fontWeight, `${fontSize}px`, fontFamily].join(' ');
	let canvas = document.createElement('canvas');
	canvas.width = imageWidth;
	canvas.height = imageHeight;
	let ctx = canvas.getContext('2d');
	ctx.translate(imageWidth / 2, imageHeight / 2);
	ctx.rotate(rotation);
	ctx.font = font;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(text, 0, 0);
	ctx.miterLimit = 1;
	ctx.lineWidth = 3;
	ctx.strokeText(text, 0, 0);
	let pixelImage = new Uint8Array(imageWidth * imageHeight);
	let image = ctx.getImageData(0, 0, imageWidth, imageHeight).data;
	for (let i = 0, ii = image.length; i < ii; ++i) {
		pixelImage[i] = image[i * 4 + 3];
	}
	return pixelImage;
}
