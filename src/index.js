import Array_min from 'x/src/Array/min';
import Array_max from 'x/src/Array/max';
import Math_mapLinear from 'x/src/Math/mapLinear';

import createPopulatedWords from './createPopulatedWords';
import createPixelGrid from './createPixelGrid';

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
			let grid = createPixelGrid([cloudWidth, cloudHeight]);
			words.reduce((previousWord, word) => {
				previousWord.padding = 0;
				grid.placePixels(previousWord.imagePixels, previousWord.imageLeft, previousWord.imageTop);
				word.padding = spacing;
				let [imageLeft, imageTop] = grid.fitPixels(word.imagePixels, word.imageLeft, word.imageTop);
				word.imageLeft = imageLeft;
				word.imageTop = imageTop;
				return word;
			});
		}

		let wordsLeft = Array_min(words, ({rectLeft}) => rectLeft);
		let wordsLeftUntil = Array_max(words, ({rectLeft, rectWidth}) => rectLeft + rectWidth);
		let minWordsWidth = wordsLeftUntil - wordsLeft;
		let maxWordsWidth = wordsLeftUntil + wordsLeft;

		let wordsTop = Array_min(words, ({rectTop}) => rectTop);
		let wordsTopUntil = Array_max(words, ({rectTop, rectHeight}) => rectTop + rectHeight);
		let minWordsHeight = wordsTopUntil - wordsTop;
		let maxWordsHeight = wordsTopUntil + wordsTop;

		let scaleFactor = Math.min(cloudWidth / minWordsWidth, cloudHeight / minWordsHeight);

		words.forEach(word => {
			word.left -= maxWordsWidth / 2;
			word.top -= maxWordsHeight / 2;

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
