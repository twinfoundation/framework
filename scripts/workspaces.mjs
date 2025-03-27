// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * This script is used to perform actions across the whole repo.
 * It is much like using the --workspaces option for npm commands,
 * but it fails fast when there is an error.
 */
import path from 'node:path';
import FastGlob from 'fast-glob';
import { fileExists, loadJson, runShellCmd } from './common.mjs';

/**
 * Execute the process.
 */
async function run() {
	process.stdout.write('Workspaces\n');
	process.stdout.write('==========\n');
	process.stdout.write('\n');
	process.stdout.write(`Platform: ${process.platform}\n`);

	if (process.argv.length <= 2) {
		throw new Error('No command specified');
	}

	const command = process.argv[2];
	process.stdout.write(`Command: ${command}\n`);

	const packageJson = await loadJson('package.json');

	const workspaces = await FastGlob(packageJson.workspaces, { onlyDirectories: true });

	for (const workspace of workspaces) {
		const workspacePackageJsonFilename = path.join(workspace, 'package.json');
		if (await fileExists(workspacePackageJsonFilename)) {
			const workspacePackageJson = await loadJson(workspacePackageJsonFilename);
			if (workspacePackageJson?.scripts?.[command]) {
				await runShellCmd('npm', ['run', command], workspace);
			}
		}
	}
}

run().catch(err => {
	process.stderr.write(`${err}\n`);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
