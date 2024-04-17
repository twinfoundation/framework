// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ComparisonType } from "./comparisonType";

/**
 * Interface defining comparison operator.
 */
export interface IComparator<T = unknown> {
	/**
	 * The name of the property in the object to compare.
	 */
	property: keyof T;

	/**
	 * The value of the property to compare.
	 */
	value: unknown;

	/**
	 * The comparison to perform.
	 */
	comparison: ComparisonType;
}
