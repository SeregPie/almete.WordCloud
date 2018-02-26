import Array_max from 'x/src/Array/max';
import Array_min from 'x/src/Array/min';
import Math_degToTurn from 'x/src/Math/degToTurn';
import Math_mapLinear from 'x/src/Math/mapLinear';
import Math_radToTurn from 'x/src/Math/radToTurn';

import BoundingWord from './BoundingWord';
import PixelGrid from './PixelGrid';

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
	xxx = 6,
	yyy = 2,
	createCanvas = function() {
		return document.createElement('canvas');
	},
} = {}) {

	fontSizeRatio = Math.abs(fontSizeRatio);
	if (fontSizeRatio > 1) {
		fontSizeRatio = 1 / fontSizeRatio;
	}

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
		}) => new BoundingWord(
			text,
			weight,
			(() => {
				switch (rotationUnit) {
					case 'deg':
						return Math_degToTurn(rotation);
					case 'rad':
						return Math_radToTurn(rotation);
				}
				return rotation;
			})(),
			fontFamily,
			fontStyle,
			fontVariant,
			fontWeight,
			createCanvas,
		));

		if (words.length > 1) {

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
					word.$fontSize *= Math_mapLinear(word.$weight, minWeight, maxWeight, 1, fontSizeRange);
				});
			}

			let grid = new PixelGrid([cloudWidth, cloudHeight]);
			let word = words[0];
			let aaa = word.$fontSize / xxx;
			word.$fontSize /= aaa;
			words.reduce((previousWord, word, index) => {
				let ccc = word.$fontSize / xxx;
				if (ccc * yyy > aaa) {
					grid.$put(previousWord.$imagePixels, previousWord.$imageLeft, previousWord.$imageTop);
				} else {
					let bbb = aaa / ccc;
					grid = new PixelGrid([cloudWidth, cloudHeight]);
					words.slice(0, index).forEach(word => {
						word.$fontSize *= bbb;
						grid.$put(word.$imagePixels, word.$imageLeft, word.$imageTop);
					});
					aaa = ccc;
				}
				word.$fontSize /= aaa;
				word.$relativePadding = spacing;
				let [imageLeft, imageTop] = grid.$findFit(word.$imagePixels, word.$imageLeft, word.$imageTop);
				word.$imageLeft = imageLeft;
				word.$imageTop = imageTop;
				word.$relativePadding = 0;
				return word;
			});
		}

		let currentMinImageLeft = Array_min(words, ({$imageLeft}) => $imageLeft);
		let currentMaxImageLeftWidth = Array_max(words, ({$imageLeft, $imageWidth}) => $imageLeft + $imageWidth);
		let currentMinImageTop = Array_min(words, ({$imageTop}) => $imageTop);
		let currentMaxImageTopHeight = Array_max(words, ({$imageTop, $imageHeight}) => $imageTop + $imageHeight);
		let currentCloudWidth = currentMaxImageLeftWidth - currentMinImageLeft;
		let currentCloudHeight = currentMaxImageTopHeight - currentMinImageTop;
		let currentCloudLeft = (currentMaxImageLeftWidth + currentMinImageLeft) / 2;
		let currentCloudTop = (currentMaxImageTopHeight + currentMinImageTop) / 2;
		let scaleFactor = Math.min(cloudWidth / currentCloudWidth, cloudHeight / currentCloudHeight);
		words.forEach(word => {
			word.$left -= currentCloudLeft;
			word.$top -= currentCloudTop;
			word.$fontSize *= scaleFactor;
			word.$left += cloudWidth / 2;
			word.$top += cloudHeight / 2;
		});

		return words.map(word => ({
			text: word.$text,
			weight: word.$weight,
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
	}

	return [];
}
