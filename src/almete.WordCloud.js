import Array_sortBy from './helpers/Array/sortBy';

import getPopulatedWords from './members/getPopulatedWords';
import getWordsFontSizes from './members/getWordsFontSizes';
import scaleCloudWords from './members/scaleCloudWords';
import shiftCloudWords from './members/shiftCloudWords';

export default function(words, cloudWidth, cloudHeight, {
	text = '',
	weight = 1,
	rotation = 0,
	fontFamily = 'serif',
	fontStyle = 'normal',
	fontVariant = 'normal',
	fontWeight = 'normal',
	fontSizeRatio = 0,
} = {}) {
	if (words.length > 0 && cloudWidth > 0 && cloudHeight > 0) {
		words = getPopulatedWords(
			words,
			text,
			weight,
			rotation,
			fontFamily,
			fontStyle,
			fontVariant,
			fontWeight,
		);
		words = Array_sortBy(words, ({weight}) => -weight);
		let wordsFontSizes = getWordsFontSizes(words, fontSizeRatio);
		//let cloud = createInfiniteCloud(cloudWidth / cloudHeight);
		let cloudWords = words.map(({
			text,
			weight,
			rotation,
			fontFamily,
			fontStyle,
			fontVariant,
			fontWeight,
		}, index) => {
			let fontSize = wordsFontSizes[index];
			/*let [image, imageWidth, imageHeight] = getWordImage(
				text,
				fontStyle,
				fontVariant,
				fontWeight,
				fontSize,
				fontFamily,
				rotation,
			);
			let [left, top] = cloud.placeWordImage(image, imageWidth, imageHeight);*/
			return {
				text,
				rotation,
				fontStyle,
				fontVariant,
				fontWeight,
				fontSize,
				fontFamily,
				left: 0,
				top: 0,
				width: 100,
				height: 50,
			};
		});
		scaleCloudWords(cloudWords, cloudWidth, cloudHeight);
		shiftCloudWords(cloudWords, cloudWidth, cloudHeight);
		return cloudWords;
	}
	return [];
}
