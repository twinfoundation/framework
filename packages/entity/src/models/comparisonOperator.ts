// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types of comparisons.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ComparisonOperator = {
	/**
	 * Equals.
	 */
	Equals: "Equals",

	/**
	 * Not Equals.
	 */
	NotEquals: "NotEquals",

	/**
	 * Greater Than.
	 */
	GreaterThan: "GreaterThan",

	/**
	 * Greater Than Or Equal.
	 */
	GreaterThanOrEqual: "GreaterThanOrEqual",

	/**
	 * Less Than.
	 */
	LessThan: "LessThan",

	/**
	 * Less Than Or Equal.
	 */
	LessThanOrEqual: "LessThanOrEqual",

	/**
	 * Includes.
	 */
	Includes: "Includes",

	/**
	 * Not Includes.
	 */
	NotIncludes: "NotIncludes",

	/**
	 * In operator.
	 */
	In: "In",

	/**
	 * Not In operator.
	 */
	NotIn: "NotIn"
};

/**
 * The types of comparisons.
 */
export type ComparisonOperator = (typeof ComparisonOperator)[keyof typeof ComparisonOperator];
