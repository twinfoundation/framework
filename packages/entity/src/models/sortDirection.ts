// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The sort directions.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SortDirection = {
	/**
	 * Ascending.
	 */
	Ascending: "asc",

	/**
	 * Descending.
	 */
	Descending: "desc"
} as const;

/**
 * The sort directions.
 */
export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];
