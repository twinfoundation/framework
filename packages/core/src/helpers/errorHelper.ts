// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { StringHelper } from "./stringHelper";
import { BaseError } from "../errors/baseError";
import type { IError } from "../models/IError";
import type { IValidationFailure } from "../models/IValidationFailure";
import { I18n } from "../utils/i18n";
import { Is } from "../utils/is";

/**
 * Error helper functions.
 */
export class ErrorHelper {
	/**
	 * Format Errors and returns just their messages.
	 * @param error The error to format.
	 * @returns The error formatted including any inner errors.
	 */
	public static formatErrors(error: unknown): string[] {
		return ErrorHelper.localizeErrors(error).map(e => e.message);
	}

	/**
	 * Localize the content of an error and any inner errors.
	 * @param error The error to format.
	 * @returns The localized version of the errors flattened.
	 */
	public static localizeErrors(error: unknown): IError[] {
		const formattedErrors: IError[] = [];

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
					message: hasErrorMessage
						? I18n.formatMessage(errorMessageKey, err.properties)
						: err.message
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

				const additional = ErrorHelper.formatValidationErrors(err);
				if (Is.stringValue(additional)) {
					localizedError.additional = additional;
				}

				formattedErrors.push(localizedError);
			}
		}

		return formattedErrors;
	}

	/**
	 * Localize the content of an error and any inner errors.
	 * @param error The error to format.
	 * @returns The localized version of the errors flattened.
	 */
	public static formatValidationErrors(error: IError): string | undefined {
		if (
			Is.object(error.properties) &&
			Object.keys(error.properties).length > 0 &&
			Is.object<{ validationFailures: IValidationFailure[] }>(error.properties) &&
			Is.arrayValue(error.properties.validationFailures)
		) {
			const validationErrors = [];
			for (const validationFailure of error.properties.validationFailures) {
				let v = `${validationFailure.property}: ${I18n.formatMessage(
					`error.${validationFailure.reason}`,
					validationFailure.properties
				)}`;
				if (Is.object<{ value: unknown }>(validationFailure.properties)) {
					v += ` = ${JSON.stringify(validationFailure.properties.value)}`;
				}
				validationErrors.push(v);
			}
			return validationErrors.join("\n");
		}
	}
}
