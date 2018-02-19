import findPixel from './findPixel';

export default class {
	constructor(aspect) {
		this.$_aspect = aspect;
		this.$_grid = {};
	}

	$put(pixels, left, top) {
		pixels.forEach(([pixelLeft, pixelTop]) => {
			let gridPixelLeft = left + pixelLeft;
			let gridPixelTop = top + pixelTop;
			this.$_grid[`${gridPixelLeft}|${gridPixelTop}`] = true;
		});
	}

	$canFit(pixels, left, top) {
		return pixels.every(([pixelLeft, pixelTop]) => {
			let gridPixelLeft = left + pixelLeft;
			let gridPixelTop = top + pixelTop;
			return !this.$_grid[`${gridPixelLeft}|${gridPixelTop}`];
		});
	}

	$findFit(pixels, left, top) {
		return findPixel(this.$_aspect, [left, top], ([left, top]) => {
			return this.$canFit(pixels, left, top);
		});
	}
}
