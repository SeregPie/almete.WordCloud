import Array_min from '../helpers/Array/min';
import Array_max from '../helpers/Array/max';

export default function(words, cloudWidth, cloudHeight) {
	let cloudLeftStart = Array_min(words, ({rectLeft}) => rectLeft);
	let cloudLeftUntil = Array_max(words, ({rectLeft, rectWidth}) => rectLeft + rectWidth);
	let newCloudWidth = cloudLeftUntil - cloudLeftStart;

	let cloudTopStart = Array_min(words, ({rectTop}) => rectTop);
	let cloudTopUntil = Array_max(words, ({rectTop, rectHeight}) => rectTop + rectHeight);
	let newCloudHeight = cloudTopUntil - cloudTopStart;

	let scaleFactor = Math.min(cloudWidth / newCloudWidth, cloudHeight / newCloudHeight);

	words.forEach(word => {
		word.fontSize *= scaleFactor;
		word.textWidth *= scaleFactor;
		word.textHeight *= scaleFactor;
		word.rectWidth *= scaleFactor;
		word.rectHeight *= scaleFactor;
		word.left *= scaleFactor;
		word.top *= scaleFactor;
	});
}
