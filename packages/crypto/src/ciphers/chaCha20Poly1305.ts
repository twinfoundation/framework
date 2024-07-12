// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { chacha20poly1305 } from "@noble/ciphers/chacha";
import type { CipherWithOutput } from "@noble/ciphers/utils";

/**
 * Implementation of the ChaCha20Poly1305 cipher.
 */
export class ChaCha20Poly1305 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<ChaCha20Poly1305>();

	/**
	 * The cipher instance.
	 * @internal
	 */
	private readonly _instance: CipherWithOutput;

	/**
	 * Create a new instance of ChaCha20Poly1305.
	 * @param key The key.
	 * @param nonce The nonce.
	 * @param aad The additional authenticated data.
	 */
	constructor(key: Uint8Array, nonce: Uint8Array, aad?: Uint8Array) {
		Guards.uint8Array(ChaCha20Poly1305._CLASS_NAME, nameof(key), key);
		Guards.uint8Array(ChaCha20Poly1305._CLASS_NAME, nameof(nonce), nonce);
		this._instance = chacha20poly1305(key, nonce, aad);
	}

	/**
	 * Encrypt the block.
	 * @param block The block to encrypt.
	 * @returns The block encrypted.
	 */
	public encrypt(block: Uint8Array): Uint8Array {
		Guards.uint8Array(ChaCha20Poly1305._CLASS_NAME, nameof(block), block);
		return this._instance.encrypt(block);
	}

	/**
	 * Decrypt the block.
	 * @param block The block to decrypt.
	 * @returns The block decrypted.
	 */
	public decrypt(block: Uint8Array): Uint8Array {
		Guards.uint8Array(ChaCha20Poly1305._CLASS_NAME, nameof(block), block);
		return this._instance.decrypt(block);
	}
}
