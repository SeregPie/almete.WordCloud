import Array_last from '/utils/Array/last';
import Math_degToRad from '/utils/Math/degToRad';
import Math_mapLinear from '/utils/Math/mapLinear';
import Math_radToDeg from '/utils/Math/radToDeg';
import Math_radToTurn from '/utils/Math/radToTurn';
import Math_turnToRad from '/utils/Math/turnToRad';

import getBoundingBoxHeight from './getBoundingBoxHeight';
import getBoundingBoxWidth from './getBoundingBoxWidth';
import getFont from './getFont';
import PixelGrid from './PixelGrid';

let renderingFontSizeBase = 4;

export default function(words, cloudWidth, cloudHeight, {
	createCanvas = function() {
		return document.createElement('canvas');
	},
	fontFamily: defaultFontFamily = 'serif',
	fontSizeRatio = 0,
	fontStyle: defaultFontStyle = 'normal',
	fontVariant: defaultFontVariant= 'normal',
	fontWeight: defaultFontWeight = 'normal',
	gap = 0,
	rotation: defaultRotation = 0,
	rotationUnit: defaultRotationUnit = 'turn',
	text: defaultText = '',
	weight: defaultWeight = 1,
} = {}) {
	if (cloudWidth && cloudHeight) {
		let Word = class {
			constructor() {
				this.ǂfontSize = 1;
				this.ǂleft = 0;
				this.ǂtop = 0;
			}
			get ǂfont() {
				return getFont(
					this.ǂfontStyle,
					this.ǂfontVariant,
					this.ǂfontWeight,
					this.ǂfontSize,
					this.ǂfontFamily,
				);
			}
			get ǂtextWidth() {
				return this.ǂrelativeTextWidth * this.ǂfontSize;
			}
			get ǂrotationDeg() {
				return Math_radToDeg(this.ǂrotationRad);
			}
			get ǂrotationTurn() {
				return Math_radToTurn(this.ǂrotationRad);
			}
			get ǂcenterLeft() {
				return this.ǂleft + this.ǂwidth / 2;
			}
			get ǂcenterTop() {
				return this.ǂtop + this.ǂheight / 2;
			}
			get ǂwidth() {
				return getBoundingBoxWidth(
					this.ǂtextWidth,
					this.ǂfontSize,
					this.ǂrotationRad,
				);
			}
			get ǂheight() {
				return getBoundingBoxHeight(
					this.ǂtextWidth,
					this.ǂfontSize,
					this.ǂrotationRad,
				);
			}
			ǂ_getImage(relativeLineWidth) {
				let lineWidth = relativeLineWidth * this.ǂfontSize;
				let canvas = createCanvas();
				canvas.width = Math.round(getBoundingBoxWidth(
					lineWidth + this.ǂfontSize * 2 + this.ǂtextWidth,
					lineWidth + this.ǂfontSize * 3,
					this.ǂrotationRad,
				));
				canvas.height = Math.round(getBoundingBoxHeight(
					lineWidth + this.ǂfontSize * 2 + this.ǂtextWidth,
					lineWidth + this.ǂfontSize * 3,
					this.ǂrotationRad,
				));
				let ctx = canvas.getContext('2d');
				ctx.translate(canvas.width / 2, canvas.height / 2);
				ctx.rotate(this.ǂrotationRad);
				ctx.font = this.ǂfont;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(this.ǂtext, 0, 0);
				if (lineWidth > 0) {
					ctx.miterLimit = 1;
					ctx.lineWidth = lineWidth;
					ctx.strokeText(this.ǂtext, 0, 0);
				}
				return ctx.getImageData(0, 0, canvas.width, canvas.height);
			}
			ǂfindFit(grid) {
				let image = this.ǂ_getImage(gap * 2);
				let [imageLeft, imageTop] = grid.ǂfindFit(image);
				this.ǂleft = imageLeft + (image.width - this.ǂwidth) / 2;
				this.ǂtop = imageTop + (image.height - this.ǂheight) / 2;
			}
			ǂput(grid) {
				let image = this.ǂ_getImage(0);
				let imageLeft = Math.round(this.ǂleft - (image.width - this.ǂwidth) / 2);
				let imageTop = Math.round(this.ǂtop - (image.height - this.ǂheight) / 2);
				grid.ǂput(image, imageLeft, imageTop);
			}
			ǂscale(scaling) {
				this.ǂfontSize *= scaling;
				this.ǂleft *= scaling;
				this.ǂtop *= scaling;
			}
		};
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
			}) => Object.assign(new Word(), {
				ǂfontFamily: fontFamily,
				ǂfontStyle: fontStyle,
				ǂfontVariant: fontVariant,
				ǂfontWeight: fontWeight,
				ǂrelativeTextWidth: (() => {
					let canvas = createCanvas();
					let ctx = canvas.getContext('2d');
					ctx.font = getFont(
						fontStyle,
						fontVariant,
						fontWeight,
						1,
						fontFamily,
					);
					return ctx.measureText(text).width;
				})(),
				ǂrotationRad: (() => {
					switch (rotationUnit) {
						case 'deg':
							return Math_degToRad(rotation);
						case 'turn':
							return Math_turnToRad(rotation);
					}
					return rotation;
				})(),
				ǂtext: text,
				ǂweight: weight,
			}))
			.filter(({ǂtextWidth}) => ǂtextWidth);
		if (words.length) {
			let sortedWords = words
				.slice()
				.sort((word, otherWord) => otherWord.ǂweight - word.ǂweight);
			let firstWord = sortedWords[0];
			let lastWord = Array_last(sortedWords);
			let maxWeight = firstWord.ǂweight;
			let minWeight = lastWord.ǂweight;
			if (minWeight < maxWeight) {
				fontSizeRatio = Math.abs(fontSizeRatio);
				fontSizeRatio = (() => {
					if (fontSizeRatio > 1) {
						return fontSizeRatio;
					}
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
					word.ǂfontSize = Math_mapLinear(word.ǂweight, minWeight, maxWeight, 1 / fontSizeRatio, 1) * renderingFontSizeBase;
				});
			}
			let grid = new PixelGrid([cloudWidth, cloudHeight]);
			sortedWords.reduce((previousWord, word, index) => {
				if (word.ǂfontSize < renderingFontSizeBase) {
					do {
						words.forEach(word => {
							word.ǂscale(2);
						});
					} while (word.ǂfontSize < renderingFontSizeBase);
					sortedWords
						.slice(0, index)
						.forEach(previousWord => {
							previousWord.ǂput(grid);
						});
				} else {
					previousWord.ǂput(grid);
				}
				word.ǂfindFit(grid);
				return word;
			});
			lastWord.ǂput(grid);
			if (grid.ǂwidth && grid.ǂheight) {
				let scaling = Math.min(cloudWidth / grid.ǂwidth, cloudHeight / grid.ǂheight);
				words.forEach(word => {
					word.ǂleft -= grid.ǂcenterLeft;
					word.ǂtop -= grid.ǂcenterTop;
					word.ǂscale(scaling);
					word.ǂleft += cloudWidth / 2;
					word.ǂtop += cloudHeight / 2;
				});
			}
			return words.map(word => ({
				centerLeft: word.ǂcenterLeft,
				centerTop: word.ǂcenterTop,
				font: word.ǂfont,
				fontFamily: word.ǂfontFamily,
				fontSize: word.ǂfontSize,
				fontStyle: word.ǂfontStyle,
				fontVariant: word.ǂfontVariant,
				fontWeight: word.ǂfontWeight,
				height: word.ǂheight,
				left: word.ǂleft,
				rotationDeg: word.ǂrotationDeg,
				rotationRad: word.ǂrotationRad,
				rotationTurn: word.ǂrotationTurn,
				text: word.ǂtext,
				textWidth: word.ǂtextWidth,
				top: word.ǂtop,
				weight: word.ǂweight,
				width: word.ǂwidth,
			}));
		}
	}
	return [];
}
