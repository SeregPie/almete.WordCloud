import Array_min from 'asyma/src/Array/min';
import Array_max from 'asyma/src/Array/max';
import Math_degToTurn from 'asyma/src/Math/degToTurn';
import Math_mapLinear from 'asyma/src/Math/mapLinear';
import Math_radToTurn from 'asyma/src/Math/radToTurn';
import Math_turnToRad from 'asyma/src/Math/turnToRad';
import Math_turnToDeg from 'asyma/src/Math/turnToDeg';

import getTextWidth from './getTextWidth';
import getTextImage from './getTextImage';
import findPixel from './findPixel';

const fontSizeBase = 4;

export default function(words, cloudWidth, cloudHeight, {
	text: defaultText = '',
	weight: defaultWeight = 1,
	rotation: defaultRotation = 0,
	rotationUnit: defaultRotationUnit = 'turn',
	fontFamily: defaultFontFamily = 'serif',
	fontStyle: defaultFontStyle = 'normal',
	fontVariant: defaultFontVariant = 'normal',
	fontWeight: defaultFontWeight = 'normal',
	spacing = 0,
	fontSizeRatio = 0,
	createCanvas = function() {
		return document.createElement('canvas');
	},
} = {}) {

	if (words.length > 0 && cloudWidth > 0 && cloudHeight > 0) {

		words = words.map(({
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
			fontFamily,
			fontStyle,
			fontVariant,
			fontWeight,
			get font() {
				return [this.fontStyle, this.fontVariant, this.fontWeight, `${this.fontSize}px`, this.fontFamily].join(' ');
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
			get rectTop() {
				return this.top - this.rectHeight / 2;
			},
		}));

		fontSizeRatio = Math.abs(fontSizeRatio);
		if (fontSizeRatio > 1) {
			fontSizeRatio = 1 / fontSizeRatio;
		}

		words.sort((word, otherWord) => otherWord.weight - word.weight);

		let maxWeight = words[0].weight;
		let minWeight = words[words.length - 1].weight;
		if (minWeight < maxWeight) {
			if (fontSizeRatio > 0) {
				fontSizeRatio = 1 / fontSizeRatio;
			} else
			if (minWeight > 0) {
				fontSizeRatio = maxWeight / minWeight;
			} else
			if (maxWeight < 0) {
				fontSizeRatio = minWeight / maxWeight;
			} else {
				fontSizeRatio = 1 + maxWeight - minWeight;
			}
			words.forEach(word => {
				word.fontSize = fontSizeBase * Math_mapLinear(word.weight, minWeight, maxWeight, 1, fontSizeRatio);
			});
		} else {
			words.forEach(word => {
				word.fontSize = fontSizeBase;
			});
		}

		let word = words[0];
		word.textWidth = getTextWidth(word.text, word.font, createCanvas);
		word.left = 0;
		word.top = 0;
		if (words.length > 1) {
			let imagePixels;
			let imageWidth;
			let imageHeight;
			let imageLeft;
			let imageTop;
			let setWordImageDate = function() {
				imageWidth = 2 + word.rectWidth * 2;
				imageHeight = 2 + word.rectHeight * 2;
				imageLeft = -Math.floor(imageWidth / 2);
				imageTop = -Math.floor(imageHeight / 2);
				let image = getTextImage(
					word.text,
					word.font,
					2 * fontSizeBase * spacing,
					word.rotationRad,
					imageWidth,
					imageHeight,
					createCanvas,
				);
				imagePixels = [];
				for (let pixelLeft = 0; pixelLeft < imageWidth; ++pixelLeft) {
					for (let pixelTop = 0; pixelTop < imageHeight; ++pixelTop) {
						if (image[(imageWidth * pixelTop + pixelLeft) * 4 + 3]) {
							imagePixels.push([pixelLeft, pixelTop]);
						}
					}
				}
			};
			setWordImageDate();
			let grid = {};
			for (let i = 1, ii = words.length; i < ii; ++i) {
				imagePixels.forEach(([imagePixelLeft, imagePixelTop]) => {
					let gridPixelLeft = imageLeft + imagePixelLeft;
					let gridPixelTop = imageTop + imagePixelTop;
					grid[`${gridPixelLeft}|${gridPixelTop}`] = true;
				});
				word = words[i];
				word.textWidth = getTextWidth(word.text, word.font, createCanvas);
				setWordImageDate();
				[imageLeft, imageTop] = findPixel([cloudWidth, cloudHeight], [imageLeft, imageTop], ([imageLeft, imageTop]) => {
					return imagePixels.every(([imagePixelLeft, imagePixelTop]) => {
						let gridPixelLeft = imageLeft + imagePixelLeft;
						let gridPixelTop = imageTop + imagePixelTop;
						return !grid[`${gridPixelLeft}|${gridPixelTop}`];
					});
				});
				word.left = imageLeft + imageWidth / 2;
				word.top = imageTop + imageHeight / 2;
			}
		}

		let gridWordsLeft = Array_min(words, ({rectLeft}) => rectLeft);
		let gridWordsLeftUntil = Array_max(words, ({rectLeft, rectWidth}) => rectLeft + rectWidth);
		let gridMinWordsWidth = gridWordsLeftUntil - gridWordsLeft;
		let gridMaxWordsWidth = gridWordsLeftUntil + gridWordsLeft;

		let gridWordsTop = Array_min(words, ({rectTop}) => rectTop);
		let gridWordsTopUntil = Array_max(words, ({rectTop, rectHeight}) => rectTop + rectHeight);
		let gridMinWordsHeight = gridWordsTopUntil - gridWordsTop;
		let gridMaxWordsHeight = gridWordsTopUntil + gridWordsTop;

		let scaleFactor = Math.min(cloudWidth / gridMinWordsWidth, cloudHeight / gridMinWordsHeight);

		words.forEach(word => {
			word.left -= gridMaxWordsWidth / 2;
			word.top -= gridMaxWordsHeight / 2;

			word.fontSize *= scaleFactor;
			word.textWidth *= scaleFactor;
			word.left *= scaleFactor;
			word.top *= scaleFactor;

			word.left += cloudWidth / 2;
			word.top += cloudHeight / 2;
		});

		return words;
	}
	return [];
}
