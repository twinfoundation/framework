// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import {
	BaseError,
	I18n,
	type IError,
	type IValidationFailure,
	Is,
	StringHelper
} from "@gtsc/core";
import chalk from "chalk";

/**
 * Display the header for the CLI.
 * @param title The title of the CLI.
 * @param version The version of the CLI.
 * @param icon The icon for the CLI.
 */
export function displayHeader(title: string, version: string, icon: string): void {
	const titleVersion = `${title} v${version}`;
	console.log(`${icon} ${chalk.underline.blue(titleVersion)}`);
	console.log("");
}

/**
 * Display an error message.
 * @param error The error to display.
 */
export function displayError(error: unknown): void {
	const formatted = formatErrors(error);
	console.error(chalk.red(`Error: ${formatted}`));
}

/**
 * Display a value with a label.
 * @param label The label for the value.
 * @param value The value to display.
 */
export function displayValue(label: string, value: string): void {
	console.log(chalk.green(`${label}:`), value);
}

/**
 * Display a task with a label.
 * @param label The label for the value.
 * @param task The task to display.
 */
export function displayTask(label: string, task?: string): void {
	if (Is.stringValue(task)) {
		console.log(chalk.cyan(`${label}:`), task);
	} else {
		console.log(chalk.cyan(label));
	}
}

/**
 * Display a break.
 */
export function displayBreak(): void {
	console.log();
}

/**
 * Display the processing is done.
 */
export function displayDone(): void {
	console.log(chalk.green("Done."));
}

/**
 * Format Errors.
 * @param error The error to format.
 * @returns The formatted error.
 */
function formatErrors(error: unknown): string {
	const formattedErrors = [];

	if (Is.notEmpty(error)) {
		const errors = BaseError.flatten(error);

		for (const err of errors) {
			const errorNameKey = `errorNames.${StringHelper.camelCase(err.name)}`;
			const errorMessageKey = `error.${err.message}`;

			// If there is no error message then it is probably
			// from a 3rd party lib, so don't format it just display
			const hasErrorName = I18n.hasMessage(errorNameKey);
			const hasErrorMessage = I18n.hasMessage(errorMessageKey);

			const localizedError: IError & { additional?: string } = {
				name: I18n.formatMessage(hasErrorName ? errorNameKey : "errorNames.error"),
				message: hasErrorMessage ? I18n.formatMessage(errorMessageKey, err.properties) : err.message
			};

			if (Is.stringValue(err.source)) {
				localizedError.source = err.source;
			}
			if (Is.stringValue(err.stack)) {
				// Remove the first line from the stack traces as they
				// just have the error type and message duplicated
				const lines = err.stack.split("\n");
				lines.shift();
				localizedError.stack = lines.join("\n");
			}

			if (
				Is.object(err.properties) &&
				Object.keys(err.properties).length > 0 &&
				Is.object<{ validationFailures: IValidationFailure[] }>(err.properties) &&
				Is.arrayValue(err.properties.validationFailures)
			) {
				const validationErrors = [];
				for (const validationFailure of err.properties.validationFailures) {
					let v = `${validationFailure.property}: ${I18n.formatMessage(
						`error.${validationFailure.reason}`,
						validationFailure.properties
					)}`;
					if (Is.object<{ value: unknown }>(validationFailure.properties)) {
						v += ` = ${JSON.stringify(validationFailure.properties.value)}`;
					}
					validationErrors.push(v);
				}
				localizedError.additional = validationErrors.join("\n");
				validationErrors.join("\n");
			}
			formattedErrors.push(localizedError);
		}
	}

	return formattedErrors[0].message;
}
