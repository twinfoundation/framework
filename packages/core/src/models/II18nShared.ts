// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * The shared state for the I18n global.
 */
export interface II18nShared {
	/**
	 * Dictionaries for lookups.
	 */
	localeDictionaries: {
		[locale: string]: { [key: string]: string };
	};

	/**
	 * The current locale.
	 */
	currentLocale: string;

	/**
	 * Change handler for the locale being updated.
	 */
	localeChangedHandlers: {
		[id: string]: (locale: string) => void;
	};

	/**
	 * Change handler for the dictionaries being updated.
	 */
	dictionaryChangedHandlers: {
		[id: string]: (locale: string) => void;
	};
}
