// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { KeyType } from "./keyType";

/**
 * Interface describing a key pair.
 */
export interface IKeyPair {
	/**
	 * The type of the key.
	 */
	type: KeyType;

	/**
	 * The private version of the key.
	 */
	privateKey: Uint8Array;

	/**
	 * The public version of the key.
	 */
	publicKey: Uint8Array;
}
