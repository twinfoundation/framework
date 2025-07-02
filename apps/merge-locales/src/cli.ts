// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CLIBase } from "@twin.org/cli-core";
import type { Command } from "commander";
import { buildCommandMergeLocales } from "./commands/mergeLocales";

/**
 * The main entry point for the CLI.
 */
export class CLI extends CLIBase {
	/**
	 * Run the app.
	 * @param argv The process arguments.
	 * @param localesDirectory The directory for the locales, default to relative to the script.
	 * @param options Additional options.
	 * @param options.overrideOutputWidth Override the output width.
	 * @returns The exit code.
	 */
	public async run(
		argv: string[],
		localesDirectory?: string,
		options?: { overrideOutputWidth?: number }
	): Promise<number> {
		return this.execute(
			{
				title: "TWIN Merge Locales",
				appName: "merge-locales",
				version: "0.0.1-next.67", // x-release-please-version
				icon: "⚙️ ",
				supportsEnvFiles: false,
				overrideOutputWidth: options?.overrideOutputWidth
			},
			localesDirectory ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../locales"),
			argv
		);
	}

	/**
	 * Configure any options or actions at the root program level.
	 * @param program The root program command.
	 */
	protected configureRoot(program: Command): void {
		buildCommandMergeLocales(program);
	}
}
