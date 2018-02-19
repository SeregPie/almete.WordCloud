import Array_min from 'x/src/Array/min';
import Array_max from 'x/src/Array/max';
import Math_mapLinear from 'x/src/Math/mapLinear';

import CloudWord from './CloudWord';
import CloudGrid from './CloudGrid';

const fontSizeBase = 4;

export default function(words, cloudWidth, cloudHeight, {
	text: defaultText = '',
	weight: defaultWeight = 1,
	rotation: defaultRotation = 0,
	rotationUnit: defaultRotationUnit = 'turn',
	fontFamily: defaultFontFamily = 'serif',
	fontStyle: defaultFontStyle = 'normal',
	fontVariant: defaultFontVariant= 'normal',
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
		}) => new CloudWord(
			text,
			weight,
			rotation,
			rotationUnit,
			fontStyle,
			fontVariant,
			fontWeight,
			fontSizeBase,
			fontFamily,
			createCanvas,
		));

		fontSizeRatio = Math.abs(fontSizeRatio);
		if (fontSizeRatio > 1) {
			fontSizeRatio = 1 / fontSizeRatio;
		}

		words.sort((word, otherWord) => otherWord.$weight - word.$weight);

		let maxWeight = words[0].$weight;
		let minWeight = words[words.length - 1].$weight;
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
				word.$fontSize *= Math_mapLinear(word.$weight, minWeight, maxWeight, 1, fontSizeRatio);
			});
		}

		let grid = new CloudGrid([cloudWidth, cloudHeight]);
		words.reduce((previousWord, word) => {
			previousWord.$relativePadding = 0;
			grid.$put(previousWord.$imagePixels, previousWord.$imageLeft, previousWord.$imageTop);
			word.$relativePadding = spacing;
			let [imageLeft, imageTop] = grid.$findFit(word.$imagePixels, word.$imageLeft, word.$imageTop);
			word.$imageLeft = imageLeft;
			word.$imageTop = imageTop;
			return word;
		});

		let wordsLeft = Array_min(words, ({$rectLeft}) => $rectLeft);
		let wordsLeftUntil = Array_max(words, ({$rectLeft, $rectWidth}) => $rectLeft + $rectWidth);
		let minWordsWidth = wordsLeftUntil - wordsLeft;
		let maxWordsWidth = wordsLeftUntil + wordsLeft;

		let wordsTop = Array_min(words, ({$rectTop}) => $rectTop);
		let wordsTopUntil = Array_max(words, ({$rectTop, $rectHeight}) => $rectTop + $rectHeight);
		let minWordsHeight = wordsTopUntil - wordsTop;
		let maxWordsHeight = wordsTopUntil + wordsTop;

		let scaleFactor = Math.min(cloudWidth / minWordsWidth, cloudHeight / minWordsHeight);

		words.forEach(word => {
			word.$left -= maxWordsWidth / 2;
			word.$top -= maxWordsHeight / 2;

			word.$scale(scaleFactor);

			word.$left += cloudWidth / 2;
			word.$top += cloudHeight / 2;
		});

		words = words.map(word => ({
			text: word.$text,
			rotationTurn: word.$rotationTurn,
			rotationDeg: word.$rotationDeg,
			rotationRad: word.$rotationRad,
			fontStyle: word.$fontStyle,
			fontVariant: word.$fontVariant,
			fontWeight: word.$fontWeight,
			fontSize: word.$fontSize,
			fontFamily: word.$fontFamily,
			font: word.$font,
			textWidth: word.$textWidth,
			rectWidth: word.$rectWidth,
			rectHeight: word.$rectHeight,
			rectLeft: word.$rectLeft,
			rectTop: word.$rectTop,
			left: word.$left,
			top: word.$top,
		}));

		return words;
	}
	return [];
}
