// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The context for the request.
 */
export interface IRequestContext {
	/**
	 * The locale of the context as a code e.g. es-ES, defaults to en.
	 */
	locale?: string;

	/**
	 * The tenant id for partitioning data, correlated from the api key making the request.
	 */
	tenantId?: string;

	/**
	 * The identity of the requestor if there is an authenticated user.
	 */
	identity?: string;
}
