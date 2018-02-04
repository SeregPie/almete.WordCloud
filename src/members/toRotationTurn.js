import Math_degToTurn from 'my-helpers/Math/degToTurn';
import Math_radToTurn from 'my-helpers/Math/radToTurn';

export default function(rotation, rotationUnit) {
	switch (rotationUnit) {
		case 'deg':
			return Math_degToTurn(rotation);
		case 'rad':
			return Math_radToTurn(rotation);
	}
	return rotation;
}
