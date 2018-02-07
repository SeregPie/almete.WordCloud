import getPopulatedWords from './getPopulatedWords';
import getWordsFontSizes from './getWordsFontSizes';
import getWordTextWidth from './getWordTextWidth';
import getWordImage from './getWordImage';
import createPlaceBitImageFunction from './createPlaceBitImageFunction';
import fitWordsIntoCloud from './fitWordsIntoCloud';

export default function(words, cloudWidth, cloudHeight, {
	text = '',
	weight = 1,
	rotation = 0,
	rotationUnit = 'turn',
	fontFamily = 'serif',
	fontStyle = 'normal',
	fontVariant = 'normal',
	fontWeight = 'normal',
	spacing = 0,
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
		words.sort((word, otherWord) => otherWord.weight - word.weight);
		let wordsFontSizes = getWordsFontSizes(words, fontSizeRatio);
		let placeBitImage = createPlaceBitImageFunction([cloudWidth, cloudHeight]);
		words.forEach((word, index) => {
			word.fontSize = wordsFontSizes[index];
			word.textWidth = getWordTextWidth(word, createCanvas);
			let [image, imageWidth, imageHeight] = getWordImage(word, spacing, createCanvas);
			let [imageLeft, imageTop] = placeBitImage(image, imageWidth, imageHeight);
			word.left = imageLeft + imageWidth / 2;
			word.top = imageTop + imageHeight / 2;
		});
		fitWordsIntoCloud(words, cloudWidth, cloudHeight);
		return words;
	}
	return [];
}
