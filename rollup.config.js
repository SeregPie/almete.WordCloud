import {terser} from 'rollup-plugin-terser';
import buble from 'rollup-plugin-buble';
import path from 'path';

import {main} from './package.json';

export default {
	input: 'src/index.js',
	output: {
		file: main,
		format: 'umd',
		name: path.basename(main, path.extname(main)),
	},
	plugins: [
		buble(),
		terser({mangle: {properties: {regex: /^_/}}}),
	],
};
