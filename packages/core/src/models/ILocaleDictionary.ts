// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Type for the JSON locale dictionary files.
 */
export interface ILocaleDictionary {
	[key: string]: string | ILocaleDictionary;
}
