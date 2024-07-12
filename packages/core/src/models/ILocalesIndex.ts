// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ILocale } from "./ILocale";

/**
 * Model for a locales index.
 */
export interface ILocalesIndex {
	/**
	 * The list of locales.
	 */
	locales: ILocale[];
}
