// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { IntlMessageFormat } from "intl-messageformat";
import { Is } from "./is";
import { SharedStore } from "./sharedStore";
import type { II18nShared } from "../models/II18nShared";
import type { ILocaleDictionary } from "../models/ILocaleDictionary";

/**
 * Class to perform internationalization.
 */
export class I18n {
	/**
	 * The default translation.
	 */
	public static DEFAULT_LOCALE: string = "en";

	/**
	 * Set the locale.
	 * @param locale The new locale.
	 */
	public static setLocale(locale: string): void {
		const i18nShared = I18n.getI18nShared();

		i18nShared.currentLocale = locale;

		for (const callback in i18nShared.localeChangedHandlers) {
			i18nShared.localeChangedHandlers[callback](i18nShared.currentLocale);
		}
	}

	/**
	 * Get the locale.
	 * @returns The current locale.
	 */
	public static getLocale(): string {
		const i18nShared = I18n.getI18nShared();
		return i18nShared.currentLocale;
	}

	/**
	 * Add a locale dictionary.
	 * @param locale The locale.
	 * @param dictionary The dictionary to add.
	 */
	public static addDictionary(locale: string, dictionary: ILocaleDictionary): void {
		const i18nShared = I18n.getI18nShared();

		const mergedKeys: { [key: string]: string } = {};
		I18n.flattenTranslationKeys(dictionary, "", mergedKeys);
		i18nShared.localeDictionaries[locale] = mergedKeys;

		for (const callback in i18nShared.dictionaryChangedHandlers) {
			i18nShared.dictionaryChangedHandlers[callback](i18nShared.currentLocale);
		}
	}

	/**
	 * Get a locale dictionary.
	 * @param locale The locale.
	 * @returns The dictionary of undefined if it does not exist.
	 */
	public static getDictionary(locale: string): { [key: string]: string } | undefined {
		const i18nShared = I18n.getI18nShared();
		return i18nShared.localeDictionaries[locale];
	}

	/**
	 * Get all the locale dictionaries.
	 * @returns The dictionaries.
	 */
	public static getAllDictionaries(): {
		[locale: string]: { [key: string]: string };
	} {
		const i18nShared = I18n.getI18nShared();
		return i18nShared.localeDictionaries;
	}

	/**
	 * Add a locale changed handler.
	 * @param id The id of the handler.
	 * @param handler The handler to add.
	 */
	public static addLocaleHandler(id: string, handler: (locale: string) => void): void {
		const i18nShared = I18n.getI18nShared();
		i18nShared.localeChangedHandlers[id] = handler;
	}

	/**
	 * Remove a locale changed handler.
	 * @param id The id of the handler.
	 */
	public static removeLocaleHandler(id: string): void {
		const i18nShared = I18n.getI18nShared();
		delete i18nShared.localeChangedHandlers[id];
	}

	/**
	 * Add a dictionary changed handler.
	 * @param id The id of the handler.
	 * @param handler The handler to add.
	 */
	public static addDictionaryHandler(id: string, handler: (locale: string) => void): void {
		const i18nShared = I18n.getI18nShared();
		i18nShared.dictionaryChangedHandlers[id] = handler;
	}

	/**
	 * Remove a dictionary changed handler.
	 * @param id The id of the handler.
	 */
	public static removeDictionaryHandler(id: string): void {
		const i18nShared = I18n.getI18nShared();
		delete i18nShared.dictionaryChangedHandlers[id];
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
		const i18nShared = I18n.getI18nShared();

		let cl = overrideLocale ?? i18nShared.currentLocale;
		if (cl.startsWith("debug-")) {
			cl = I18n.DEFAULT_LOCALE;
		}

		if (!i18nShared.localeDictionaries[cl]) {
			return `!!Missing ${cl}`;
		}
		if (!i18nShared.localeDictionaries[cl][key]) {
			return `!!Missing ${cl}.${key}`;
		}

		if (i18nShared.currentLocale === "debug-k") {
			return key;
		}

		let ret = new IntlMessageFormat(i18nShared.localeDictionaries[cl][key], cl).format(
			values
		) as string;

		if (i18nShared.currentLocale === "debug-x") {
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
		const i18nShared = I18n.getI18nShared();
		return Is.string(i18nShared.localeDictionaries[i18nShared.currentLocale]?.[key]);
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

	/**
	 * Get the I18n shared data.
	 * @returns The I18n shared data.
	 * @internal
	 */
	private static getI18nShared(): II18nShared {
		let i18nShared = SharedStore.get<II18nShared>("i18n");

		if (Is.undefined(i18nShared)) {
			i18nShared = {
				localeDictionaries: {},
				currentLocale: I18n.DEFAULT_LOCALE,
				localeChangedHandlers: {},
				dictionaryChangedHandlers: {}
			};
			SharedStore.set<II18nShared>("i18n", i18nShared);
		}

		return i18nShared;
	}
}
