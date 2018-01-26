export default function(
	words,
	defaultText,
	defaultWeight,
	defaultRotation,
	defaultFontFamily,
	defaultFontStyle,
	defaultFontVariant,
	defaultFontWeight,
) {
	return words.map(({
		text = defaultText,
		weight = defaultWeight,
		rotation = defaultRotation,
		fontFamily = defaultFontFamily,
		fontStyle = defaultFontStyle,
		fontVariant = defaultFontVariant,
		fontWeight = defaultFontWeight,
	}) => ({
		text,
		weight,
		rotation,
		fontFamily,
		fontStyle,
		fontVariant,
		fontWeight,
	}));
}
