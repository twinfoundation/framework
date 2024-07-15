// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The cryptographic algorithms supported for JSON Web Tokens and JSON Web Keys.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const JwtAlgorithms = {
	/**
	 * HMAC using SHA-256.
	 */
	HS256: "HS256",

	/**
	 * EdDSA using Ed25519.
	 */
	EdDSA: "EdDSA"
} as const;

/**
 * The cryptographic algorithms supported for JSON Web Tokens and JSON Web Keys.
 */
export type JwtAlgorithms = (typeof JwtAlgorithms)[keyof typeof JwtAlgorithms];
