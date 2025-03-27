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
	Equals: "equals",

	/**
	 * Not Equals.
	 */
	NotEquals: "not-equals",

	/**
	 * Greater Than.
	 */
	GreaterThan: "greater-than",

	/**
	 * Greater Than Or Equal.
	 */
	GreaterThanOrEqual: "greater-than-or-equal",

	/**
	 * Less Than.
	 */
	LessThan: "less-than",

	/**
	 * Less Than Or Equal.
	 */
	LessThanOrEqual: "less-than-or-equal",

	/**
	 * Includes.
	 * A string in a substring.
	 * A set contains an element.
	 * A list contains an element.
	 */
	Includes: "includes",

	/**
	 * Not Includes.
	 * A string not in a substring.
	 * A set does not contain an element.
	 * A list does not contain an element.
	 */
	NotIncludes: "not-includes",

	/**
	 * In.
	 * A element is in a set.
	 */
	In: "in"
} as const;

/**
 * The types of comparisons.
 */
export type ComparisonOperator = (typeof ComparisonOperator)[keyof typeof ComparisonOperator];
