import Math_degToTurn from 'asyma/src/Math/degToTurn';
import Math_radToTurn from 'asyma/src/Math/radToTurn';

export default function(rotation, rotationUnit) {
	switch (rotationUnit) {
		case 'deg':
			return Math_degToTurn(rotation);
		case 'rad':
			return Math_radToTurn(rotation);
	}
	return rotation;
}
