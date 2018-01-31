import Object_hasOwn from '../Object/hasOwn';
import Object_isObject from '../Object/isObject';

let Lang_get = function(target, path) {
	if (path.length < 1) {
		return target;
	}
	if (Object_isObject(target)) {
		let key = path[0];
		if (Object_hasOwn(target, key)) {
			return Lang_get(target[key], path.slice(1));
		}
	}
};

export default Lang_get;
