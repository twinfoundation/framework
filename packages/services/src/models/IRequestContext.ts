// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The context for the request.
 */
export interface IRequestContext {
	/**
	 * The locale of the context as a code eg es-ES.
	 */
	locale?: string;

	/**
	 * The tenant id for partitioning data.
	 */
	tenantId?: string;

	/**
	 * The identity of the requestor.
	 */
	identity?: string;
}
