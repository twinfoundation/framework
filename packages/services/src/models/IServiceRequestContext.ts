// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The context for the request used by a service.
 */
export interface IServiceRequestContext {
	/**
	 * The id for partitioning data, usually correlated from the api key making the request.
	 */
	partitionId?: string;

	/**
	 * The identity of the system the request is being performed on.
	 */
	systemIdentity?: string;

	/**
	 * The identity of the requestor if there is an authenticated user.
	 */
	userIdentity?: string;
}
