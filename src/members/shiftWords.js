export default function(words, cloudWidth, cloudHeight) {
	words.forEach(word => {
		word.left += cloudWidth / 2;
		word.top += cloudHeight / 2;
	});
}
