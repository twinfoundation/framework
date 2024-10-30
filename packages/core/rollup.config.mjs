// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import packageDetails from './package.json' with { type: 'json' };

const isEsm = process.env.MODULE === 'esm';

const plugins = [];

const globs = {};
if (packageDetails.dependencies) {
	for (const dep in packageDetails.dependencies) {
		globs[dep] = dep;
	}
}
if (packageDetails.peerDependencies) {
	for (const dep in packageDetails.peerDependencies) {
		globs[dep] = dep;
	}
}
if (packageDetails.devDependencies) {
	for (const dep in packageDetails.devDependencies) {
		globs[dep] = dep;
	}
}

export default {
	input: `./dist/es/index.js`,
	output: {
		file: isEsm ? `dist/esm/index.mjs` : `dist/cjs/index.cjs`,
		format: isEsm ? 'esm' : 'cjs',
		name: packageDetails.name
			.split('-')
			.map(p => p[0].toUpperCase() + p.slice(1))
			.join(''),
		compact: false,
		exports: 'auto',
		globals: globs
	},
	external: [/^node:.*/].concat(Object.keys(globs).map(g => new RegExp(`^${g}`))),
	onwarn: message => {
		if (!['EMPTY_BUNDLE', 'CIRCULAR_DEPENDENCY'].includes(message.code)) {
			process.stderr.write(`${message}\n`);
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		}
	},
	plugins
};
