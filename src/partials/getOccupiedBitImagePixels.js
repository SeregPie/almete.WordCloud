export default function(image, imageWidth, imageHeight) {
	let occupiedBitImagePixels = [];
	for (let pixelLeft = 0; pixelLeft < imageWidth; ++pixelLeft) {
		for (let pixelTop = 0; pixelTop < imageHeight; ++pixelTop) {
			if (image[imageWidth * pixelTop + pixelLeft]) {
				occupiedBitImagePixels.push([pixelLeft, pixelTop]);
			}
		}
	}
	return occupiedBitImagePixels;
}
