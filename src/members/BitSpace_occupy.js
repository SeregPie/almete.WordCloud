import Lang_set from '../helpers/Lang/set';

import BitSpace_toPath from './BitSpace_toPath';

export default function(space, left, top) {
	Lang_set(space, BitSpace_toPath(left, top), 1);
}
