import D2_rotateRect from '../helpers/D2/rotateRect';
import Math_turnToRad from '../helpers/Math/turnToRad';

export default function(
	text,
	fontStyle,
	fontVariant,
	fontWeight,
	fontSize,
	fontFamily,
	rotation,
) {
	rotation = Math_turnToRad(rotation);
	let font = [fontStyle, fontVariant, fontWeight, `${fontSize}px`, fontFamily].join(' ');
	let ctx = document.createElement('canvas').getContext('2d');
	ctx.font = font;
	let textWidth = ctx.measureText(text).width;
	let textHeight = fontSize;
	let [rectWidth, rectHeight] = D2_rotateRect(textWidth, textHeight, rotation);
	return [textWidth, textHeight, rectWidth, rectHeight];
}
