// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { JwtAlgorithms } from "./jwtAlgorithms";

/**
 * The fields in a JSON Web Token header.
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
	alg: JwtAlgorithms;

	/**
	 * The key ID.
	 */
	kid?: string;
}
