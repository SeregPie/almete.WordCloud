import Array_min from 'my-helpers/Array/min';
import Array_max from 'my-helpers/Array/max';
import Math_mapLinear from 'my-helpers/Math/mapLinear';

export default function(words, fontSizeRatio) {
	if (words.length > 0) {
		let minWeight = Array_min(words, ({weight}) => weight);
		let maxWeight = Array_max(words, ({weight}) => weight);
		if (minWeight < maxWeight && fontSizeRatio > 0 && fontSizeRatio < Infinity) {
			if (fontSizeRatio < 1) {
				fontSizeRatio = 1 / fontSizeRatio;
			}
			return words.map(({weight}) => Math_mapLinear(weight, minWeight, maxWeight, 1, fontSizeRatio));
		}
		if (minWeight > 0) {
			return words.map(({weight}) => weight / minWeight);
		}
		let newMinWeight = 1;
		let newMaxWeight = newMinWeight + Math.abs(minWeight) + Math.abs(maxWeight);
		return words.map(({weight}) => Math_mapLinear(weight, minWeight, maxWeight, newMinWeight, newMaxWeight));
	}
	return [];
}
