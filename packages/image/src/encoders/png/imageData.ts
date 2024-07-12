// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { Frame } from "./frame";

/**
 * Image data for the PNG encoder.
 * @internal
 */
export interface ImageData {
	/**
	 * @internal
	 */
	cType: number;
	/**
	 * @internal
	 */
	depth: number;
	/**
	 * @internal
	 */
	plte: number[];
	/**
	 * @internal
	 */
	gotAlpha: boolean;
	/**
	 * @internal
	 */
	frames: Frame[];
}
