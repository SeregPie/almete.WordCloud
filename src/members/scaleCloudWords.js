import Array_min from '../helpers/Array/min';
import Array_max from '../helpers/Array/max';

export default function(cloudWords, cloudWidth, cloudHeight) {
	let cloudLeftStart = Array_min(cloudWords, ({left, rectWidth}) => left - rectWidth / 2);
	let cloudLeftUntil = Array_max(cloudWords, ({left, rectWidth}) => left + rectWidth / 2);
	let newCloudWidth = cloudLeftUntil - cloudLeftStart;

	let cloudTopStart = Array_min(cloudWords, ({top, rectHeight}) => top - rectHeight / 2);
	let cloudTopUntil = Array_max(cloudWords, ({top, rectHeight}) => top + rectHeight / 2);
	let newCloudHeight = cloudTopUntil - cloudTopStart;

	let scaleFactor = Math.min(cloudWidth / newCloudWidth, cloudHeight / newCloudHeight);

	cloudWords.forEach(cloudWord => {
		cloudWord.fontSize *= scaleFactor;
		cloudWord.textWidth *= scaleFactor;
		cloudWord.textHeight *= scaleFactor;
		cloudWord.rectWidth *= scaleFactor;
		cloudWord.rectHeight *= scaleFactor;
		cloudWord.left *= scaleFactor;
		cloudWord.top *= scaleFactor;
	});
}
