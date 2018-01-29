import createBitSpace from './createBitSpace';
import BitSpace_get from './BitSpace_get';
import BitSpace_set from './BitSpace_set';

export default function(cloudAspect) {
	let space = createBitSpace();
	return function(image, imageWidth, imageHeight) {
		return [-imageWidth / 2, -imageHeight / 2];
	};
}
