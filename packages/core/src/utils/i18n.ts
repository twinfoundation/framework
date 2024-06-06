// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { IntlMessageFormat } from "intl-messageformat";
import { Is } from "./is";
import { BaseError } from "../errors/baseError";
import { StringHelper } from "../helpers/stringHelper";
import type { IError } from "../models/IError";
import type { ILocaleDictionary } from "../models/ILocaleDictionary";
import type { IValidationFailure } from "../models/IValidationFailure";

/**
 * Class to perform internationalization.
 */
export class I18n {
	/**
	 * The default translation.
	 */
	public static DEFAULT_LOCALE: string = "en";

	/**
	 * Dictionaries for lookups.
	 * @internal
	 */
	private static _localeDictionaries: {
		[locale: string]: { [key: string]: string };
	} = {};

	/**
	 * The current locale.
	 * @internal
	 */
	private static _currentLocale: string = I18n.DEFAULT_LOCALE;

	/**
	 * Change handler for the locale being updated.
	 * @internal
	 */
	private static readonly _localeChangedHandlers: {
		[id: string]: (locale: string) => void;
	} = {};

	/**
	 * Change handler for the dictionaries being updated.
	 * @internal
	 */
	private static readonly _dictionaryChangedHandlers: {
		[id: string]: (locale: string) => void;
	} = {};

	/**
	 * Set the locale.
	 * @param locale The new locale.
	 */
	public static setLocale(locale: string): void {
		I18n._currentLocale = locale;

		for (const callback in I18n._localeChangedHandlers) {
			I18n._localeChangedHandlers[callback](I18n._currentLocale);
		}
	}

	/**
	 * Get the locale.
	 * @returns The current locale.
	 */
	public static getLocale(): string {
		return I18n._currentLocale;
	}

	/**
	 * Add a locale dictionary.
	 * @param locale The locale.
	 * @param dictionary The dictionary to add.
	 */
	public static addDictionary(locale: string, dictionary: ILocaleDictionary): void {
		const mergedKeys: { [key: string]: string } = {};
		I18n.flattenTranslationKeys(dictionary, "", mergedKeys);
		I18n._localeDictionaries[locale] = mergedKeys;

		for (const callback in I18n._dictionaryChangedHandlers) {
			I18n._dictionaryChangedHandlers[callback](I18n._currentLocale);
		}
	}

	/**
	 * Get a locale dictionary.
	 * @param locale The locale.
	 * @returns The dictionary of undefined if it does not exist.
	 */
	public static getDictionary(locale: string): { [key: string]: string } | undefined {
		return I18n._localeDictionaries[locale];
	}

	/**
	 * Get all the locale dictionaries.
	 * @returns The dictionaries.
	 */
	public static getAllDictionaries(): {
		[locale: string]: { [key: string]: string };
	} {
		return I18n._localeDictionaries;
	}

	/**
	 * Add a locale changed handler.
	 * @param id The id of the handler.
	 * @param handler The handler to add.
	 */
	public static addLocaleHandler(id: string, handler: (locale: string) => void): void {
		I18n._localeChangedHandlers[id] = handler;
	}

	/**
	 * Remove a locale changed handler.
	 * @param id The id of the handler.
	 */
	public static removeLocaleHandler(id: string): void {
		delete I18n._localeChangedHandlers[id];
	}

	/**
	 * Add a dictionary changed handler.
	 * @param id The id of the handler.
	 * @param handler The handler to add.
	 */
	public static addDictionaryHandler(id: string, handler: (locale: string) => void): void {
		I18n._dictionaryChangedHandlers[id] = handler;
	}

	/**
	 * Remove a dictionary changed handler.
	 * @param id The id of the handler.
	 */
	public static removeDictionaryHandler(id: string): void {
		delete I18n._dictionaryChangedHandlers[id];
	}

	/**
	 * Format a message.
	 * @param key The key of the message to format.
	 * @param values The values to substitute into the message.
	 * @param overrideLocale Override the locale.
	 * @returns The formatted string.
	 */
	public static formatMessage(
		key: string,
		values?: { [key: string]: unknown },
		overrideLocale?: string
	): string {
		let cl = overrideLocale ?? I18n._currentLocale;
		if (cl.startsWith("debug-")) {
			cl = I18n.DEFAULT_LOCALE;
		}

		if (!I18n._localeDictionaries[cl]) {
			return `!!Missing ${cl}`;
		}
		if (!I18n._localeDictionaries[cl][key]) {
			return `!!Missing ${cl}.${key}`;
		}

		if (I18n._currentLocale === "debug-k") {
			return key;
		}

		let ret = new IntlMessageFormat(I18n._localeDictionaries[cl][key], cl).format(values) as string;

		if (I18n._currentLocale === "debug-x") {
			ret = ret.replace(/[a-z]/g, "x").replace(/[A-Z]/g, "x").replace(/\d/g, "n");
		}

		return ret;
	}

	/**
	 * Check if the dictionaries have a message for the given key.
	 * @param key The key to check for existence.
	 * @returns True if the key exists.
	 */
	public static hasMessage(key: string): boolean {
		return Is.string(I18n._localeDictionaries[I18n._currentLocale]?.[key]);
	}

	/**
	 * Format Errors and returns just their messages.
	 * @param error The error to format.
	 * @returns The error formatted including any inner errors.
	 */
	public static formatErrors(error: unknown): string[] {
		return I18n.localizeErrors(error).map(e => e.message);
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

		return formattedErrors;
	}

	/**
	 * Flatten the translation property paths for faster lookup.
	 * @param translation The translation to merge.
	 * @param propertyPath The current root path.
	 * @param mergedKeys The merged keys dictionary to populate.
	 * @internal
	 */
	private static flattenTranslationKeys(
		translation: ILocaleDictionary,
		propertyPath: string,
		mergedKeys: { [key: string]: string }
	): void {
		for (const key in translation) {
			const val = translation[key];
			const mergedPath = propertyPath.length > 0 ? `${propertyPath}.${key}` : key;
			if (Is.string(val)) {
				mergedKeys[mergedPath] = val;
			} else if (Is.object<ILocaleDictionary>(val)) {
				I18n.flattenTranslationKeys(val, mergedPath, mergedKeys);
			}
		}
	}
}
