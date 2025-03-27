// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EntityCondition } from "./entityCondition";
import type { LogicalOperator } from "./logicalOperator";

/**
 * Interface defining condition group operator.
 */
export interface IComparatorGroup<T = unknown> {
	/**
	 * The conditions to join in a group.
	 */
	conditions: EntityCondition<T>[];

	/**
	 * The logical operator to use.
	 */
	logicalOperator?: LogicalOperator;
}
