export default function(space, ...path) {
	path.every(x => {
		if (space) {
			if (x < 0) {
				space = space[1][-x];
			} else {
				space = space[0][x];
			}
			return true;
		}
		return false;
	});
	return space;
}
