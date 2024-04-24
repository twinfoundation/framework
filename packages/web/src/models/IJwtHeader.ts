// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { JwtSigningMethods } from "./jwtSigningMethods";

/**
 * The fields in a JWT header.
 */
export interface IJwtHeader {
	/**
	 * Additional fields in the header.
	 */
	[key: string]: unknown;

	/**
	 * The type of the token.
	 */
	typ?: string;

	/**
	 * The algorithm used to sign the token.
	 */
	alg: JwtSigningMethods;

	/**
	 * The key ID.
	 */
	kid?: string;
}
