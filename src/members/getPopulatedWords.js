import Math_turnToRad from '../helpers/Math/turnToRad';
import Math_turnToDeg from '../helpers/Math/turnToDeg';

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
		get rotationRad() {
			return Math_turnToRad(this.rotationTurn);
		},
		get rotationDeg() {
			return Math_turnToDeg(this.rotationTurn);
		},
		fontFamily,
		fontStyle,
		fontVariant,
		fontWeight,
		get font() {
			return toFont(this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily);
		},
		get rectLeft() {
			return this.left - this.rectWidth / 2;
		},
		get rectTop() {
			return this.top - this.rectHeight / 2;
		},
	}));
}
