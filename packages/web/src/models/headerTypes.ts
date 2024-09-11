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
	ContentType: "Content-Type",

	/**
	 * Content Length.
	 */
	ContentLength: "Content-Length",

	/**
	 * Content Disposition.
	 */
	ContentDisposition: "Content-Disposition",

	/**
	 * Accept.
	 */
	Accept: "Accept",

	/**
	 * Authorization.
	 */
	Authorization: "Authorization",

	/**
	 * Cookie.
	 */
	Cookie: "Cookie",

	/**
	 * Set Cookie.
	 */
	SetCookie: "Set-Cookie",

	/**
	 * Location
	 */
	Location: "Location"
} as const;

/**
 * Common http header types.
 */
export type HeaderTypes = (typeof HeaderTypes)[keyof typeof HeaderTypes];
