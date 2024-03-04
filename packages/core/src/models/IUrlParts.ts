// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Model to describe the parts of a url.
 */
export interface IUrlParts {
	/**
	 * The schema for the url.
	 */
	schema: string;

	/**
	 * The host for the url.
	 */
	host: string;

	/**
	 * The port for the url.
	 */
	port?: number;

	/**
	 * The path for the url.
	 */
	path: string;

	/**
	 * The params for the url.
	 */
	params?: string;

	/**
	 * The hash for the url.
	 */
	hash?: string;
}
