export default function(cloudWords, cloudWidth, cloudHeight) {
	cloudWords.forEach(cloudWord => {
		cloudWord.rectLeft += cloudWidth / 2;
		cloudWord.rectTop += cloudHeight / 2;
	});
}
