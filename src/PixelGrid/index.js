import findPixel from './findPixel';

export default class {
	constructor(aspect) {
		this.$aspect = aspect;
		this.$clear();
	}

	get $left() {
		return Math.ceil((this.$minLeft + this.$maxLeftWidth) / 2);
	}

	get $top() {
		return Math.ceil((this.$minTop + this.$maxTopHeight) / 2);
	}

	get $width() {
		return this.$maxLeftWidth - this.$minLeft;
	}

	get $height() {
		return this.$maxTopHeight - this.$minTop;
	}

	$put(pixels, pixelsLeft, pixelsTop) {
		pixels.forEach(([pixelLeft, pixelTop]) => {
			let left = pixelsLeft + pixelLeft;
			let top = pixelsTop + pixelTop;
			this.$pixels[`${left}|${top}`] = true;
			this.$minLeft = Math.min(left, this.$minLeft);
			this.$maxLeftWidth = Math.max(left + 1, this.$maxLeftWidth);
			this.$minTop = Math.min(top, this.$minTop);
			this.$maxTopHeight = Math.max(top + 1, this.$maxTopHeight);
		});
	}

	$canFit(pixels, pixelsLeft, pixelsTop) {
		return pixels.every(([pixelLeft, pixelTop]) => {
			let left = pixelsLeft + pixelLeft;
			let top = pixelsTop + pixelTop;
			return !this.$pixels[`${left}|${top}`];
		});
	}

	$findFit(pixels, pixelsLeft, pixelsTop) {
		return findPixel(this.$aspect, [pixelsLeft + this.$left, pixelsTop + this.$top], ([pixelsLeft, pixelsTop]) => {
			return this.$canFit(pixels, pixelsLeft, pixelsTop);
		});
	}

	$clear() {
		this.$pixels = {};
		this.$minLeft = 0;
		this.$maxLeftWidth = 0;
		this.$minTop = 0;
		this.$maxTopHeight = 0;
	}
}
