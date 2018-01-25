import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/almete.WordCloud.js',
	output: {
		file: 'almete.WordCloud.js',
		format: 'umd',
		name: 'almete.WordCloud',
	},
	plugins: [
		buble(),
		uglify(),
	],
};
