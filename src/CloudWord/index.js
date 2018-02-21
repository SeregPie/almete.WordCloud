import Geometry_getRotatedRectangleBoundingBoxHeight from 'x/src/Geometry/getRotatedRectangleBoundingBoxHeight';
import Geometry_getRotatedRectangleBoundingBoxWidth from 'x/src/Geometry/getRotatedRectangleBoundingBoxWidth';
import Math_ceilDivisible from 'x/src/Math/ceilDivisible';
import Math_degToTurn from 'x/src/Math/degToTurn';
import Math_radToTurn from 'x/src/Math/radToTurn';
import Math_turnToRad from 'x/src/Math/turnToRad';
import Math_turnToDeg from 'x/src/Math/turnToDeg';

import getFont from './getFont';
import getTextWidth from './getTextWidth';
import getImageData from './getImageData';

export default class {
	constructor(
		text,
		weight,
		rotation,
		rotationUnit,
		fontFamily,
		fontStyle,
		fontVariant,
		fontWeight,
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
		this.$fontFamily = fontFamily;
		this.$fontStyle = fontStyle;
		this.$fontVariant = fontVariant;
		this.$fontWeight = fontWeight;
		this.$relativeLeft = 0;
		this.$relativeTop = 0;
		this.$createCanvas = createCanvas;
		this.$_relativePadding = 0;
		this.$_scaleFactor = 1;
	}

	get $rotationDeg() {
		return Math_turnToDeg(this.$rotationTurn);
	}

	get $rotationRad() {
		return Math_turnToRad(this.$rotationTurn);
	}

	get $scaleFactor() {
		return this.$_scaleFactor;
	}

	set $scaleFactor(value) {
		if (this.$_scaleFactor !== value) {
			this.$_scaleFactor = value;
			this.$_imageData = undefined;
		}
	}

	get $fontSize() {
		return Math.ceil(this.$_scaleFactor);
	}

	get $font() {
		return getFont(
			this.$fontStyle,
			this.$fontVariant,
			this.$fontWeight,
			this.$fontSize,
			this.$fontFamily,
		);
	}

	get $relativeTextWidth() {
		if (this.$_relativeTextWidth === undefined) {
			this.$_relativeTextWidth = getTextWidth(
				this.$text,
				getFont(
					this.$fontStyle,
					this.$fontVariant,
					this.$fontWeight,
					1,
					this.$fontFamily,
				),
				this.$createCanvas,
			);
		}
		return this.$_relativeTextWidth;
	}

	get $textWidth() {
		return Math.ceil(this.$relativeTextWidth * this.$scaleFactor);
	}

	get $left() {
		return Math.ceil(this.$relativeLeft * this.$scaleFactor);
	}

	set $left(value) {
		this.$relativeLeft = value / this.$scaleFactor;
	}

	get $top() {
		return Math.ceil(this.$relativeTop * this.$scaleFactor);
	}

	set $top(value) {
		this.$relativeTop = value / this.$scaleFactor;
	}

	get $boundingBoxWidth() {
		return Geometry_getRotatedRectangleBoundingBoxWidth(
			this.$textWidth,
			this.$fontSize,
			this.$rotationRad,
		);
	}

	get $boundingBoxHeight() {
		return Geometry_getRotatedRectangleBoundingBoxHeight(
			this.$textWidth,
			this.$fontSize,
			this.$rotationRad,
		);
	}

	get $boundingBoxLeft() {
		return Math.ceil(this.$left - this.$boundingBoxWidth / 2);
	}

	get $boundingBoxTop() {
		return Math.ceil(this.$top - this.$boundingBoxHeight / 2);
	}

	get $relativePadding() {
		return this.$_relativePadding;
	}

	set $relativePadding(value) {
		if (this.$_relativePadding !== value) {
			this.$_relativePadding = value;
			this.$_imageData = undefined;
		}
	}

	get $padding() {
		return Math.ceil(this.$relativePadding * this.$scaleFactor);
	}

	get $imageData() {
		if (this.$_imageData === undefined) {
			this.$_imageData = getImageData(
				this.$text,
				this.$font,
				this.$padding * 2,
				this.$rotationRad,
				Math_ceilDivisible(Geometry_getRotatedRectangleBoundingBoxWidth(
					this.$textWidth + (this.$padding + this.$fontSize) * 2,
					this.$fontSize + (this.$padding + this.$fontSize) * 2,
					this.$rotationRad,
				), 2),
				Math_ceilDivisible(Geometry_getRotatedRectangleBoundingBoxHeight(
					this.$textWidth + (this.$padding + this.$fontSize) * 2,
					this.$fontSize + (this.$padding + this.$fontSize) * 2,
					this.$rotationRad,
				), 2),
				this.$createCanvas,
			);
		}
		return this.$_imageData;
	}

	get $imagePixels() {
		return this.$imageData[0];
	}

	get $imageWidth() {
		return this.$imageData[1];
	}

	get $imageHeight() {
		return this.$imageData[2];
	}

	get $imageLeftShift() {
		return this.$imageData[3];
	}

	get $imageTopShift() {
		return this.$imageData[4];
	}

	get $imageLeft() {
		return this.$left - this.$imageLeftShift;
	}

	set $imageLeft(value) {
		this.$left = value + this.$imageLeftShift;
	}

	get $imageTop() {
		return this.$top - this.$imageTopShift;
	}

	set $imageTop(value) {
		this.$top = value + this.$imageTopShift;
	}
}
