// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Coerce, I18n, Is } from "@gtsc/core";
import chalk from "chalk";

/**
 * Display utilities for the CLI.
 */
export class CLIDisplay {
	/**
	 * The default output method for writing standard messages.
	 * @param str The message to output.
	 */
	public static write: (str: string) => void = str => process.stdout.write(str);

	/**
	 * The default output method for writing error messages.
	 * @param str The message to output.
	 */
	public static writeError: (str: string) => void = str => process.stderr.write(str);

	/**
	 * Display the header for the CLI.
	 * @param title The title of the CLI.
	 * @param version The version of the CLI.
	 * @param icon The icon for the CLI.
	 */
	public static header(title: string, version: string, icon: string): void {
		const titleVersion = `${title} v${version}`;
		CLIDisplay.write(`${icon} ${chalk.underline.blue(titleVersion)}\n`);
		CLIDisplay.write("\n");
	}

	/**
	 * Display an error message.
	 * @param error The error to display.
	 */
	public static error(error: unknown): void {
		const formatted = I18n.formatErrors(error);
		CLIDisplay.writeError(chalk.red(`${I18n.formatMessage("cli.progress.error")}: ${formatted}\n`));
	}

	/**
	 * Display a value with a label.
	 * @param label The label for the value.
	 * @param value The value to display.
	 * @param indentLevel The level of indentation.
	 */
	public static value(label: string, value: unknown, indentLevel: number = 0): void {
		CLIDisplay.write("\t".repeat(indentLevel));
		CLIDisplay.write(chalk.green(`${label}: `));
		CLIDisplay.write(Coerce.string(value) ?? "");
		CLIDisplay.write("\n");
	}

	/**
	 * Display a task with a label.
	 * @param label The label for the value.
	 * @param task The task to display.
	 */
	public static task(label: string, task?: string): void {
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
	 * Display the processing is done.
	 */
	public static done(): void {
		CLIDisplay.write(chalk.green(I18n.formatMessage("cli.progress.done")));
		CLIDisplay.write("\n");
	}
}
