// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { JwtAlgorithms } from "./jwtAlgorithms";

/**
 * The fields in a JSON Web Key.
 */
export interface IJwk {
	/**
	 * Additional fields in the key.
	 */
	[key: string]: unknown;

	/**
	 * The cryptographic algorithm for the key.
	 */
	alg?: JwtAlgorithms;

	/**
	 * The intended use for the key.
	 */
	use?: string;

	/**
	 * The operation(s) that the key is intended to be used for.
	 */
	key_ops?: string[];

	/**
	 * The key type parameter.
	 */
	kty: string;

	/**
	 * The public key parameters.
	 */
	n?: string;

	/**
	 * Exponent parameter.
	 */
	e?: string;

	/**
	 * The private key parameters.
	 */
	d?: string;

	/**
	 * The private key parameters.
	 */
	p?: string;

	/**
	 * The private key parameters.
	 */
	q?: string;

	/**
	 * The private key parameters.
	 */
	dp?: string;

	/**
	 * The private key parameters.
	 */
	dq?: string;

	/**
	 * The private key parameters.
	 */
	qi?: string;

	/**
	 * The key ID.
	 */
	kid?: string;
}
