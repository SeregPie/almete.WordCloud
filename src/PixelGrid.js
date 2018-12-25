import InfinityInsideOutRectangeIterator from './InfinityInsideOutRectangeIterator';

export default class {
	constructor(aspect) {
		this._aspect = aspect;
		this._clear();
	}

	get _centerLeft() {
		return Math.floor((this._minLeft + this._maxLeft) / 2);
	}

	get _centerTop() {
		return Math.floor((this._minTop + this._maxTop) / 2);
	}

	get _width() {
		return this._maxLeft - this._minLeft + 1;
	}

	get _height() {
		return this._maxTop - this._minTop + 1;
	}

	_put(image, left, top) {
		for (let pixelLeft = 0; pixelLeft < image.width; pixelLeft++) {
			for (let pixelTop = 0; pixelTop < image.height; pixelTop++) {
				if (image.data[(image.width * pixelTop + pixelLeft) * 4 + 3]) {
					let currentLeft = left + pixelLeft;
					let currentTop = top + pixelTop;
					this._pixels[`${currentLeft}|${currentTop}`] = true;
					this._minLeft = Math.min(currentLeft, this._minLeft);
					this._minTop = Math.min(currentTop, this._minTop);
					this._maxLeft = Math.max(currentLeft, this._maxLeft);
					this._maxTop = Math.max(currentTop, this._maxTop);
				}
			}
		}
	}

	_fits(pixels, left, top) {
		return pixels.every(([pixelLeft, pixelTop]) => {
			let currentLeft = left + pixelLeft;
			let currentTop = top + pixelTop;
			return !this._pixels[`${currentLeft}|${currentTop}`];
		});
	}

	_findFit(image) {
		let pixels = [];
		for (let pixelLeft = 0; pixelLeft < image.width; pixelLeft++) {
			for (let pixelTop = 0; pixelTop < image.height; pixelTop++) {
				if (image.data[(image.width * pixelTop + pixelLeft) * 4 + 3]) {
					pixels.push([pixelLeft, pixelTop]);
				}
			}
		}
		if (pixels.length) {
			let [minPixelLeft, minPixelTop] = pixels.reduce(([minPixelLeft, minPixelTop], [pixelLeft, pixelTop]) =>
				[Math.min(pixelLeft, minPixelLeft), Math.min(pixelTop, minPixelTop)]
			);
			let [maxPixelLeft, maxPixelTop] = pixels.reduce(([maxPixelLeft, maxPixelTop], [pixelLeft, pixelTop]) =>
				[Math.max(pixelLeft, maxPixelLeft), Math.max(pixelTop, maxPixelTop)]
			);
			let trimmedPixels = pixels.map(([pixelLeft, pixelTop]) =>
				[pixelLeft - minPixelLeft, pixelTop - minPixelTop]
			);
			let trimmedImageWidth = maxPixelLeft - minPixelLeft + 1;
			let trimmedImageHeight = maxPixelTop - minPixelTop + 1;
			let [left, top] = InfinityInsideOutRectangeIterator(
				this._aspect,
				[
					this._centerLeft - Math.floor(trimmedImageWidth / 2),
					this._centerTop - Math.floor(trimmedImageHeight / 2),
				],
				([left, top]) => this._fits(trimmedPixels, left, top),
			);
			return [left - minPixelLeft, top - minPixelTop];
		}
		return [0, 0];
	}

	_clear() {
		this._pixels = {};
		this._minLeft = 1;
		this._minTop = 1;
		this._maxLeft = 0;
		this._maxTop = 0;
	}
}
