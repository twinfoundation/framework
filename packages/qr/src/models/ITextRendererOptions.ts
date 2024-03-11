// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRendererOptions } from "./IRendererOptions";

/**
 * Options for rendering as text.
 */
export interface ITextRendererOptions extends IRendererOptions {
	/**
	 * The character to use for on pixels.
	 */
	onChar?: string;

	/**
	 * The character to use for off pixels.
	 */
	offChar?: string;
}
