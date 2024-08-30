// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The logical operators for condition combining.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const LogicalOperator = {
	/**
	 * Logical operator AND.
	 */
	And: "and",

	/**
	 * Logical operator OR.
	 */
	Or: "or"
} as const;

/**
 * The logical operators for condition combining.
 */
export type LogicalOperator = (typeof LogicalOperator)[keyof typeof LogicalOperator];
