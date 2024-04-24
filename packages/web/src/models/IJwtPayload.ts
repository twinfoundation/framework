// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The fields in a JWT payload.
 */
export interface IJwtPayload {
	/**
	 * Additional fields in the payload.
	 */
	[key: string]: unknown;

	/**
	 * The issuer of the token.
	 */
	iss?: string;

	/**
	 * The subject of the token.
	 */
	sub?: string;

	/**
	 * The audience of the token.
	 */
	aud?: string;

	/**
	 * The expiration time of the token.
	 */
	exp?: number;

	/**
	 * The not before time of the token.
	 */
	nbf?: number;

	/**
	 * The issued at time of the token.
	 */
	iat?: number;

	/**
	 * The JWT ID.
	 */
	jti?: string;
}
