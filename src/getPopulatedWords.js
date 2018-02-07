import Math_turnToRad from 'asyma/src/Math/turnToRad';
import Math_turnToDeg from 'asyma/src/Math/turnToDeg';

import toFont from './toFont';
import toRotationTurn from './toRotationTurn';

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
		rotationTurn: toRotationTurn(rotation, rotationUnit),
		get rotationDeg() {
			return Math_turnToDeg(this.rotationTurn);
		},
		get rotationRad() {
			return Math_turnToRad(this.rotationTurn);
		},
		fontFamily,
		fontStyle,
		fontVariant,
		fontWeight,
		get font() {
			return toFont(this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily);
		},
		get rectWidth() {
			return Math.ceil((this.textWidth * Math.abs(Math.cos(this.rotationRad)) + this.fontSize * Math.abs(Math.sin(this.rotationRad))));
		},
		get rectHeight() {
			return Math.ceil((this.textWidth * Math.abs(Math.sin(this.rotationRad)) + this.fontSize * Math.abs(Math.cos(this.rotationRad))));
		},
		get rectLeft() {
			return this.left - this.rectWidth / 2;
		},
		/*set rectLeft(value) {
			this.left = value + this.rectWidth / 2;
		},*/
		get rectTop() {
			return this.top - this.rectHeight / 2;
		},
		/*set rectTop(value) {
			this.top = value + this.rectHeight / 2;
		},*/
	}));
}
