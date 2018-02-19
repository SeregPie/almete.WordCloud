import Geometry_getRotatedRectangleBoundingBoxHeight from 'x/src/Geometry/getRotatedRectangleBoundingBoxHeight';
import Geometry_getRotatedRectangleBoundingBoxWidth from 'x/src/Geometry/getRotatedRectangleBoundingBoxWidth';
import Math_ceilDivisible from 'x/src/Math/ceilDivisible';
import Math_degToTurn from 'x/src/Math/degToTurn';
import Math_radToTurn from 'x/src/Math/radToTurn';
import Math_turnToRad from 'x/src/Math/turnToRad';
import Math_turnToDeg from 'x/src/Math/turnToDeg';

export default class {
	constructor(
		text,
		weight,
		rotation,
		rotationUnit,
		fontStyle,
		fontVariant,
		fontWeight,
		fontSize,
		fontFamily,
		createCanvas,
	) {
		this.$text = text;
		this.$weight = weight;
		this.$rotationTurn = (() => {
			switch (rotationUnit) {
				case 'deg':
					return Math_degToTurn(rotation);
				case 'rad':
					return Math_radToTurn(rotation);
			}
			return rotation;
		})();
		this.$fontStyle = fontStyle;
		this.$fontVariant = fontVariant;
		this.$fontWeight = fontWeight;
		this.$fontSize = fontSize;
		this.$fontFamily = fontFamily;
		this.$_relativePadding = 0;
		this.$left = 0;
		this.$top = 0;
		this.$_createCanvas = createCanvas;
	}

	get $rotationDeg() {
		return Math_turnToDeg(this.$rotationTurn);
	}

	get $rotationRad() {
		return Math_turnToRad(this.$rotationTurn);
	}

	get $font() {
		return [
			this.$fontStyle,
			this.$fontVariant,
			this.$fontWeight,
			`${this.$fontSize}px`,
			this.$fontFamily,
		].join(' ');
	}

	$_getRelativeTextWidth() {
		let canvas = this.$_createCanvas.call();
		let ctx = canvas.getContext('2d');
		ctx.font = this.$font;
		let textWidth = ctx.measureText(this.$text).width;
		let relativeTextWidth = textWidth / this.$fontSize;
		return relativeTextWidth;
	}

	get $relativeTextWidth() {
		if (this.$_relativeTextWidth === undefined) {
			this.$_relativeTextWidth = this.$_getRelativeTextWidth();
		}
		return this.$_relativeTextWidth;
	}

	get $textWidth() {
		return this.$relativeTextWidth * this.$fontSize;
	}

	get $rectWidth() {
		return Geometry_getRotatedRectangleBoundingBoxWidth(
			this.$textWidth,
			this.$fontSize,
			this.$rotationRad,
		);
	}

	get $rectHeight() {
		return Geometry_getRotatedRectangleBoundingBoxHeight(
			this.$textWidth,
			this.$fontSize,
			this.$rotationRad,
		);
	}

	get $rectLeft() {
		return this.$left - this.$rectWidth / 2;
	}

	get $rectTop() {
		return this.$top - this.$rectHeight / 2;
	}

	get $relativePadding() {
		return this.$_relativePadding;
	}

	set $relativePadding(value) {
		if (this.$_relativePadding !== value) {
			this.$_relativePadding = value;
			this.$_imagePixels = undefined;
		}
	}

	get $padding() {
		return this.$relativePadding * this.$fontSize;
	}

	get $imageWidth() {
		return Math_ceilDivisible(Geometry_getRotatedRectangleBoundingBoxWidth(
			this.$textWidth + (this.$padding + this.$fontSize) * 2,
			this.$fontSize + (this.$padding + this.$fontSize) * 2,
			this.$rotationRad,
		), 2);
	}

	get $imageHeight() {
		return Math_ceilDivisible(Geometry_getRotatedRectangleBoundingBoxHeight(
			this.$textWidth + (this.$padding + this.$fontSize) * 2,
			this.$fontSize + (this.$padding + this.$fontSize) * 2,
			this.$rotationRad,
		), 2);
	}

	get $lineWidth() {
		return this.$padding * 2;
	}

	$_getImagePixels() {
		let canvas = this.$_createCanvas.call();
		let ctx = canvas.getContext('2d');
		canvas.width = this.$imageWidth;
		canvas.height = this.$imageHeight;
		ctx.translate(this.$imageWidth / 2, this.$imageHeight / 2);
		ctx.rotate(this.$rotationRad);
		ctx.font = this.$font;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(this.$text, 0, 0);
		if (this.$lineWidth > 0) {
			ctx.miterLimit = 1;
			ctx.lineWidth = this.$lineWidth;
			ctx.strokeText(this.$text, 0, 0);
		}
		let image = ctx.getImageData(0, 0, this.$imageWidth, this.$imageHeight).data;
		let imagePixels = [];
		for (let pixelLeft = 0; pixelLeft < this.$imageWidth; ++pixelLeft) {
			for (let pixelTop = 0; pixelTop < this.$imageHeight; ++pixelTop) {
				if (image[(this.$imageWidth * pixelTop + pixelLeft) * 4 + 3]) {
					imagePixels.push([pixelLeft, pixelTop]);
				}
			}
		}
		return imagePixels;
	}

	get $imagePixels() {
		if (this.$_imagePixels === undefined) {
			this.$_imagePixels = this.$_getImagePixels();
		}
		return this.$_imagePixels;
	}

	get $imageLeft() {
		return this.$left - this.$imageWidth / 2;
	}

	set $imageLeft(value) {
		this.$left = value + this.$imageWidth / 2;
	}

	get $imageTop() {
		return this.$top - this.$imageHeight / 2;
	}

	set $imageTop(value) {
		this.$top = value + this.$imageHeight / 2;
	}

	$scale(factor) {
		this.$fontSize *= factor;
		this.$left *= factor;
		this.$top *= factor;
		this.$_imagePixels = undefined;
	}
}
