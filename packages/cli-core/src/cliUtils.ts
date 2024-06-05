// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { exec, spawn } from "node:child_process";
import { accessSync, readFileSync, statSync } from "node:fs";
import { access, readFile, stat } from "node:fs/promises";
import { Coerce } from "@gtsc/core";

/**
 * Utilities function for helping in the CLI.
 */
export class CLIUtils {
	/**
	 * Does the specified file exist.
	 * @param filename The filename to check for existence.
	 * @returns True if the file exists.
	 */
	public static async fileExists(filename: string): Promise<boolean> {
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
	 */
	public static fileExistsSync(filename: string): boolean {
		try {
			const stats = statSync(filename);
			return stats.isFile();
		} catch {
			return false;
		}
	}

	/**
	 * Check if the dir exists.
	 * @param dir The directory to check.
	 * @returns True if the dir exists.
	 */
	public static async dirExists(dir: string): Promise<boolean> {
		try {
			await access(dir);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Check if the dir exists, synchronously.
	 * @param dir The directory to check.
	 * @returns True if the dir exists.
	 */
	public static dirExistsSync(dir: string): boolean {
		try {
			accessSync(dir);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Read a JSON file and parse it.
	 * @param filename The filename to read.
	 * @returns The parsed JSON.
	 */
	public static async readJsonFile<T = unknown>(filename: string): Promise<T | undefined> {
		if (await CLIUtils.fileExists(filename)) {
			const content = await readFile(filename, "utf8");
			return JSON.parse(content);
		}
	}

	/**
	 * Read a JSON file and parse it, synchronously.
	 * @param filename The filename to read.
	 * @returns The parsed JSON.
	 */
	public static readJsonFileSync<T = unknown>(filename: string): T | undefined {
		if (CLIUtils.fileExistsSync(filename)) {
			const content = readFileSync(filename, "utf8");
			return JSON.parse(content);
		}
	}

	/**
	 * Read a file as lines.
	 * @param filename The filename to read.
	 * @returns The lines.
	 */
	public static async readLinesFile(filename: string): Promise<string[] | undefined> {
		if (await CLIUtils.fileExists(filename)) {
			const content = await readFile(filename, "utf8");
			return content.split("\n");
		}
	}

	/**
	 * Read a file as lines, synchronously.
	 * @param filename The filename to read.
	 * @returns The lines.
	 */
	public static readLinesFileSync(filename: string): string[] | undefined {
		if (CLIUtils.fileExistsSync(filename)) {
			const content = readFileSync(filename, "utf8");
			return content.split("\n");
		}
	}

	/**
	 * Find the NPM root based on a package.json path.
	 * @param rootFolder The path to the package.json.
	 * @returns The root path.
	 */
	public static async findNpmRoot(rootFolder: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			exec("npm root", { cwd: rootFolder }, (error, stdout, stderr) => {
				if (error) {
					reject(error);
				}
				resolve(stdout.trim());
			});
		});
	}

	/**
	 * Run a shell app.
	 * @param app The app to run in the shell.
	 * @param args The args for the app.
	 * @param cwd The working directory to execute the command in.
	 * @returns Promise to wait for command execution to complete.
	 */
	public static async runShellCmd(app: string, args: string[], cwd: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const osCommand = process.platform.startsWith("win") ? `${app}.cmd` : app;

			const sp = spawn(osCommand, args, {
				stdio: "inherit",
				shell: true,
				cwd
			});

			sp.on("exit", (exitCode, signals) => {
				if (Coerce.number(exitCode) !== 0 || signals?.length) {
					// eslint-disable-next-line no-restricted-syntax
					reject(new Error("Run failed"));
				} else {
					resolve();
				}
			});
		});
	}
}
