// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Load a JSON file.
 * @param filePath The path to load as JSON.
 * @returns The loaded JSON.
 */
export async function loadJson(filePath) {
	const content = await fs.readFile(filePath, 'utf8');

	return JSON.parse(content);
}

/**
 * Save a JSON file.
 * @param filePath The path to save the object as JSON.
 * @param obj The object to save as JSON.
 */
export async function saveJson(filePath, obj) {
	await fs.writeFile(filePath, JSON.stringify(obj, undefined, '\t'), 'utf8');
}

/**
 * Run a shell app.
 * @param app The app to run in the shell.
 * @param args The args for the app.
 * @param cwd The working directory to execute the command in.
 * @returns Promise to wait for command execution to complete.
 */
export async function runShellCmd(app, args, cwd) {
	return new Promise((resolve, reject) => {
		process.stdout.write(`${app} ${args.join(' ')}\n`);

		const osCommand = process.platform.startsWith('win') ? `${app}.cmd` : app;

		const sp = spawn(osCommand, args, {
			stdio: 'inherit',
			shell: true,
			cwd
		});

		sp.on('exit', (exitCode, signals) => {
			if (Number.parseInt(exitCode, 10) !== 0 || signals?.length) {
				reject(new Error('Run failed'));
			} else {
				resolve();
			}
		});
	});
}

/**
 * Does the specified file exist.
 * @param filename The filename to check for existence.
 * @returns True if the file exists.
 */
export async function fileExists(filename) {
	try {
		const stats = await fs.stat(filename);
		return stats.isFile();
	} catch {
		return false;
	}
}

/**
 * Does the specified directory exist.
 * @param directory The directory to check for existence.
 * @returns True if the directory exists.
 */
export async function directoryExists(directory) {
	try {
		const stats = await fs.stat(directory);
		return stats.isDirectory();
	} catch {
		return false;
	}
}

/**
 * Is the file/directory a symbolic link.
 * @param item The item to check if it's a symbolic link.
 * @returns True if the item is a symbolic link.
 */
export async function isSymbolicLink(item) {
	try {
		const stats = await fs.lstat(item);
		return stats.isSymbolicLink();
	} catch {
		return false;
	}
}

/**
 * Get the list of directory names from a specified directory.
 * @param dir The directory to get the list of directory names from.
 * @returns The list of directory names.
 */
export async function gatherDirectoryNames(dir) {
	const dirNames = [];

	if (await directoryExists(dir)) {
		const fullDir = path.resolve(dir);
		const allEntries = await fs.readdir(fullDir, { withFileTypes: true });

		for (const entry of allEntries) {
			if (entry.isDirectory()) {
				dirNames.push(entry.name);
			}
		}
	}

	return dirNames;
}
