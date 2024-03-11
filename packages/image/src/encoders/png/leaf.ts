// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Leaf for the PNG encoder.
 * @internal
 */
export interface Leaf {
	/**
	 * @internal
	 */
	i0: number;

	/**
	 * @internal
	 */
	i1: number;

	/**
	 * @internal
	 */
	bst: { R: number[]; m: number[]; N: number } | null;

	/**
	 * @internal
	 */
	est: {
		Cov: number[];
		q: number[];
		e: number[];
		L: number;
		eMq255: number;
		eMq: number;
		rgba: number;
	} | null;

	/**
	 * @internal
	 */
	tDst: number;

	/**
	 * @internal
	 */
	left: Leaf | null;

	/**
	 * @internal
	 */
	right: Leaf | null;
}
