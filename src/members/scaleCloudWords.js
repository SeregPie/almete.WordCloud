import Array_min from '../helpers/Array/min';
import Array_max from '../helpers/Array/max';

export default function(cloudWords, cloudWidth, cloudHeight) {
	let cloudLeftStart = Array_min(cloudWords, ({rectLeft}) => rectLeft);
	let cloudLeftUntil = Array_max(cloudWords, ({rectLeft, rectWidth}) => rectLeft + rectWidth);
	let newCloudWidth = cloudLeftUntil - cloudLeftStart;

	let cloudTopStart = Array_min(cloudWords, ({rectTop}) => rectTop);
	let cloudTopUntil = Array_max(cloudWords, ({rectTop, rectHeight}) => rectTop + rectHeight);
	let newCloudHeight = cloudTopUntil - cloudTopStart;

	let scaleFactor = Math.min(cloudWidth / newCloudWidth, cloudHeight / newCloudHeight);

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
