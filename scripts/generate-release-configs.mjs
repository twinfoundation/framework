// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * This script will generate configuration files for release-please.
 *
 * Usage:
 * npm run generate-release-configs <path-to-config-directory>
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import {
	directoryExists,
	fileExists,
	gatherDirectoryNames,
	loadJson,
	saveJson
} from './common.mjs';

/**
 * Execute the process.
 */
async function run() {
	process.stdout.write('Generate Release Configs\n');
	process.stdout.write('========================\n');
	process.stdout.write('\n');
	process.stdout.write(`Platform: ${process.platform}\n`);

	if (process.argv.length <= 2) {
		throw new Error('No target directory specified');
	}

	process.stdout.write('\n');
	const targetDirectory = path.resolve(process.argv[2]);

	process.stdout.write(`Target Directory: ${targetDirectory}\n`);

	const packageNames = await gatherDirectoryNames('packages');
	const appNames = await gatherDirectoryNames('apps');
	packageNames.push(...appNames);

	await generateConfig(targetDirectory, 'major', packageNames);
	await generateConfig(targetDirectory, 'minor', packageNames);
	await generateConfig(targetDirectory, 'patch', packageNames);
	await generateConfig(targetDirectory, 'prerelease', packageNames);

	await generateManifest(targetDirectory, 'prerelease', packageNames);
	await generateManifest(targetDirectory, 'prod', packageNames);

	process.stdout.write(`\nDone.\n`);
}

/**
 * Generate the release config.
 * @param targetDirectory The target directory to store the config in.
 * @param semVerType The type of semver to generate the config for.
 * @param packageNames The package names to generate the config for.
 */
async function generateConfig(targetDirectory, semVerType, packageNames) {
	const versioning = {
		major: 'always-bump-major',
		minor: 'always-bump-minor',
		patch: 'always-bump-patch',
		prerelease: 'prerelease'
	};

	process.stdout.write(`\nGenerating config for ${semVerType}...\n`);

	const config = {
		'pull-request-header': `:robot: ${semVerType} release prepared`,
		'release-type': 'node',
		versioning: versioning[semVerType],
		prerelease: semVerType === 'prerelease',
		'prerelease-type': semVerType === 'prerelease' ? 'next' : '',
		packages: {},
		plugins: [
			'node-workspace',
			{
				type: 'linked-versions',
				groupName: 'repo',
				components: []
			}
		]
	};

	for (const packageName of packageNames) {
		config.packages[`packages/${packageName}`] = {
			'package-name': packageName,
			'changelog-path': `docs/changelog.md`
		};

		config.plugins[1].components.push(packageName);
	}

	if (!(await directoryExists(targetDirectory))) {
		await mkdir(targetDirectory, { recursive: true });
	}

	await saveJson(path.join(targetDirectory, `release-please-config.${semVerType}.json`), config);
}

/**
 * Generate the manifest config.
 * @param targetDirectory The target directory to store the config in.
 * @param versionBase The type of version manifest to create.
 * @param packageNames The package names to generate the config for.
 */
async function generateManifest(targetDirectory, versionBase, packageNames) {
	process.stdout.write(`\nGenerating manifest for ${versionBase}...\n`);

	const filename = path.join(targetDirectory, `release-please-manifest.${versionBase}.json`);

	if (!(await fileExists(filename))) {
		const packageJson = await loadJson('package.json');
		const currentVersion = packageJson.version;
		const versionParts = currentVersion.split('-');

		const config = {};

		for (const packageName of packageNames) {
			config[`packages/${packageName}`] = versionBase === 'prod' ? versionParts[0] : currentVersion;
		}

		if (!(await directoryExists(targetDirectory))) {
			await mkdir(targetDirectory, { recursive: true });
		}

		await saveJson(filename, config);
	}
}

run().catch(err => {
	process.stderr.write(`\n${err.stack ?? err}\n`);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
