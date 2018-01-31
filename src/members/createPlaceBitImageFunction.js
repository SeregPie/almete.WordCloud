import getOccupiedBitImagePixels from './getOccupiedBitImagePixels';
import findPixel from './findPixel';

export default function(spaceAspect) {
	let space;
	return function(image, imageWidth, imageHeight) {
		let occupiedImagePixels = getOccupiedBitImagePixels(image, imageWidth, imageHeight);
		let imageLeft = -Math.floor(imageWidth / 2);
		let imageTop = -Math.floor(imageHeight / 2);
		if (space) {
			[imageLeft, imageTop] = findPixel(spaceAspect, [imageLeft, imageTop], ([imageLeft, imageTop]) => {
				return occupiedImagePixels.every(([imagePixelLeft, imagePixelTop]) => {
					let spacePixelLeft = imageLeft + imagePixelLeft;
					let spacePixelTop = imageTop + imagePixelTop;
					return !space[`${spacePixelLeft}|${spacePixelTop}`];
				});
			});
		} else {
			space = {};
		}
		occupiedImagePixels.forEach(([imagePixelLeft, imagePixelTop]) => {
			let spacePixelLeft = imageLeft + imagePixelLeft;
			let spacePixelTop = imageTop + imagePixelTop;
			space[`${spacePixelLeft}|${spacePixelTop}`] = true;
		});
		return [imageLeft, imageTop];
	};
}
