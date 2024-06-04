// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Coerce, I18n, Is } from "@gtsc/core";
import chalk from "chalk";

/**
 * Display the header for the CLI.
 * @param title The title of the CLI.
 * @param version The version of the CLI.
 * @param icon The icon for the CLI.
 */
export function displayHeader(title: string, version: string, icon: string): void {
	const titleVersion = `${title} v${version}`;
	process.stdout.write(`${icon} ${chalk.underline.blue(titleVersion)}\n`);
	process.stdout.write("\n");
}

/**
 * Display an error message.
 * @param error The error to display.
 */
export function displayError(error: unknown): void {
	const formatted = I18n.formatErrors(error);
	process.stderr.write(chalk.red(`${I18n.formatMessage("cli.progress.error")}: ${formatted}\n`));
}

/**
 * Display a value with a label.
 * @param label The label for the value.
 * @param value The value to display.
 * @param indentLevel The level of indentation.
 */
export function displayValue(label: string, value: unknown, indentLevel: number = 0): void {
	process.stdout.write("\t".repeat(indentLevel));
	process.stdout.write(chalk.green(`${label}: `));
	process.stdout.write(Coerce.string(value) ?? "");
	process.stdout.write("\n");
}

/**
 * Display a task with a label.
 * @param label The label for the value.
 * @param task The task to display.
 */
export function displayTask(label: string, task?: string): void {
	if (Is.stringValue(task)) {
		process.stdout.write(chalk.cyan(`${label}: `));
		process.stdout.write(task);
	} else {
		process.stdout.write(chalk.cyan(label));
	}
	process.stdout.write("\n");
}

/**
 * Display a break.
 */
export function displayBreak(): void {
	process.stdout.write("\n");
}

/**
 * Display the processing is done.
 */
export function displayDone(): void {
	process.stdout.write(chalk.green(I18n.formatMessage("cli.progress.done")));
	process.stdout.write("\n");
}
