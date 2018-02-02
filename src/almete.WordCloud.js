import Array_sortBy from './helpers/Array/sortBy';

import getPopulatedWords from './members/getPopulatedWords';
import getWordsFontSizes from './members/getWordsFontSizes';
import getWordCanvasData from './members/getWordCanvasData';
import createPlaceBitImageFunction from './members/createPlaceBitImageFunction';
import fitWordsIntoCloud from './members/fitWordsIntoCloud';

export default function(words, cloudWidth, cloudHeight, {
	text = '',
	weight = 1,
	rotation = 0,
	rotationUnit = 'turn',
	fontFamily = 'serif',
	fontStyle = 'normal',
	fontVariant = 'normal',
	fontWeight = 'normal',
	fontSizeRatio = 0,
	createCanvas = function() {
		return document.createElement('canvas');
	},
} = {}) {
	if (words.length > 0 && cloudWidth > 0 && cloudHeight > 0) {
		words = getPopulatedWords(
			words,
			text,
			weight,
			rotation,
			rotationUnit,
			fontFamily,
			fontStyle,
			fontVariant,
			fontWeight,
		);
		words = Array_sortBy(words, ({weight}) => -weight);
		let wordsFontSizes = getWordsFontSizes(words, fontSizeRatio);
		let placeBitImage = createPlaceBitImageFunction([cloudWidth, cloudHeight]);
		words.forEach((word, index) => {
			let fontSize = wordsFontSizes[index];
			Object.assign(word, {fontSize});
			let [
				textWidth,
				rectWidth,
				rectHeight,
				image,
				imageWidth,
				imageHeight,
			] = getWordCanvasData(word, createCanvas);
			let [imageLeft, imageTop] = placeBitImage(image, imageWidth, imageHeight);
			let left = imageLeft + imageWidth / 2;
			let top = imageTop + imageHeight / 2;
			Object.assign(word, {textWidth, rectWidth, rectHeight, left, top});
		});
		fitWordsIntoCloud(words, cloudWidth, cloudHeight);
		return words;
	}
	return [];
}
