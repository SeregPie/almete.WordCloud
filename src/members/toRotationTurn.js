import Math_degToTurn from '../helpers/Math/degToTurn';
import Math_radToTurn from '../helpers/Math/radToTurn';

export default function(rotation, rotationUnit) {
	switch (rotationUnit.toLowerCase()) {
		case 'rad':
			return Math_radToTurn(rotation);
		case 'deg':
			return Math_degToTurn(rotation);
	}
	return rotation;
}
