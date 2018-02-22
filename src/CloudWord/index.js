import Geometry_getRotatedRectangleBoundingBoxHeight from 'x/src/Geometry/getRotatedRectangleBoundingBoxHeight';
import Geometry_getRotatedRectangleBoundingBoxWidth from 'x/src/Geometry/getRotatedRectangleBoundingBoxWidth';
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
		this.$_fontSize = 1;
	}

	get $rotationDeg() {
		return Math_turnToDeg(this.$rotationTurn);
	}

	get $rotationRad() {
		return Math_turnToRad(this.$rotationTurn);
	}

	get $fontSize() {
		return this.$_fontSize;
	}

	set $fontSize(value) {
		if (this.$_fontSize !== value) {
			this.$_fontSize = value;
			this.$_imageData = undefined;
		}
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
		return this.$relativeTextWidth * this.$fontSize;
	}

	get $left() {
		return this.$relativeLeft * this.$fontSize;
	}

	set $left(value) {
		this.$relativeLeft = value / this.$fontSize;
	}

	get $top() {
		return this.$relativeTop * this.$fontSize;
	}

	set $top(value) {
		this.$relativeTop = value / this.$fontSize;
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
		return this.$left - this.$boundingBoxWidth / 2;
	}

	get $boundingBoxTop() {
		return this.$top - this.$boundingBoxHeight / 2;
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
		return this.$relativePadding * this.$fontSize;
	}

	get $imageData() {
		if (this.$_imageData === undefined) {
			this.$_imageData = getImageData(
				this.$text,
				this.$font,
				this.$padding * 2,
				this.$rotationRad,
				Geometry_getRotatedRectangleBoundingBoxWidth(
					this.$textWidth + (this.$padding + this.$fontSize) * 2,
					this.$fontSize + (this.$padding + this.$fontSize) * 2,
					this.$rotationRad,
				),
				Geometry_getRotatedRectangleBoundingBoxHeight(
					this.$textWidth + (this.$padding + this.$fontSize) * 2,
					this.$fontSize + (this.$padding + this.$fontSize) * 2,
					this.$rotationRad,
				),
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
		return Math.ceil(this.$left - this.$imageLeftShift);
	}

	set $imageLeft(value) {
		this.$left = value + this.$imageLeftShift;
	}

	get $imageTop() {
		return Math.ceil(this.$top - this.$imageTopShift);
	}

	set $imageTop(value) {
		this.$top = value + this.$imageTopShift;
	}
}
