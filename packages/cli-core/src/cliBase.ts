// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Coerce, Is } from "@twin.org/core";
import { Command } from "commander";
import { CLIDisplay } from "./cliDisplay";
import {
	addGlobalOptions,
	handleGlobalOptions,
	initGlobalOptions,
	initLocales
} from "./commands/global";
import type { ICliOptions } from "./models/ICliOptions";

/**
 * The main entry point for the CLI.
 */
export abstract class CLIBase {
	/**
	 * Execute the command line processing.
	 * @param options The options for the CLI.
	 * @param localesDirectory The path to load the locales from.
	 * @param argv The process arguments.
	 * @returns The exit code.
	 */
	public async execute(
		options: ICliOptions,
		localesDirectory: string,
		argv: string[]
	): Promise<number> {
		initGlobalOptions(localesDirectory);
		initLocales("en");

		try {
			process.title = options.title;

			if (!argv.includes("--version") && !argv.includes("-v")) {
				CLIDisplay.header(options.title, options.version, options.icon);
			}

			const program = new Command();

			let outputWidth = options.overrideOutputWidth;
			let outputErrWidth = options.overrideOutputWidth;
			if (Is.undefined(outputWidth) && process.stdout.isTTY) {
				outputWidth = process.stdout.columns;
				outputErrWidth = process.stderr.columns;
			}

			program
				.name(options.appName)
				.version(options.version)
				.usage("[command]")
				.showHelpAfterError()
				.configureOutput({
					writeOut: str => CLIDisplay.write(str),
					writeErr: str => CLIDisplay.writeError(str),
					getOutHelpWidth: () => outputWidth as number,
					getErrHelpWidth: () => outputErrWidth as number,
					outputError: (str, write) => CLIDisplay.error(str.replace(/^error: /, ""), false)
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

			this.configureRoot(program);

			addGlobalOptions(program, options.supportsLang ?? true, options.supportsEnvFiles ?? false);

			// We parse the options before building the command
			// in case the language has been set, then the
			// help for the options will be in the correct language.
			program.parseOptions(argv);
			handleGlobalOptions(program);

			const commandCount = this.buildCommands(program);
			if (commandCount === 0) {
				program.usage(" ");
			}

			await program.parseAsync(argv);
		} catch (error) {
			CLIDisplay.spinnerStop();

			let exitCode;
			if (error instanceof Error) {
				// This error could be the exit code we errored with
				// from the exitOverride so parse and resolve with it
				exitCode = Coerce.number(error.message);
			}

			if (Is.integer(exitCode)) {
				return exitCode;
			}
			CLIDisplay.error(error);
			return 1;
		}

		return 0;
	}

	/**
	 * Configure any options or actions at the root program level.
	 * @param program The root program command.
	 */
	protected configureRoot(program: Command): void {
		program.action(() => {
			program.help();
		});
	}

	/**
	 * Get the commands for the CLI, override in derived class to supply your own.
	 * @param program The main program that the commands will be added to.
	 * @returns The commands for the CLI.
	 */
	protected getCommands(program: Command): Command[] {
		return [];
	}

	/**
	 * Build the commands for the CLI.
	 * @param program The main program that the commands are added to.
	 * @returns The number of commands added.
	 * @internal
	 */
	private buildCommands(program: Command): number {
		const commands = this.getCommands(program);

		for (const command of commands) {
			program.addCommand(command.copyInheritedSettings(program));
		}

		return commands.length;
	}
}
