import InfinityInsideOutRectangeIterator from './InfinityInsideOutRectangeIterator';

export default class {
	constructor(aspect) {
		this.ǂaspect = aspect;
		this.ǂclear();
	}

	get ǂcenterLeft() {
		return Math.floor((this.ǂminLeft + this.ǂmaxLeft) / 2);
	}

	get ǂcenterTop() {
		return Math.floor((this.ǂminTop + this.ǂmaxTop) / 2);
	}

	get ǂwidth() {
		return this.ǂmaxLeft - this.ǂminLeft + 1;
	}

	get ǂheight() {
		return this.ǂmaxTop - this.ǂminTop + 1;
	}

	ǂput(image, left, top) {
		for (let pixelLeft = 0; pixelLeft < image.width; pixelLeft++) {
			for (let pixelTop = 0; pixelTop < image.height; pixelTop++) {
				if (image.data[(image.width * pixelTop + pixelLeft) * 4 + 3]) {
					let currentLeft = left + pixelLeft;
					let currentTop = top + pixelTop;
					this.ǂpixels[`${currentLeft}|${currentTop}`] = true;
					this.ǂminLeft = Math.min(currentLeft, this.ǂminLeft);
					this.ǂminTop = Math.min(currentTop, this.ǂminTop);
					this.ǂmaxLeft = Math.max(currentLeft, this.ǂmaxLeft);
					this.ǂmaxTop = Math.max(currentTop, this.ǂmaxTop);
				}
			}
		}
	}

	ǂfits(pixels, left, top) {
		return pixels.every(([pixelLeft, pixelTop]) => {
			let currentLeft = left + pixelLeft;
			let currentTop = top + pixelTop;
			return !this.ǂpixels[`${currentLeft}|${currentTop}`];
		});
	}

	ǂfindFit(image) {
		let pixels = [];
		for (let pixelLeft = 0; pixelLeft < image.width; pixelLeft++) {
			for (let pixelTop = 0; pixelTop < image.height; pixelTop++) {
				if (image.data[(image.width * pixelTop + pixelLeft) * 4 + 3]) {
					pixels.push([pixelLeft, pixelTop]);
				}
			}
		}
		if (pixels.length > 0) {
			let [minPixelLeft, minPixelTop] = pixels.reduce(([minPixelLeft, minPixelTop], [pixelLeft, pixelTop]) =>
				[Math.min(pixelLeft, minPixelLeft), Math.min(pixelTop, minPixelTop)]
			);
			let [maxPixelLeft, maxPixelTop] = pixels.reduce(([maxPixelLeft, maxPixelTop], [pixelLeft, pixelTop]) =>
				[Math.max(pixelLeft, maxPixelLeft), Math.max(pixelTop, maxPixelTop)]
			);
			pixels = pixels.map(([pixelLeft, pixelTop]) =>
				[pixelLeft - minPixelLeft, pixelTop - minPixelTop]
			);
			let [left, top] = InfinityInsideOutRectangeIterator(
				this.ǂaspect,
				[
					Math.floor((this.ǂminLeft + this.ǂmaxLeft + minPixelLeft - maxPixelLeft) / 2),
					Math.floor((this.ǂminTop + this.ǂmaxTop + minPixelTop - maxPixelTop) / 2),
				],
				([left, top]) => this.ǂfits(pixels, left, top),
			);
			return [left - minPixelLeft, top - minPixelTop];
		}
		return [0, 0];
	}

	ǂclear() {
		this.ǂpixels = {};
		this.ǂminLeft = 1;
		this.ǂmaxLeft = 0;
		this.ǂminTop = 1;
		this.ǂmaxTop = 0;
	}
}
