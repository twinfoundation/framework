// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpHeaders } from "./IHttpHeaders";

/**
 * Options for call to the fetch helper.
 */
export interface IFetchOptions {
	/**
	 * @param headers The headers for the request.
	 */
	headers?: IHttpHeaders;

	/**
	 * Timeout for requests in milliseconds.
	 */
	timeoutMs?: number;

	/**
	 * Include credentials in the requests.
	 */
	includeCredentials?: boolean;

	/**
	 * The number of times to retry fetching defaults to no retries.
	 */
	retryCount?: number;

	/**
	 * The number of milliseconds we should delay before any retry.
	 */
	retryDelayMs?: number;

	/**
	 * The number of milliseconds to cache the response for, leave undefined for no cache, 0 means infinite.
	 */
	cacheTtlMs?: number;
}
