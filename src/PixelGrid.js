import InfinityInsideOutRectangeIterator from './InfinityInsideOutRectangeIterator';

export default class {
	constructor(aspect) {
		this.ǂaspect = aspect;
		this.ǂclear();
	}

	get ǂcenterLeft() {
		return Math.ceil((this.ǂminLeft + this.ǂmaxLeftWidth) / 2);
	}

	get ǂcenterTop() {
		return Math.ceil((this.ǂminTop + this.ǂmaxTopHeight) / 2);
	}

	get ǂwidth() {
		return this.ǂmaxLeftWidth - this.ǂminLeft;
	}

	get ǂheight() {
		return this.ǂmaxTopHeight - this.ǂminTop;
	}

	ǂput(image, left, top) {
		for (let pixelLeft = 0; pixelLeft < image.width; pixelLeft++) {
			for (let pixelTop = 0; pixelTop < image.height; pixelTop++) {
				if (image.data[(image.width * pixelTop + pixelLeft) * 4 + 3]) {
					let currentLeft = left + pixelLeft;
					let currentTop = top + pixelTop;
					this.ǂpixels[`${currentLeft}|${currentTop}`] = true;
					this.ǂminLeft = Math.min(currentLeft, this.ǂminLeft);
					this.ǂmaxLeftWidth = Math.max(currentLeft + 1, this.ǂmaxLeftWidth);
					this.ǂminTop = Math.min(currentTop, this.ǂminTop);
					this.ǂmaxTopHeight = Math.max(currentTop + 1, this.ǂmaxTopHeight);
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
		let offsetLeft = Math.floor(image.width / 2);
		let offsetTop = Math.floor(image.height / 2);
		return InfinityInsideOutRectangeIterator(
			this.ǂaspect,
			[this.ǂcenterLeft - offsetLeft, this.ǂcenterTop - offsetTop],
			([left, top]) => {
				return this.ǂfits(pixels, left, top);
			},
		);
	}

	ǂclear() {
		this.ǂpixels = {};
		this.ǂminLeft = 0;
		this.ǂmaxLeftWidth = 0;
		this.ǂminTop = 0;
		this.ǂmaxTopHeight = 0;
	}
}
