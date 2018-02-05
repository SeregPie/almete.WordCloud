import Array_min from 'asyma/src/Array/min';
import Array_max from 'asyma/src/Array/max';

export default function(words, cloudWidth, cloudHeight) {
	let wordsLeft = Array_min(words, ({rectLeft}) => rectLeft);
	let wordsLeftUntil = Array_max(words, ({rectLeft, rectWidth}) => rectLeft + rectWidth);
	let minWordsWidth = wordsLeftUntil - wordsLeft;
	let maxWordsWidth = wordsLeftUntil + wordsLeft;

	let wordsTop = Array_min(words, ({rectTop}) => rectTop);
	let wordsTopUntil = Array_max(words, ({rectTop, rectHeight}) => rectTop + rectHeight);
	let minWordsHeight = wordsTopUntil - wordsTop;
	let maxWordsHeight = wordsTopUntil + wordsTop;

	let scaleFactor = Math.min(cloudWidth / minWordsWidth, cloudHeight / minWordsHeight);

	words.forEach(word => {
		word.left -= maxWordsWidth / 2;
		word.top -= maxWordsHeight / 2;

		word.fontSize *= scaleFactor;
		word.textWidth *= scaleFactor;
		word.textHeight *= scaleFactor;
		word.rectWidth *= scaleFactor;
		word.rectHeight *= scaleFactor;
		word.left *= scaleFactor;
		word.top *= scaleFactor;

		word.left += cloudWidth / 2;
		word.top += cloudHeight / 2;
	});
}
