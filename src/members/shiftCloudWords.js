export default function(cloudWords, cloudWidth, cloudHeight) {
	cloudWords.forEach(cloudWord => {
		cloudWord.left += cloudWidth / 2;
		cloudWord.top += cloudHeight / 2;
	});
}
