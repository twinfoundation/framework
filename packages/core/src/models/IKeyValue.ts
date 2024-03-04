// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * Interface describing a key/value pair.
 */
export interface IKeyValue<T> {
	/**
	 * The key for the item.
	 */
	key: string;

	/**
	 * The value for the item.
	 */
	value: T;
}
