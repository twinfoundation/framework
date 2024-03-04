// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import packageDetails from './package.json' with { type: 'json' };

const plugins = [
	commonjs({
		ignoreDynamicRequires: true
	}),
	resolve({
		preferBuiltins: true,
		browser: process.env.BROWSER
	})
];

const globs = {};
for (const dep in packageDetails.dependencies) {
	globs[dep] = dep;
}

export default {
	input: `./dist/esm/index.js`,
	output: {
		file: `dist/cjs/index.cjs`,
		format: 'cjs',
		name: packageDetails.name
			.split('-')
			.map((p) => p[0].toUpperCase() + p.slice(1))
			.join(''),
		compact: false,
		sourcemap: 'inline',
		exports: 'auto',
		globals: globs,
		exports: 'named'
	},
	external: ['fs/promises'].concat(Object.keys(globs)),
	onwarn: (message) => {
		if (!['EMPTY_BUNDLE'].includes(message.code)) {
			console.error(message);
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		}
	},
	plugins
};
