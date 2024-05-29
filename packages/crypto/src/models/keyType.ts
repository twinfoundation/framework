// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The names of the key tyres.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const KeyType = {
	/**
	 * Ed25519.
	 */
	Ed25519: 0,

	/**
	 * Secp256k1.
	 */
	Secp256k1: 1
} as const;

/**
 * Key types.
 */
export type KeyType = (typeof KeyType)[keyof typeof KeyType];
