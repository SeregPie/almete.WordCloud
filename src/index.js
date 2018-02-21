import Array_min from 'x/src/Array/min';
import Array_max from 'x/src/Array/max';
import Math_mapLinear from 'x/src/Math/mapLinear';

import CloudWord from './CloudWord';
import PixelGrid from './PixelGrid';

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
			fontFamily,
			fontStyle,
			fontVariant,
			fontWeight,
			createCanvas,
		));

		fontSizeRatio = Math.abs(fontSizeRatio);
		if (fontSizeRatio > 1) {
			fontSizeRatio = 1 / fontSizeRatio;
		}

		words.sort((word, otherWord) =>
			otherWord.$weight - word.$weight
			||
			otherWord.$textWidth - word.$textWidth
		);

		let maxWeight = words[0].$weight;
		let minWeight = words[words.length - 1].$weight;
		if (minWeight < maxWeight) {
			let fontSizeRange = (() => {
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
				word.$scaleFactor *= Math_mapLinear(word.$weight, minWeight, maxWeight, 1, fontSizeRange);
			});
		}

		words.forEach(word => {
			word.$scaleFactor *= fontSizeBase;
		});

		let grid = new PixelGrid([cloudWidth, cloudHeight]);
		words.reduce((previousWord, word) => {
			grid.$put(previousWord.$imagePixels, previousWord.$imageLeft, previousWord.$imageTop);
			word.$relativePadding = spacing;
			let [imageLeft, imageTop] = grid.$findFit(word.$imagePixels, word.$imageLeft, word.$imageTop);
			word.$imageLeft = imageLeft;
			word.$imageTop = imageTop;
			word.$relativePadding = 0;
			return word;
		});

		let minWordsLeft = Array_min(words, ({$boundingBoxLeft}) => $boundingBoxLeft);
		let maxWordsLeft = Array_max(words, ({$boundingBoxLeft, $boundingBoxWidth}) => $boundingBoxLeft + $boundingBoxWidth);
		let minWordsWidth = maxWordsLeft - minWordsLeft;
		let maxWordsWidth = maxWordsLeft + minWordsLeft;

		let minWordsTop = Array_min(words, ({$boundingBoxTop}) => $boundingBoxTop);
		let maxWordsTop = Array_max(words, ({$boundingBoxTop, $boundingBoxHeight}) => $boundingBoxTop + $boundingBoxHeight);
		let minWordsHeight = maxWordsTop - minWordsTop;
		let maxWordsHeight = maxWordsTop + minWordsTop;

		let scaleFactor = Math.min(cloudWidth / minWordsWidth, cloudHeight / minWordsHeight);

		words.forEach(word => {
			word.$left -= maxWordsWidth / 2;
			word.$top -= maxWordsHeight / 2;

			word.$scaleFactor *= scaleFactor;

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
			boundingBoxWidth: word.$boundingBoxWidth,
			boundingBoxHeight: word.$boundingBoxHeight,
			boundingBoxLeft: word.$boundingBoxLeft,
			boundingBoxTop: word.$boundingBoxTop,
			left: word.$left,
			top: word.$top,
		}));

		return words;
	}
	return [];
}
