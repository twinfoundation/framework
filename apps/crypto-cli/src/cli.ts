// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CLIBase } from "@twin.org/cli-core";
import type { Command } from "commander";
import { buildCommandAddress } from "./commands/address";
import { buildCommandMnemonic } from "./commands/mnemonic";

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
				title: "TWIN Crypto",
				appName: "twin-crypto",
				version: "1.0.0", // x-release-please-version
				icon: "🌍",
				supportsEnvFiles: true,
				overrideOutputWidth: options?.overrideOutputWidth
			},
			localesDirectory ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../locales"),
			argv
		);
	}

	/**
	 * Get the commands for the CLI.
	 * @param program The main program to add the commands to.
	 * @internal
	 */
	protected getCommands(program: Command): Command[] {
		return [buildCommandMnemonic(), buildCommandAddress()];
	}
}
