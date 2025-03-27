// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface describing a patch operation to add a property.
 */
export interface IPatchOperation {
	/**
	 * The operation that was performed on the item.
	 */
	op: "add" | "remove" | "replace" | "move" | "copy" | "test";

	/**
	 * The path to the object that was changed.
	 */
	path: string;

	/**
	 * The path the value was copied or moved from.
	 */
	from?: string;

	/**
	 * The value to add.
	 */
	value?: unknown;
}
