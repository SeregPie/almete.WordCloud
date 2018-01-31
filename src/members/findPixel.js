export default function(aspect, [left, top], iteratee) {
	let stepLeft = Math.random() < 1/2 ? 1 : -1;
	let stepTop = Math.random() < 1/2 ? 1 : -1;
	for (;;) {
		let value = [left, top];
		if (iteratee(value)) {
			break;
		}
		left += stepLeft;
		top += stepTop;
	}
	return [left, top];
}
