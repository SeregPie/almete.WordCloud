export default function(image, imageWidth, imageHeight) {
	let returns = new Uint8Array(imageWidth * imageHeight);
	for (let i = 0, ii = returns.length; i < ii; ++i) {
		returns[i] = image[i * 4 + 3] ? 1 : 0;
	}
	return returns;
}
