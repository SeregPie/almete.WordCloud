export default function(space, left, top) {
	path.forEach(x => {
		if (space) {
			if (x < 0) {
				space = space[1][-x];
			} else {
				space = space[0][x];
			}
			return true;
		} else {
			// pass
		}
		return false;
	});
	{
		let i;
		if (left < 0) {
			left = -left - 1;
			i = 1;
		} else {
			i = 0;
		}
		if (space[i][left]) {
			space = space[i][left];
		} else {
			space[i][left] = (space = createBitSpace());
		}
	}
	{
		let i;
		if (top < 0) {
			top = -1 - top;
			i = 1;
		} else {
			i = 0;
		}
		space[i][top] = value;
	}


	return space;
}
