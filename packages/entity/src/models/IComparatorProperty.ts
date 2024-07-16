// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EntityCondition } from "./entityCondition";

/**
 * Interface defining comparator which works on a child property.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IComparatorProperty<T = unknown, C = any> {
	/**
	 * The name of the property in the object to check.
	 */
	property: keyof T;

	/**
	 * Perform the condition on the child property.
	 */
	condition: EntityCondition<C>;
}
