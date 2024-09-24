// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Common http header types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const HeaderTypes = {
	/**
	 * Content Type.
	 */
	ContentType: "content-type",

	/**
	 * Content Length.
	 */
	ContentLength: "content-length",

	/**
	 * Content Disposition.
	 */
	ContentDisposition: "content-disposition",

	/**
	 * Accept.
	 */
	Accept: "accept",

	/**
	 * Authorization.
	 */
	Authorization: "authorization",

	/**
	 * Cookie.
	 */
	Cookie: "cookie",

	/**
	 * Set Cookie.
	 */
	SetCookie: "set-cookie",

	/**
	 * Location
	 */
	Location: "location"
} as const;

/**
 * Common http header types.
 */
export type HeaderTypes = (typeof HeaderTypes)[keyof typeof HeaderTypes];
