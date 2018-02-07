export default function({text, font}, createCanvas) {
	let canvas = createCanvas();
	let ctx = canvas.getContext('2d');
	ctx.font = font;
	let textWidth = ctx.measureText(text).width;
	return textWidth;
}
