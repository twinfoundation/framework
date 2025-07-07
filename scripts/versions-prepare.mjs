// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * This script is used to update the package versions when promoting
 * the next branch to production, or updating the next version after release.
 *
 * It handles two main scenarios:
 * 1. Production: Updates all packages from prerelease versions to stable versions
 * 2. Next: Updates all packages to the next prerelease version for development
 *
 * The script also manages internal dependencies between @twin.org packages,
 * ensuring they reference the correct versions of each other.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { execAsync, loadJson, saveJson } from './common.mjs';

const MANIFEST_PRODUCTION_FILENAME = 'release/release-please-manifest.prod.json';
const MANIFEST_PRERELEASE_FILENAME = 'release/release-please-manifest.prerelease.json';
const CONFIG_PRERELEASE_FILENAME = 'release/release-please-config.prerelease.json';

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

	process.stdout.write(`Command: ${command}\n\n`);

	// Read the production release manifest to determine version information
	// This file contains the current stable versions of all packages
	process.stdout.write(`Loading release-please manifest: ${MANIFEST_PRODUCTION_FILENAME}\n\n`);
	const releaseManifestProd = await loadJson(MANIFEST_PRODUCTION_FILENAME);

	// Extract the current production version from the first package in the manifest
	// All packages in the monorepo should have the same version
	const prodVersion = Object.entries(releaseManifestProd)[0][1];

	// Calculate the next prerelease version by incrementing the patch number
	// Example: 1.2.3 -> 1.2.4-next.0
	const versionParts = prodVersion.split('.');
	const nextPatch = Number.parseInt(versionParts[2], 10) + 1;
	const nextVersion = `${versionParts[0]}.${versionParts[1]}.${nextPatch}-next.0`;

	process.stdout.write(`Production Version: ${prodVersion}\n`);
	process.stdout.write(`Next Version: ${nextVersion}\n\n`);

	// Load the root package.json to get the list of workspaces
	const repoPackageJson = await loadJson('package.json');

	const versionCache = {};
	const isProduction = command === 'production';

	for (const workspace of repoPackageJson.workspaces) {
		const workspacePackageJsonFilename = path.join(workspace, 'package.json');
		process.stdout.write(`Processing: ${workspacePackageJsonFilename}\n`);

		// Load the current package.json for this workspace
		const workspacePackageJson = await loadJson(workspacePackageJsonFilename);

		// Process the package: update version and dependencies
		const updatedPackage = await processPackage(
			isProduction,
			prodVersion,
			nextVersion,
			workspacePackageJson,
			versionCache
		);

		// Save the updated package.json
		await saveJson(workspacePackageJsonFilename, updatedPackage);
	}

	// If we're updating for next (prerelease), also update the prerelease manifest
	// This ensures release-please knows about the new prerelease versions
	if (!isProduction) {
		// If we are updating the next version, we also need to update the
		// release-please manifest for next.
		process.stdout.write(`Updating release-please manifest: ${MANIFEST_PRERELEASE_FILENAME}\n`);
		const releaseManifestNext = await loadJson(MANIFEST_PRERELEASE_FILENAME);

		const keys = Object.keys(releaseManifestNext);
		for (const key of keys) {
			releaseManifestNext[key] = nextVersion;
		}

		await saveJson(MANIFEST_PRERELEASE_FILENAME, releaseManifestNext);

		// We also need to update any files specified in the release-please-manifest
		process.stdout.write('Updating release-please-config extra-files\n');
		const releaseConfig = await loadJson(CONFIG_PRERELEASE_FILENAME);
		if (releaseConfig.packages) {
			for (const packageName of Object.keys(releaseConfig.packages)) {
				const packageConfig = releaseConfig.packages[packageName];
				if (Array.isArray(packageConfig['extra-files'])) {
					for (const extraFile of packageConfig['extra-files']) {
						const filename = path.join(packageName, extraFile);
						process.stdout.write(`\tProcessing: ${filename}\n`);
						const contents = await fs.readFile(filename, 'utf8');
						const lines = contents.split('\n');
						for (let i = 0; i < lines.length; i++) {
							if (lines[i].includes('x-release-please-version')) {
								lines[i] = lines[i].replace(prodVersion, nextVersion);
							}
						}
						await fs.writeFile(filename, lines.join('\n'), 'utf8');
					}
				}
			}
			await saveJson(CONFIG_PRERELEASE_FILENAME, releaseConfig);
		}
	}

	process.stdout.write('\nDone.\n');
}

