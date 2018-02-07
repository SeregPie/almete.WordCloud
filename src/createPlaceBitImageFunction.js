import getOccupiedBitImagePixels from './getOccupiedBitImagePixels';
import findPixel from './findPixel';

export default function(gridAspect) {
	let grid;
	return function(image, imageWidth, imageHeight) {
		let occupiedImagePixels = getOccupiedBitImagePixels(image, imageWidth, imageHeight);
		let imageLeft = -Math.floor(imageWidth / 2);
		let imageTop = -Math.floor(imageHeight / 2);
		if (grid) {
			[imageLeft, imageTop] = findPixel(gridAspect, [imageLeft, imageTop], ([imageLeft, imageTop]) => {
				return occupiedImagePixels.every(([imagePixelLeft, imagePixelTop]) => {
					let gridPixelLeft = imageLeft + imagePixelLeft;
					let gridPixelTop = imageTop + imagePixelTop;
					return !grid[`${gridPixelLeft}|${gridPixelTop}`];
				});
			});
		} else {
			grid = {};
		}
		occupiedImagePixels.forEach(([imagePixelLeft, imagePixelTop]) => {
			let gridPixelLeft = imageLeft + imagePixelLeft;
			let gridPixelTop = imageTop + imagePixelTop;
			grid[`${gridPixelLeft}|${gridPixelTop}`] = true;
		});
		return [imageLeft, imageTop];
	};
}
