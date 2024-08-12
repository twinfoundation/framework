// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ComparisonOperator } from "./comparisonOperator";

/**
 * Interface defining comparator operator.
 */
export interface IComparator {
	/**
	 * The name of the property in the object to check.
	 */
	property: string;

	/**
	 * The value of the property to check.
	 */
	value: unknown;

	/**
	 * The check to perform.
	 */
	operator: ComparisonOperator;
}
