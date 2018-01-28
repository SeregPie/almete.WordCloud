import getFont from './getFont';

export default function(
	text,
	fontStyle,
	fontVariant,
	fontWeight,
	fontSize,
	fontFamily,
	createCanvas,
) {
	let font = getFont(fontStyle, fontVariant, fontWeight, fontSize, fontFamily);
	let ctx = createCanvas().getContext('2d');
	ctx.font = font;
	return ctx.measureText(text).width;
}
