export default function(style, variant, weight, size, family) {
	return [style, variant, weight, `${size}px`, family].join(' ');
}