/**
 * Process a workspace package.
 * @param isProduction Whether the command is for production or next.
 * @param prodVersion The production version to use when processing the package.
 * @param nextVersion The next version to use when processing the package.
 * @param workspacePackageJson The package.json of the workspace to process.
 * @param versionCache A cache for package versions to avoid redundant lookups.
 * @returns The updated package.json.
 */
async function processPackage(
	isProduction,
	prodVersion,
	nextVersion,
	workspacePackageJson,
	versionCache
) {
	// Update the package's own version based on the operation type
	if (isProduction) {
		// For production: set to the stable production version
		workspacePackageJson.version = prodVersion;
	} else {
		// For next: set to the next prerelease version
		workspacePackageJson.version = nextVersion;
	}

	// Cache this package's version to avoid redundant lookups when processing dependencies
	versionCache[workspacePackageJson.name] = workspacePackageJson.version;

	// Process all types of dependencies that might reference other @twin.org packages
	// This ensures internal dependencies are updated to the correct versions
	await processDependencies(
		isProduction,
		prodVersion,
		workspacePackageJson.dependencies,
		versionCache,
		false
	);
	await processDependencies(
		isProduction,
		prodVersion,
		workspacePackageJson.devDependencies,
		versionCache,
		false
	);
	await processDependencies(
		isProduction,
		prodVersion,
		workspacePackageJson.peerDependencies,
		versionCache,
		true
	);

	return workspacePackageJson;
}

/**
 * Process the dependencies of a package.
 * @param isProduction Whether the command is for production or next.
 * @param prodVersion The production version to use when processing the dependencies.
 * @param dependencies The dependencies to process.
 * @param versionCache A cache for package versions to avoid redundant lookups.
 * @param isPeerDependency Whether the dependencies are peer dependencies.
 */
async function processDependencies(
	isProduction,
	prodVersion,
	dependencies,
	versionCache,
	isPeerDependency
) {
	if (!dependencies) {
		return;
	}
	for (const [name, version] of Object.entries(dependencies)) {
		// Only process @twin.org packages (internal dependencies)
		if (name.startsWith('@twin.org')) {
			if (isPeerDependency) {
				// If it's a peer dependency, we just match the major version
				// This allows the package to work with any compatible version
				await getPackageVersion(name, 'latest', versionCache);
				const latest = versionCache[name];
				const latestMajor = Number.parseInt(latest.split('.')[0], 10);
				dependencies[name] = `>=${latestMajor}.0.0-0 <${latestMajor + 1}.0.0`;
			} else if (isProduction) {
				// PRODUCTION MODE: Convert "next" references to actual published versions
				// If the dependency is set to "next", we need to resolve it to the actual version
				// Set the dependency to a caret range of the resolved or production version
				// This allows compatible updates (e.g., ^1.2.3 allows 1.2.4 but not 1.3.0)
				if (version === 'next') {
					// If the package is set to "next", we resolve it to the latest stable
					await getPackageVersion(name, 'latest', versionCache);
				}
				dependencies[name] = `^${versionCache[name] ?? prodVersion}`;
			} else if (!isProduction) {
				// NEXT MODE: Convert fixed versions back to "next" references
				// For development, use either the cached version which will be a local package
				// or "next" to get latest prerelease
				if (version.startsWith('^')) {
					dependencies[name] = versionCache[name] ?? 'next';
				} else {
					await getPackageVersion(name, 'next', versionCache);
					dependencies[name] = versionCache[name];
				}
			}
		}
	}
}

/**
 * Get the version of a package from npm.
 * @param name The name of the package to get the version for.
 * @param tag The tag to use when fetching the version (e.g., "next").
 * @param versionCache A cache for package versions to avoid redundant lookups.
 */
async function getPackageVersion(name, tag, versionCache) {
	if (!versionCache[name]) {
		process.stdout.write(`\tResolving Version for: ${name}@${tag}\n`);
		const version = await execAsync(`npm view "${name}@${tag}" version`);
		versionCache[name] = version;
		process.stdout.write(`\t\tVersion: ${versionCache[name]}\n`);
	}
}

run().catch(err => {
	process.stderr.write(`${err.message}\n${err.stack}`);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
