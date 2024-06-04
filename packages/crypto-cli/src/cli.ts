// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { Command } from "commander";
import { buildCommandAddress } from "./commands/address";
import {
	addGlobalOptions,
	handleGlobalOptions,
	initGlobalOptions,
	initLocales
} from "./commands/global";
import { buildCommandMnemonic } from "./commands/mnemonic";
import { displayError, displayHeader } from "./display";

const CLI_ICON = "🌍";
const CLI_TITLE = "GTSC Crypto";
const CLI_NAME = "gtsc-crypto";
const CLI_VERSION = "0.0.3-next.42";

/**
 * The main entry point for the CLI.
 */
export class CLI {
	/**
	 * Run the app.
	 * @param argv The process arguments.
	 * @returns The exit code.
	 */
	public async run(argv: string[]): Promise<number> {
		return this.execute(
			{
				appName: CLI_NAME,
				title: CLI_TITLE,
				version: CLI_VERSION,
				icon: CLI_ICON
			},
			argv
		);
	}

	/**
	 * Execute the command line processing.
	 * @param options The options for the CLI.
	 * @param options.title The title of the CLI.
	 * @param options.appName The name of the app.
	 * @param options.version The version of the app.
	 * @param options.icon The icon for the CLI.
	 * @param argv The process arguments.
	 * @returns The exit code.
	 */
	public async execute(
		options: {
			title: string;
			appName: string;
			version: string;
			icon: string;
		},
		argv: string[]
	): Promise<number> {
		initGlobalOptions(path.dirname(argv[1]));
		initLocales("en");

		return new Promise<number>(resolve => {
			try {
				process.title = CLI_TITLE;

				if (!argv.includes("--version") && !argv.includes("-v")) {
					displayHeader(options.title, options.version, options.icon);
				}

				const program = new Command();

				program
					.name(options.appName)
					.version(options.version)
					.usage("[command]")
					.showHelpAfterError()
					.configureOutput({
						outputError: (str, write) => displayError(str.replace(/^error: /, ""))
					})
					.exitOverride(err => {
						// By default commander still calls process.exit on exit
						// which we don't want as we might have subsequent
						// processing to handle, so instead we throw the exit code
						// as a way to skip the process.exit call.
						// If the error code is commander.help then we return 0 as
						// we don't want displaying help to be an error.
						// eslint-disable-next-line no-restricted-syntax
						throw new Error(err.code === "commander.help" ? "0" : err.exitCode.toString());
					});

				addGlobalOptions(program);

				// We parse the options before building the command
				// in case the language has been set, then the
				// help for the options will be in the correct language.
				program.parseOptions(argv);
				handleGlobalOptions(program);

				this.buildCommands(program);

				program.parse(argv);
			} catch (err) {
				if (err instanceof Error) {
					// This error is the the exit code we errored with
					// from the exitOverride so parse and resolve with it
					resolve(Number.parseInt(err.message, 10));
				} else {
					displayError(err);
					resolve(1);
				}
			}
		});
	}

	/**
	 * Build the commands for the CLI.
	 * @param program The main program to add the commands to.
	 * @internal
	 */
	private buildCommands(program: Command): void {
		const commands = [buildCommandMnemonic(), buildCommandAddress()];

		for (const command of commands) {
			program.addCommand(command.copyInheritedSettings(program));
		}
	}
}
