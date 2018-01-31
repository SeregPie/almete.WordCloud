import Object_hasOwn from '../Object/hasOwn';
import Object_isObject from '../Object/isObject';

let Lang_set = function(target, path, value) {
	if (path.length < 1) {
		return value;

	if (path.length > 0) {
		let key = path[0];
		if (!Object_isObject(target)) {
			target[key] = path[1] ? [] : {};
		}

		if (path.length > 1) {
			if (!Object_hasOwn(target, key)) {
				target[key] = path[1] ? [] : {};
			}
			Lang_set(target[key], path.slice(1), value);
		} else {
			target[key] = value;
		}
	}
	if (Object_isObject(target)) {
		if (path.length > 0) {
			let key = path[0];
			if (path.length > 1) {
				if (!Object_hasOwn(target, key)) {
					target[key] = path[1] ? [] : {};
				}
				Lang_set(target[key], path.slice(1), value);
			} else {
				target[key] = value;
			}
		}
	}
};

export default Lang_set;
