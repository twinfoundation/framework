// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The names of the HTTP Methods.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const HttpMethod = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	PATCH: "PATCH",
	DELETE: "DELETE",
	OPTIONS: "OPTIONS",
	HEAD: "HEAD",
	CONNECT: "CONNECT",
	TRACE: "TRACE"
} as const;

/**
 * The HTTP Methods.
 */
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];
