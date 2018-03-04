import findPixel from './findPixel';

export default class {
	constructor(aspect) {
		this.ǂaspect = aspect;
		this.ǂclear();
	}

	get ǂleft() {
		return Math.ceil((this.ǂminLeft + this.ǂmaxLeftWidth) / 2);
	}

	get ǂtop() {
		return Math.ceil((this.ǂminTop + this.ǂmaxTopHeight) / 2);
	}

	get ǂwidth() {
		return this.ǂmaxLeftWidth - this.ǂminLeft;
	}

	get ǂheight() {
		return this.ǂmaxTopHeight - this.ǂminTop;
	}

	ǂput(pixels, pixelsLeft, pixelsTop) {
		pixels.forEach(([pixelLeft, pixelTop]) => {
			let left = pixelsLeft + pixelLeft;
			let top = pixelsTop + pixelTop;
			this.ǂpixels[`${left}|${top}`] = true;
			this.ǂminLeft = Math.min(left, this.ǂminLeft);
			this.ǂmaxLeftWidth = Math.max(left + 1, this.ǂmaxLeftWidth);
			this.ǂminTop = Math.min(top, this.ǂminTop);
			this.ǂmaxTopHeight = Math.max(top + 1, this.ǂmaxTopHeight);
		});
	}

	ǂcanFit(pixels, pixelsLeft, pixelsTop) {
		return pixels.every(([pixelLeft, pixelTop]) => {
			let left = pixelsLeft + pixelLeft;
			let top = pixelsTop + pixelTop;
			return !this.ǂpixels[`${left}|${top}`];
		});
	}

	ǂfindFit(pixels, pixelsLeft, pixelsTop) {
		return findPixel(this.ǂaspect, [pixelsLeft + this.ǂleft, pixelsTop + this.ǂtop], ([pixelsLeft, pixelsTop]) => {
			return this.ǂcanFit(pixels, pixelsLeft, pixelsTop);
		});
	}

	ǂclear() {
		this.ǂpixels = {};
		this.ǂminLeft = 0;
		this.ǂmaxLeftWidth = 0;
		this.ǂminTop = 0;
		this.ǂmaxTopHeight = 0;
	}
}
