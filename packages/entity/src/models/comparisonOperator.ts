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
	 * A string in a substring.
	 * A set contains an element.
	 * A list contains an element.
	 */
	Includes: "Includes",

	/**
	 * Not Includes.
	 * A string not in a substring.
	 * A set does not contain an element.
	 * A list does not contain an element.
	 */
	NotIncludes: "NotIncludes",

	/**
	 * In.
	 * A element is in a set.
	 */
	In: "In"
} as const;

/**
 * The types of comparisons.
 */
export type ComparisonOperator = (typeof ComparisonOperator)[keyof typeof ComparisonOperator];
