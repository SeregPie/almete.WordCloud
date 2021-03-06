import Array_last from './utils/Array/last';
import Math_degToRad from './utils/Math/degToRad';
import Math_mapLinear from './utils/Math/mapLinear';
import Math_radToDeg from './utils/Math/radToDeg';
import Math_radToTurn from './utils/Math/radToTurn';
import Math_turnToRad from './utils/Math/turnToRad';

import getBoundingBoxHeight from './getBoundingBoxHeight';
import getBoundingBoxWidth from './getBoundingBoxWidth';
import getFont from './getFont';
import PixelGrid from './PixelGrid';

let baseFontSize = 4;

export default function(words, cloudWidth, cloudHeight, {
	createCanvas = function() {
		return document.createElement('canvas');
	},
	fontFamily: defaultFontFamily = 'serif',
	fontSizeRatio = 0,
	fontStyle: defaultFontStyle = 'normal',
	fontVariant: defaultFontVariant= 'normal',
	fontWeight: defaultFontWeight = 'normal',
	gap = 0,
	rotation: defaultRotation = 0,
	rotationUnit: defaultRotationUnit = 'turn',
	text: defaultText = '',
	weight: defaultWeight = 1,
} = {}) {
	if (cloudWidth && cloudHeight) {
		let Word = class {
			constructor() {
				this._fontSize = 1;
				this._left = 0;
				this._top = 0;
			}
			get _font() {
				return getFont(
					this._fontStyle,
					this._fontVariant,
					this._fontWeight,
					this._fontSize,
					this._fontFamily,
				);
			}
			get _textWidth() {
				return this._relativeTextWidth * this._fontSize;
			}
			get _rotationDeg() {
				return Math_radToDeg(this._rotationRad);
			}
			get _rotationTurn() {
				return Math_radToTurn(this._rotationRad);
			}
			get _centerLeft() {
				return this._left + this._width / 2;
			}
			get _centerTop() {
				return this._top + this._height / 2;
			}
			get _width() {
				return getBoundingBoxWidth(
					this._textWidth,
					this._fontSize,
					this._rotationRad,
				);
			}
			get _height() {
				return getBoundingBoxHeight(
					this._textWidth,
					this._fontSize,
					this._rotationRad,
				);
			}
			__getImage(relativeLineWidth) {
				let lineWidth = relativeLineWidth * this._fontSize;
				let canvas = createCanvas();
				canvas.width = Math.round(getBoundingBoxWidth(
					lineWidth + this._fontSize * 2 + this._textWidth,
					lineWidth + this._fontSize * 3,
					this._rotationRad,
				));
				canvas.height = Math.round(getBoundingBoxHeight(
					lineWidth + this._fontSize * 2 + this._textWidth,
					lineWidth + this._fontSize * 3,
					this._rotationRad,
				));
				let ctx = canvas.getContext('2d');
				ctx.translate(canvas.width / 2, canvas.height / 2);
				ctx.rotate(this._rotationRad);
				ctx.font = this._font;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(this._text, 0, 0);
				if (lineWidth > 0) {
					ctx.miterLimit = 1;
					ctx.lineWidth = lineWidth;
					ctx.strokeText(this._text, 0, 0);
				}
				return ctx.getImageData(0, 0, canvas.width, canvas.height);
			}
		};
		words = words
			.map(({
				fontFamily = defaultFontFamily,
				fontStyle = defaultFontStyle,
				fontVariant = defaultFontVariant,
				fontWeight = defaultFontWeight,
				rotation = defaultRotation,
				rotationUnit = defaultRotationUnit,
				text = defaultText,
				weight = defaultWeight,
			}) => Object.assign(new Word(), {
				_fontFamily: fontFamily,
				_fontStyle: fontStyle,
				_fontVariant: fontVariant,
				_fontWeight: fontWeight,
				_relativeTextWidth: (() => {
					let canvas = createCanvas();
					let ctx = canvas.getContext('2d');
					ctx.font = getFont(
						fontStyle,
						fontVariant,
						fontWeight,
						1,
						fontFamily,
					);
					return ctx.measureText(text).width;
				})(),
				_rotationRad: (() => {
					switch (rotationUnit) {
						case 'deg':
							return Math_degToRad(rotation);
						case 'turn':
							return Math_turnToRad(rotation);
					}
					return rotation;
				})(),
				_text: text,
				_weight: weight,
			}))
			.filter(({_textWidth}) => _textWidth);
		let words_scale = (scaling => {
			words.forEach(word => {
				word._fontSize *= scaling;
				word._left *= scaling;
				word._top *= scaling;
			});
		});
		let words_shift = ((shiftingLeft, shiftingTop) => {
			words.forEach(word => {
				word._left += shiftingLeft;
				word._top += shiftingTop;
			});
		});
		if (words.length) {
			let sortedWords = words
				.slice()
				.sort((word, otherWord) => otherWord._weight - word._weight);
			let firstWord = sortedWords[0];
			let lastWord = Array_last(sortedWords);
			let maxWeight = firstWord._weight;
			let minWeight = lastWord._weight;
			if (minWeight < maxWeight) {
				fontSizeRatio = Math.abs(fontSizeRatio);
				fontSizeRatio = (() => {
					if (fontSizeRatio > 1) {
						return fontSizeRatio;
					}
					if (fontSizeRatio > 0) {
						return 1 / fontSizeRatio;
					}
					if (minWeight > 0) {
						return maxWeight / minWeight;
					}
					if (maxWeight < 0) {
						return minWeight / maxWeight;
					}
					return 1 + maxWeight - minWeight;
				})();
				words.forEach(word => {
					word._fontSize = Math_mapLinear(word._weight, minWeight, maxWeight, 1 / fontSizeRatio, 1) * baseFontSize;
				});
			}
			let grid = new PixelGrid([cloudWidth, cloudHeight]);
			let grid_findFit = (word => {
				let image = word.__getImage(gap * 2);
				let [imageLeft, imageTop] = grid._findFit(image);
				word._left = imageLeft + (image.width - word._width) / 2;
				word._top = imageTop + (image.height - word._height) / 2;
			});
			let grid_put = (word => {
				let image = word.__getImage(0);
				let imageLeft = Math.round(word._left - (image.width - word._width) / 2);
				let imageTop = Math.round(word._top - (image.height - word._height) / 2);
				grid._put(image, imageLeft, imageTop);
			});
			sortedWords.reduce((previousWord, word, index) => {
				if (word._fontSize < baseFontSize) {
					do {
						words_scale(2);
					} while (word._fontSize < baseFontSize);
					grid._clear();
					sortedWords
						.slice(0, index)
						.forEach(previousWord => {
							grid_put(previousWord);
						});
				} else {
					grid_put(previousWord);
				}
				grid_findFit(word);
				return word;
			});
			grid_put(lastWord);
			if (grid._width && grid._height) {
				words_shift(-grid._centerLeft, -grid._centerTop);
				words_scale(Math.min(cloudWidth / grid._width, cloudHeight / grid._height));
				words_shift(cloudWidth / 2, cloudHeight / 2);
			}
			return words.map(word => ({
				centerLeft: word._centerLeft,
				centerTop: word._centerTop,
				font: word._font,
				fontFamily: word._fontFamily,
				fontSize: word._fontSize,
				fontStyle: word._fontStyle,
				fontVariant: word._fontVariant,
				fontWeight: word._fontWeight,
				height: word._height,
				left: word._left,
				rotationDeg: word._rotationDeg,
				rotationRad: word._rotationRad,
				rotationTurn: word._rotationTurn,
				text: word._text,
				textWidth: word._textWidth,
				top: word._top,
				weight: word._weight,
				width: word._width,
			}));
		}
	}
	return [];
}
