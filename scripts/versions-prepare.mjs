// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * This script is used to update the package versions when promoting
 * the next branch to production, or updating the next version after release.
 */
import path from 'node:path';
import { execAsync, fileExists, loadJson, saveJson } from './common.mjs';

/**
 * Execute the process.
 */
async function run() {
	process.stdout.write('Versions Prepare\n');
	process.stdout.write('================\n');
	process.stdout.write('\n');
	process.stdout.write(`Platform: ${process.platform}\n`);
	process.stdout.write('\n');

	if (process.argv.length <= 2) {
		throw new Error('No command specified, use either production or next');
	}

	const command = process.argv[2];
	if (command !== 'production' && command !== 'next') {
		throw new Error('Invalid command specified, use either production or next');
	}

	process.stdout.write(`Command: ${command}\n`);

	const packageJson = await loadJson('package.json');

	const versionCache = {};
	const isProduction = command === 'production';

	for (const workspace of packageJson.workspaces) {
		const workspacePackageJsonFilename = path.join(workspace, 'package.json');
		if (await fileExists(workspacePackageJsonFilename)) {
			process.stdout.write(`Processing: ${workspacePackageJsonFilename}\n`);

			const workspacePackageJson = await loadJson(workspacePackageJsonFilename);

			const updatedPackage = await processPackage(isProduction, workspacePackageJson, versionCache);

			await saveJson(workspacePackageJsonFilename, updatedPackage);
		}
	}

	process.stdout.write('\nDone.\n');
}

/**
 * Process a workspace package.
 * @param isProduction Whether the command is for production or next.
 * @param workspacePackageJson The package.json of the workspace to process.
 * @param versionCache A cache for package versions to avoid redundant lookups.
 * @returns The updated package.json.
 */
async function processPackage(isProduction, workspacePackageJson, versionCache) {
	const originalVersion = workspacePackageJson.version;

	const releaseParts = workspacePackageJson.version.split('-');

	if (isProduction) {
		// Remove any pre-release tags.
		workspacePackageJson.version = releaseParts[0];
	} else {
		// Ensure the version is a pre-release version.
		// By using the current prod version and incrementing the patch version.
		const versionParts = releaseParts[0].split('.');
		const nextPatch = Number.parseInt(versionParts[2], 10) + 1;
		workspacePackageJson.version = `${versionParts[0]}.${versionParts[1]}.${nextPatch}-next.0`;
	}

	versionCache[workspacePackageJson.name] = workspacePackageJson.version;

	// Convert all `next` dependencies to the current version for prod.
	// Or the fixed version back to `next` for next.
	await processDependencies(
		isProduction,
		workspacePackageJson.dependencies,
		versionCache,
		originalVersion
	);
	await processDependencies(
		isProduction,
		workspacePackageJson.devDependencies,
		versionCache,
		originalVersion
	);
	await processDependencies(
		isProduction,
		workspacePackageJson.peerDependencies,
		versionCache,
		originalVersion
	);

	return workspacePackageJson;
}

/**
 * Process the dependencies of a package.
 * @param isProduction Whether the command is for production or next.
 * @param dependencies The dependencies to process.
 * @param versionCache A cache for package versions to avoid redundant lookups.
 * @param packageVersion The version of the package being processed.
 */
async function processDependencies(isProduction, dependencies, versionCache, packageVersion) {
	if (!dependencies) {
		return;
	}
	for (const [name, version] of Object.entries(dependencies)) {
		if (name.startsWith('@twin.org')) {
			if (isProduction && (version === 'next' || version === packageVersion)) {
				if (!versionCache[name]) {
					process.stdout.write(`\tResolving Version for: ${name}\n`);
					versionCache[name] = await execAsync(`npm view "${name}" version`);
					process.stdout.write(`\tVersion: ${versionCache[name]}\n`);
				}
				dependencies[name] = `^${versionCache[name]}`;
			} else if (!isProduction) {
				dependencies[name] = versionCache[name] ?? 'next';
			}
		}
	}
}

run().catch(err => {
	process.stderr.write(`${err}\n`);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
