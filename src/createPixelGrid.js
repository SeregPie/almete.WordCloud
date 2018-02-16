import findPixel from './findPixel';

export default function(gridAspect) {
	let grid = {};
	return {
		placePixels(pixels, left, top) {
			pixels.forEach(([pixelLeft, pixelTop]) => {
				let gridPixelLeft = left + pixelLeft;
				let gridPixelTop = top + pixelTop;
				grid[`${gridPixelLeft}|${gridPixelTop}`] = true;
			});
		},

		fitPixels(pixels, left, top) {
			return findPixel(gridAspect, [left, top], ([left, top]) => {
				return pixels.every(([pixelLeft, pixelTop]) => {
					let gridPixelLeft = left + pixelLeft;
					let gridPixelTop = top + pixelTop;
					return !grid[`${gridPixelLeft}|${gridPixelTop}`];
				});
			});
		},
	};
}
