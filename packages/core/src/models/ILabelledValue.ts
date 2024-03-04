// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * Interface describing a label/value pair.
 */
export interface ILabelledValue<T> {
	/**
	 * The label for the item.
	 */
	label: string;

	/**
	 * The value for the item.
	 */
	value: T;
}
