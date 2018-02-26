import find from './find';

export default class {
	constructor(aspect) {
		this.$aspect = aspect;
		this.$pixels = {};
		this.$minLeft = 0;
		this.$maxLeft = 0;
		this.$minTop = 0;
		this.$maxTop = 0;
	}

	get $left() {
		return Math.ceil((this.$maxLeft + this.$minLeft) / 2);
	}

	get $top() {
		return Math.ceil((this.$maxTop + this.$minTop) / 2);
	}

	get $width() {
		return this.$maxLeft - this.$minLeft;
	}

	get $height() {
		return this.$maxTop - this.$minTop;
	}

	$put(pixels, pixelsLeft, pixelsTop) {
		pixels.forEach(([pixelLeft, pixelTop]) => {
			let left = pixelsLeft + pixelLeft;
			let top = pixelsTop + pixelTop;
			this.$pixels[`${left}|${top}`] = true;
			this.$minLeft = Math.min(left, this.$minLeft);
			this.$maxLeft = Math.max(left, this.$maxLeft);
			this.$minTop = Math.min(top, this.$minTop);
			this.$maxTop = Math.max(top, this.$maxTop);
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
		return find(this.$aspect, [pixelsLeft + this.$left, pixelsTop + this.$top], ([pixelsLeft, pixelsTop]) => {
			return this.$canFit(pixels, pixelsLeft, pixelsTop);
		});
	}
}
