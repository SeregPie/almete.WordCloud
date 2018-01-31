export default function(space, left, top) {
	let returns = [];
	[left, top].forEach(position => {
		if (position < 0) {
			returns.push(1, -position - 1);
		} else {
			returns.push(0, position);
		}
	});
	return returns;
}
