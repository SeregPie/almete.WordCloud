import Array_min from '../helpers/Array/min';
import Array_max from '../helpers/Array/max';

export default function(cloudWords, cloudWidth, cloudHeight) {
	let currentCloudLeft = Array_min(cloudWords, ({rectLeft}) => rectLeft);
	let currentCloudRight = Array_max(cloudWords, ({rectLeft, rectWidth}) => rectLeft + rectWidth);
	let currentCloudWidth = currentCloudRight - currentCloudLeft;

	let currentCloudTop = Array_min(cloudWords, ({rectTop}) => rectTop);
	let currentCloudBottom = Array_max(cloudWords, ({rectTop, rectHeight}) => rectTop + rectHeight);
	let currentCloudHeight = currentCloudBottom - currentCloudTop;

	let scaleFactor = Math.min(cloudWidth / currentCloudWidth, cloudHeight / currentCloudHeight);

	cloudWords.forEach(cloudWord => {
		cloudWord.fontSize *= scaleFactor;
		cloudWord.textWidth *= scaleFactor;
		cloudWord.textHeight *= scaleFactor;
		cloudWord.rectWidth *= scaleFactor;
		cloudWord.rectHeight *= scaleFactor;
		cloudWord.rectLeft *= scaleFactor;
		cloudWord.rectTop *= scaleFactor;
	});
}
