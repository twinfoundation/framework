// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ComparisonType } from "./comparisonType";
import type { LogicalOperator } from "./logicalOperator";

/**
 * Interface defining comparison operator.
 */
export interface IComparator {
	/**
	 * The name of the property in the object to compare.
	 */
	property: string;

	/**
	 * The value of the property to compare.
	 */
	value: unknown;

	/**
	 * The comparison to perform.
	 */
	comparison: ComparisonType;

	/**
	 * The logical operator to use.
	 */
	logicalOperator?: LogicalOperator;
}
