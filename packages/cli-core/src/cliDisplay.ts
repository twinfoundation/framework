// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { clearLine, cursorTo } from "node:readline";
import { inspect } from "node:util";
import { Coerce, ErrorHelper, I18n, Is } from "@gtsc/core";
import chalk from "chalk";

/**
 * Display utilities for the CLI.
 */
export class CLIDisplay {
	/**
	 * The interval ID for the spinner.
	 * @internal
	 */
	private static _spinnerIntervalId: NodeJS.Timeout | number | undefined;

	/**
	 * The default output method for writing standard messages.
	 * @param buffer The message to output.
	 */
	public static write: (buffer: string | Uint8Array) => void = buffer =>
		process.stdout.write(buffer);

	/**
	 * The default output method for writing error messages.
	 * @param buffer The message to output.
	 */
	public static writeError: (buffer: string | Uint8Array) => void = buffer =>
		process.stderr.write(buffer);

	/**
	 * The default output method for clearing the current line.
	 */
	public static clearLine: () => void = () => {
		clearLine(process.stdout, 0);
		cursorTo(process.stdout, 0);
	};

	/**
	 * Display the header for the CLI.
	 * @param title The title of the CLI.
	 * @param version The version of the CLI.
	 * @param icon The icon for the CLI.
	 */
	public static header(title: string, version: string, icon: string): void {
		const titleVersion = `${title} v${version}`;
		CLIDisplay.write(`${icon} ${chalk.underline.bold.blue(titleVersion)}\n`);
		CLIDisplay.write("\n");
	}

	/**
	 * Display an error message.
	 * @param error The error to display.
	 * @param lineBreaks Whether to add a line break after the error.
	 */
	public static error(error: unknown, lineBreaks: boolean = true): void {
		CLIDisplay.writeError("❗ ");
		CLIDisplay.writeError(chalk.red(I18n.formatMessage("cli.progress.error")));
		if (lineBreaks) {
			CLIDisplay.writeError("\n");
		}

		const formatted = ErrorHelper.formatErrors(error);
		CLIDisplay.writeError(chalk.red(formatted.map(e => `\t${e}`).join("\n")));
		if (lineBreaks) {
			CLIDisplay.writeError("\n");
		}
	}

	/**
	 * Display a section.
	 * @param label The label for the section.
	 */
	public static section(label: string): void {
		CLIDisplay.write(chalk.hex("#FFA500").bold.underline(label));
		CLIDisplay.write("\n\n");
	}

	/**
	 * Display a value with a label.
	 * @param label The label for the value.
	 * @param value The value to display.
	 * @param indentLevel The level of indentation.
	 */
	public static value(label: string, value: unknown, indentLevel: number = 0): void {
		CLIDisplay.write("\t".repeat(indentLevel));
		if (Is.stringValue(label)) {
			CLIDisplay.write(chalk.hex("#FFA500").bold(`${label}: `));
		}
		CLIDisplay.write(Coerce.string(value) ?? "");
		CLIDisplay.write("\n");
	}

	/**
	 * Display a task with a label.
	 * @param label The label for the value.
	 * @param task The task to display.
	 */
	public static task(label: string, task?: string): void {
		CLIDisplay.write("➡️  ");
		if (Is.empty(task)) {
			CLIDisplay.write(chalk.cyan(label));
		} else {
			CLIDisplay.write(chalk.cyan(`${label}: `));
			CLIDisplay.write(task);
		}
		CLIDisplay.write("\n");
	}

	/**
	 * Display a break.
	 */
	public static break(): void {
		CLIDisplay.write("\n");
	}

	/**
	 * Display formatted and colorized JSON.
	 * @param obj The object to display.
	 */
	public static json(obj: unknown): void {
		CLIDisplay.write(inspect(obj, true, undefined, true));
		CLIDisplay.write("\n");
	}

	/**
	 * Display the processing is done.
	 */
	public static done(): void {
		CLIDisplay.write("🎉 ");
		CLIDisplay.write(chalk.greenBright.bold(I18n.formatMessage("cli.progress.done")));
		CLIDisplay.write("\n");
	}

	/**
	 * Start the spinner.
	 * @param i18nMessage The message to display with the spinner.
	 * @param spinnerCharacters The characters to use in the spinner.
	 * @param interval The interval for the spinner.
	 */
	public static spinnerStart(
		i18nMessage: string = "cli.progress.pleaseWait",
		spinnerCharacters: string[] = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
		interval: number = 100
	): void {
		let spinnerIndex = 0;
		if (CLIDisplay._spinnerIntervalId) {
			clearInterval(CLIDisplay._spinnerIntervalId);
		}
		CLIDisplay._spinnerIntervalId = setInterval(() => {
			CLIDisplay.clearLine();
			CLIDisplay.write(
				`${spinnerCharacters[spinnerIndex++ % spinnerCharacters.length]} ${I18n.formatMessage(i18nMessage)}`
			);
		}, interval);
	}

	/**
	 * Stop the spinner.
	 */
	public static spinnerStop(): void {
		if (CLIDisplay._spinnerIntervalId) {
			clearInterval(CLIDisplay._spinnerIntervalId);
			CLIDisplay._spinnerIntervalId = undefined;
		}
		CLIDisplay.clearLine();
	}
}
