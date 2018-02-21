import findPixel from './findPixel';

export default class {
	constructor(aspect) {
		this.$_aspect = aspect;
		this.$_pixels = {};
	}

	$put(pixels, pixelsLeft, pixelsTop) {
		pixels.forEach(([pixelLeft, pixelTop]) => {
			let gridPixelLeft = pixelsLeft + pixelLeft;
			let gridPixelTop = pixelsTop + pixelTop;
			this.$_pixels[`${gridPixelLeft}|${gridPixelTop}`] = true;
		});
	}

	$canFit(pixels, pixelsLeft, pixelsTop) {
		return pixels.every(([pixelLeft, pixelTop]) => {
			let gridPixelLeft = pixelsLeft + pixelLeft;
			let gridPixelTop = pixelsTop + pixelTop;
			return !this.$_pixels[`${gridPixelLeft}|${gridPixelTop}`];
		});
	}

	$findFit(pixels, pixelsLeft, pixelsTop) {
		return findPixel(this.$_aspect, [pixelsLeft, pixelsTop], ([pixelsLeft, pixelsTop]) => {
			return this.$canFit(pixels, pixelsLeft, pixelsTop);
		});
	}
}
