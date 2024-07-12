// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The base context for the request.
 */
export interface IBaseRequestContext {
	/**
	 * The locale of the context as a code e.g. es-ES, defaults to en.
	 */
	locale?: string;
}
