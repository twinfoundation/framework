// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { readFileSync, statSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";

/**
 * Does the specified file exist.
 * @param filename The filename to check for existence.
 * @returns True if the file exists.
 * @internal
 */
export async function fileExists(filename: string): Promise<boolean> {
	try {
		const stats = await stat(filename);
		return stats.isFile();
	} catch {
		return false;
	}
}

/**
 * Does the specified file exist, synchronously.
 * @param filename The filename to check for existence.
 * @returns True if the file exists.
 * @internal
 */
export function fileExistsSync(filename: string): boolean {
	try {
		const stats = statSync(filename);
		return stats.isFile();
	} catch {
		return false;
	}
}

/**
 * Read a JSON file and parse it.
 * @param filename The filename to read.
 * @returns The parsed JSON.
 */
export async function readJsonFile<T = unknown>(filename: string): Promise<T | undefined> {
	if (await fileExists(filename)) {
		const content = await readFile(filename, "utf8");
		return JSON.parse(content);
	}
}

/**
 * Read a JSON file and parse it, synchronously.
 * @param filename The filename to read.
 * @returns The parsed JSON.
 */
export function readJsonFileSync<T = unknown>(filename: string): T | undefined {
	if (fileExistsSync(filename)) {
		const content = readFileSync(filename, "utf8");
		return JSON.parse(content);
	}
}

/**
 * Read a file as lines.
 * @param filename The filename to read.
 * @returns The lines.
 */
export async function readLinesFile(filename: string): Promise<string[] | undefined> {
	if (await fileExists(filename)) {
		const content = await readFile(filename, "utf8");
		return content.split("\n");
	}
}
