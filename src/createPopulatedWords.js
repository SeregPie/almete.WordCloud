import Math_ceilDivisible from 'x/src/Math/ceilDivisible';
import Math_degToTurn from 'x/src/Math/degToTurn';
import Math_radToTurn from 'x/src/Math/radToTurn';
import Math_turnToRad from 'x/src/Math/turnToRad';
import Math_turnToDeg from 'x/src/Math/turnToDeg';

import getTextWidth from './getTextWidth';
import getRotatedWidth from './getRotatedWidth';
import getRotatedHeight from './getRotatedHeight';
import getTextImagePixels from './getTextImagePixels';

export default function(
	words,
	defaultText,
	defaultWeight,
	defaultRotation,
	defaultRotationUnit,
	defaultFontFamily,
	defaultFontStyle,
	defaultFontVariant,
	defaultFontWeight,
	createCanvas,
) {
	return words.map(({
		text = defaultText,
		weight = defaultWeight,
		rotation = defaultRotation,
		rotationUnit = defaultRotationUnit,
		fontFamily = defaultFontFamily,
		fontStyle = defaultFontStyle,
		fontVariant = defaultFontVariant,
		fontWeight = defaultFontWeight,
	}) => ({
		text,
		weight,
		rotationTurn: (() => {
			switch (rotationUnit) {
				case 'deg':
					return Math_degToTurn(rotation);
				case 'rad':
					return Math_radToTurn(rotation);
			}
			return rotation;
		})(),
		get rotationDeg() {
			return Math_turnToDeg(this.rotationTurn);
		},
		get rotationRad() {
			return Math_turnToRad(this.rotationTurn);
		},
		fontStyle,
		fontVariant,
		fontWeight,
		get fontSize() {
			return this._fontSize;
		},
		set fontSize(value) {
			if (this._fontSize !== value) {
				this._fontSize = value;
				this._textWidth = undefined;
				this._imagePixels = undefined;
			}
		},
		fontFamily,
		get font() {
			return [this.fontStyle, this.fontVariant, this.fontWeight, `${this.fontSize}px`, this.fontFamily].join(' ');
		},
		get textWidth() {
			if (this._textWidth === undefined) {
				this._textWidth = getTextWidth(this.text, this.font, createCanvas);
			}
			return this._textWidth;
		},
		left: 0,
		top: 0,
		get rectWidth() {
			return getRotatedWidth(this.textWidth, this.fontSize, this.rotationRad);
		},
		get rectHeight() {
			return getRotatedHeight(this.textWidth, this.fontSize, this.rotationRad);
		},
		get rectLeft() {
			return this.left - this.rectWidth / 2;
		},
		get rectTop() {
			return this.top - this.rectHeight / 2;
		},
		get padding() {
			return this._padding;
		},
		set padding(value) {
			if (this._padding !== value) {
				this._padding = value;
				this._imagePixels = undefined;
			}
		},
		get paddingInPixels() {
			return this.fontSize * this.padding;
		},
		get imageWidth() {
			return Math_ceilDivisible(getRotatedWidth(
				this.textWidth + (this.paddingInPixels + this.fontSize) * 2,
				this.fontSize + (this.paddingInPixels + this.fontSize) * 2,
				this.rotationRad,
			), 2);
		},
		get imageHeight() {
			return Math_ceilDivisible(getRotatedHeight(
				this.textWidth + (this.paddingInPixels + this.fontSize) * 2,
				this.fontSize + (this.paddingInPixels + this.fontSize) * 2,
				this.rotationRad,
			), 2);
		},
		get lineWidth() {
			return this.paddingInPixels * 2;
		},
		get imagePixels() {
			if (this._imagePixels === undefined) {
				this._imagePixels = getTextImagePixels(
					this.text,
					this.lineWidth,
					this.font,
					this.rotationRad,
					this.imageWidth,
					this.imageHeight,
					createCanvas,
				);
			}
			return this._imagePixels;
		},
		get imageLeft() {
			return this.left - this.imageWidth / 2;
		},
		set imageLeft(value) {
			this.left = value + this.imageWidth / 2;
		},
		get imageTop() {
			return this.top - this.imageHeight / 2;
		},
		set imageTop(value) {
			this.top = value + this.imageHeight / 2;
		},
	}));
}
