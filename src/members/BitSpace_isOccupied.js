import Lang_get from '../helpers/Lang/get';

import BitSpace_toPath from './BitSpace_toPath';

export default function(space, left, top) {
	return !!Lang_get(space, BitSpace_toPath(left, top));
}
