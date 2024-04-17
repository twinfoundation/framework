// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComparator } from "./IComparator";
import type { LogicalOperator } from "./logicalOperator";

/**
 * Interface defining comparison group operator.
 */
export interface IComparatorGroup<T = unknown> {
	/**
	 * The comparators to join in a group.
	 */
	comparators: (IComparator<T> | IComparatorGroup<T>)[];

	/**
	 * The logical operator to use.
	 */
	logicalOperator?: LogicalOperator;
}
