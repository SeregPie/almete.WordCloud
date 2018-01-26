import Array_min from '../helpers/Array/min';
import Array_max from '../helpers/Array/max';

export default function(cloudWords, cloudWidth, cloudHeight) {
	let currentCloudLeft = Array_min(cloudWords, ({left}) => left);
	let currentCloudRight = Array_max(cloudWords, ({left, width}) => left + width);
	let currentCloudWidth = currentCloudRight - currentCloudLeft;

	let currentCloudTop = Array_min(cloudWords, ({top}) => top);
	let currentCloudBottom = Array_max(cloudWords, ({top, height}) => top + height);
	let currentCloudHeight = currentCloudBottom - currentCloudTop;

	let scaleFactor = Math.min(cloudWidth / currentCloudWidth, cloudHeight / currentCloudHeight);

	cloudWords.forEach(cloudWord => {
		cloudWord.fontSize *= scaleFactor;
		cloudWord.left *= scaleFactor;
		cloudWord.top *= scaleFactor;
		cloudWord.width *= scaleFactor;
		cloudWord.height *= scaleFactor;
	});
}
