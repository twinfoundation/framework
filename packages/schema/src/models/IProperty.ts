// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface describing a property.
 */
export interface IProperty {
	/**
	 * The key for the item.
	 */
	key: string;

	/**
	 * The type for the item.
	 */
	type: string;

	/**
	 * The value for the item.
	 */
	value: unknown;
}
