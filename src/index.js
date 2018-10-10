import Array_last from '/utils/Array/last';
import Math_degToTurn from '/utils/Math/degToTurn';
import Math_mapLinear from '/utils/Math/mapLinear';
import Math_radToTurn from '/utils/Math/radToTurn';

import BoundingWord from './BoundingWord';
import PixelGrid from './PixelGrid';

let renderingFontSizeInterval = 2;
let renderingFontSizeBase = 4;

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
	fontSizeRatio = Math.abs(fontSizeRatio);
	if (fontSizeRatio > 1) {
		fontSizeRatio = 1 / fontSizeRatio;
	}
	if (cloudWidth > 0 && cloudHeight > 0) {
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
			}) => {
				let boundingWord = new BoundingWord(
					text,
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
				);
				boundingWord.ǂweight = weight;
				return boundingWord;
			})
			.filter(({ǂtextWidth}) => ǂtextWidth > 0)
			.sort((word, otherWord) => otherWord.ǂweight - word.ǂweight);
		if (words.length > 0) {
			let firstWord = words[0];
			let lastWord = Array_last(words);
			let maxWeight = firstWord.ǂweight;
			let minWeight = lastWord.ǂweight;
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
					word.ǂfontSize = Math_mapLinear(word.ǂweight, minWeight, maxWeight, 1, fontSizeRange);
				});
			}
			words.reduceRight((renderingFontSizeFactor, word) => {
				if (word.ǂfontSize < renderingFontSizeInterval * renderingFontSizeFactor) {
					word.ǂfontSize /= renderingFontSizeFactor;
				} else {
					renderingFontSizeFactor = word.ǂfontSize;
					word.ǂfontSize = 1;
				}
				return (word.ǂrenderingFontSizeFactor = renderingFontSizeFactor);
			}, 1);
			words.forEach(word => {
				word.ǂfontSize *= renderingFontSizeBase;
			});
			let grid = new PixelGrid([cloudWidth, cloudHeight]);
			words.reduce((previousWord, currentWord, index) => {
				if (currentWord.ǂrenderingFontSizeFactor < previousWord.ǂrenderingFontSizeFactor) {
					grid.ǂclear();
					let scaleFactor = previousWord.ǂrenderingFontSizeFactor / currentWord.ǂrenderingFontSizeFactor;
					words.slice(0, index).forEach(previousWord => {
						previousWord.ǂfontSize *= scaleFactor;
						grid.ǂput(previousWord.ǂimagePixels, previousWord.ǂimageLeft, previousWord.ǂimageTop);
					});
				} else {
					grid.ǂput(previousWord.ǂimagePixels, previousWord.ǂimageLeft, previousWord.ǂimageTop);
				}
				currentWord.ǂpadding = spacing;
				let [imageLeft, imageTop] = grid.ǂfindFit(currentWord.ǂimagePixels, currentWord.ǂimageLeft, currentWord.ǂimageTop);
				currentWord.ǂimageLeft = imageLeft;
				currentWord.ǂimageTop = imageTop;
				currentWord.ǂpadding = 0;
				return currentWord;
			});
			grid.ǂput(lastWord.ǂimagePixels, lastWord.ǂimageLeft, lastWord.ǂimageTop);
			if (grid.ǂwidth > 0 && grid.ǂheight > 0) {
				let scaleFactor = Math.min(cloudWidth / grid.ǂwidth, cloudHeight / grid.ǂheight);
				words.forEach(word => {
					word.ǂleft -= grid.ǂleft;
					word.ǂtop -= grid.ǂtop;
					word.ǂfontSize *= scaleFactor;
					word.ǂleft += cloudWidth / 2;
					word.ǂtop += cloudHeight / 2;
				});
			}
			return words.map(word => ({
				font: word.ǂfont,
				fontFamily: word.ǂfontFamily,
				fontSize: word.ǂfontSize,
				fontStyle: word.ǂfontStyle,
				fontVariant: word.ǂfontVariant,
				fontWeight: word.ǂfontWeight,
				height: word.ǂboundingBoxHeight,
				left: word.ǂboundingBoxLeft,
				rotationDeg: word.ǂrotationDeg,
				rotationRad: word.ǂrotationRad,
				rotationTurn: word.ǂrotationTurn,
				text: word.ǂtext,
				textWidth: word.ǂtextWidth,
				top: word.ǂboundingBoxTop,
				weight: word.ǂweight,
				width: word.ǂboundingBoxWidth,
			}));
		}
	}
	return [];
}
