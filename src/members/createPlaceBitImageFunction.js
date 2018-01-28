export default function(containerAspect) {
	return function(image, imageWidth, imageHeight) {
		return [-imageWidth / 2, -imageHeight / 2];
	};
}
