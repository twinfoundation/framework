// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * This script is used to link local instances of npm packages in node_modules
 * without using npm commands. When using the <package-name> option, the script
 * will try to find the package in the sibling folders and link it.
 *
 * Usage:
 * npm run local-link <package-name>
 * or
 * npm run local-link /path/to/package
 *
 * To unlink
 * npm run local-link <package-name> unlink
 * or
 * npm run local-link /path/to/package unlink
 */
import fs, { readdir } from 'node:fs/promises';
import path from 'node:path';
import { directoryExists, fileExists, isSymbolicLink, loadJson, runShellCmd } from './common.mjs';

/**
 * Execute the process.
 */
async function run() {
	process.stdout.write('Local Link\n');
	process.stdout.write('==========\n');
	process.stdout.write('\n');
	process.stdout.write(`Platform: ${process.platform}\n`);

	if (process.argv.length <= 2) {
		throw new Error('No target package specified');
	}

	process.stdout.write('\n');
	const targetPackage = process.argv[2];
	if (process.argv[3] === 'unlink') {
		await unlinkPackage(targetPackage);
	} else {
		await linkPackage(targetPackage);
	}

	process.stdout.write(`\nDone.\n`);
}

/**
 * Link the specified package.
 * @param targetPackage The target package to link.
 */
async function linkPackage(targetPackage) {
	process.stdout.write(`Linking package\n\n`);

	// The target package starts with an @ so we have to try and locate it by
	// looking in the parent folder and assuming the other repos are in
	// a sibling folder to this one
	const { targetDir, packageName } = await findPackageDetails(targetPackage);

	const nodeModulesDir = path.resolve('node_modules');
	process.stdout.write(`Node Modules: ${nodeModulesDir}\n`);
	process.stdout.write(`Target package directory: ${targetDir}\n`);

	const currentNodeDir = path.join(nodeModulesDir, packageName);
	const backupNodeDir = path.join(nodeModulesDir, `${packageName}.bak`);

	const isLink = await isSymbolicLink(currentNodeDir);
	if (isLink) {
		throw new Error(`The package ${currentNodeDir} is already a symbolic link`);
	}

	try {
		// Remove any old backup directory
		if (await directoryExists(backupNodeDir)) {
			await fs.rm(backupNodeDir, { recursive: true });
		}
	} catch {}

	if (await directoryExists(currentNodeDir)) {
		process.stdout.write(`Renaming: ${currentNodeDir} to ${backupNodeDir}\n`);
		await fs.rename(currentNodeDir, backupNodeDir);
	}

	process.stdout.write(`Creating symlink: ${currentNodeDir} to ${targetDir}\n`);
	await fs.symlink(targetDir, currentNodeDir);
}

/**
 * Unlink the specified package.
 * @param targetPackage The target package to unlink.
 */
async function unlinkPackage(targetPackage) {
	process.stdout.write(`Unlinking package\n\n`);

	const { packageName } = await findPackageDetails(targetPackage);

	const nodeModulesDir = path.resolve('node_modules');
	process.stdout.write(`Node Modules: ${nodeModulesDir}\n`);

	const linkName = path.join(nodeModulesDir, packageName);
	const isLink = await isSymbolicLink(linkName);
	if (!isLink) {
		throw new Error(`The package ${linkName} is not a symbolic link`);
	}

	process.stdout.write(`Removing link: ${linkName}\n`);
	await fs.unlink(linkName);

	const linkNameBackup = `${linkName}.bak`;
	if (await directoryExists(linkNameBackup)) {
		process.stdout.write(`Renaming backup directory: ${linkNameBackup} to ${linkName}\n`);
		await fs.rename(linkNameBackup, linkName);
	} else {
		process.stdout.write(
			`There is no backup directory, performing npm install to re-instate package\n`
		);
		await runShellCmd('npm', ['install', targetPackage], process.cwd());
	}
}

/**
 * Find the package directory and name.
 * @param targetPackage The target package to find.
 * @returns The package directory and name.
 */
async function findPackageDetails(targetPackage) {
	let packageName;
	let targetDir;

	if (targetPackage.startsWith('@')) {
		process.stdout.write(`Finding package by name: ${targetPackage}\n`);

		const repoDirRoot = path.resolve('..');
		process.stdout.write(`Root repo directory: ${repoDirRoot}\n\n`);

		const packageNameOnly = targetPackage.split('/')[1];

		const allRepoDirs = await readdir(repoDirRoot, { withFileTypes: true });
		for (const repoDir of allRepoDirs) {
			if (repoDir.isDirectory()) {
				const repoPackageJsonFilename = path.join(repoDirRoot, repoDir.name, 'package.json');
				if (await fileExists(repoPackageJsonFilename)) {
					const repoPackageJson = await loadJson(repoPackageJsonFilename);
					if (
						Array.isArray(repoPackageJson.workspaces) &&
						repoPackageJson.workspaces.includes(`packages/${packageNameOnly}`)
					) {
						targetDir = path.join(repoDirRoot, repoDir.name, 'packages', packageNameOnly);
					}
				}
			}
		}
	} else {
		targetDir = path.resolve(targetPackage);
	}

	if (!targetDir) {
		throw new Error(`Unable to locate target package's directory`);
	}

	const repoPackageJsonFilename = path.join(targetDir, 'package.json');
	if (await fileExists(repoPackageJsonFilename)) {
		const repoPackageJson = await loadJson(repoPackageJsonFilename);
		packageName = repoPackageJson.name;
	}
	if (!packageName) {
		throw new Error(`Unable to locate target package's name`);
	}

	return { targetDir, packageName };
}

run().catch(err => {
	process.stderr.write(`\n${err}\n`);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
