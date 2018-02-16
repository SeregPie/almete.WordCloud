import Array_min from 'x/src/Array/min';
import Array_max from 'x/src/Array/max';
import Math_mapLinear from 'x/src/Math/mapLinear';

import createPopulatedWords from './createPopulatedWords';
import findPixel from './findPixel';

const fontSizeBase = 4;

export default function(words, cloudWidth, cloudHeight, {
	text = '',
	weight = 1,
	rotation = 0,
	rotationUnit = 'turn',
	fontFamily = 'serif',
	fontStyle = 'normal',
	fontVariant= 'normal',
	fontWeight = 'normal',
	spacing = 0,
	fontSizeRatio = 0,
	createCanvas = function() {
		return document.createElement('canvas');
	},
} = {}) {

	if (words.length > 0 && cloudWidth > 0 && cloudHeight > 0) {

		words = createPopulatedWords(
			words,
			text,
			weight,
			rotation,
			rotationUnit,
			fontFamily,
			fontStyle,
			fontVariant,
			fontWeight,
			createCanvas,
		);

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

		if (words.length > 1) {
			let grid = {};
			words.reduce((previousWord, word) => {
				previousWord.padding = 0;
				previousWord.imagePixels.forEach(([imagePixelLeft, imagePixelTop]) => {
					let gridPixelLeft = previousWord.imageLeft + imagePixelLeft;
					let gridPixelTop = previousWord.imageTop + imagePixelTop;
					grid[`${gridPixelLeft}|${gridPixelTop}`] = true;
				});
				word.padding = spacing;
				let [imageLeft, imageTop] = findPixel([cloudWidth, cloudHeight], [word.imageLeft, word.imageTop], ([imageLeft, imageTop]) => {
					return word.imagePixels.every(([imagePixelLeft, imagePixelTop]) => {
						let gridPixelLeft = imageLeft + imagePixelLeft;
						let gridPixelTop = imageTop + imagePixelTop;
						return !grid[`${gridPixelLeft}|${gridPixelTop}`];
					});
				});
				word.imageLeft = imageLeft;
				word.imageTop = imageTop;
				return word;
			});
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
			word.left *= scaleFactor;
			word.top *= scaleFactor;

			word.left += cloudWidth / 2;
			word.top += cloudHeight / 2;
		});

		return words;
	}
	return [];
}
