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
	And: "And",

	/**
	 * Logical operator OR.
	 */
	Or: "Or"
} as const;

/**
 * The logical operators for condition combining.
 */
export type LogicalOperator = (typeof LogicalOperator)[keyof typeof LogicalOperator];
