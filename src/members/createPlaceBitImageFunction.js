import BitSpace_isOccupied from './BitSpace_isOccupied';
import BitSpace_occupy from './BitSpace_occupy';
import getOccupiedBitImagePixels from './getOccupiedBitImagePixels';
import findPixel from './findPixel';

export default function(spaceAspect) {
	let space = [];
	return function(image, imageWidth, imageHeight) {
		let occupiedImagePixels = getOccupiedBitImagePixels(image, imageWidth, imageHeight);
		let startImageLeft = -Math.floor(imageWidth / 2);
		let startImageTop = -Math.floor(imageHeight / 2);
		let [imageLeft, imageTop] = findPixel(spaceAspect, [startImageLeft, startImageTop], ([imageLeft, imageTop]) => {
			return occupiedImagePixels.every(([imagePixelLeft, imagePixelTop]) => {
				let spacePixelLeft = imageLeft + imagePixelLeft;
				let spacePixelTop = imageTop + imagePixelTop;
				return BitSpace_isOccupied(space, spacePixelLeft, spacePixelTop);
			});
		});
		occupiedImagePixels.forEach(([imagePixelLeft, imagePixelTop]) => {
			let spacePixelLeft = imageLeft + imagePixelLeft;
			let spacePixelTop = imageTop + imagePixelTop;
			BitSpace_occupy(space, spacePixelLeft, spacePixelTop);
		});
		return [imageLeft, imageTop];
	};
}
