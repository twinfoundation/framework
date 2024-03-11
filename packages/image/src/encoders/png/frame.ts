// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Frame for the PNG encoder.
 * @internal
 */
export interface Frame {
	/**
	 * @internal
	 */
	img: Uint8Array;

	/**
	 * @internal
	 */
	rect: { width: number; height: number; x: number; y: number };

	/**
	 * @internal
	 */
	bpl: number;

	/**
	 * @internal
	 */
	bpp: number;

	/**
	 * @internal
	 */
	dispose: number;

	/**
	 * @internal
	 */
	blend: number;

	/**
	 * @internal
	 */
	cImg?: Uint8Array;

	/**
	 * @internal
	 */
	depth?: number;

	/**
	 * @internal
	 */
	cType?: number;
}
