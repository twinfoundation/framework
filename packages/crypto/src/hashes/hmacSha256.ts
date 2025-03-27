// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { hmac } from "@noble/hashes/hmac";
import { sha224, sha256 } from "@noble/hashes/sha256";
import type { Hash } from "@noble/hashes/utils";
import { GeneralError, Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * Class to help with HmacSha256 scheme.
 */
export class HmacSha256 {
	/**
	 * Sha256 256.
	 */
	public static readonly SIZE_256: number = 256;

	/**
	 * Sha256 224.
	 */
	public static readonly SIZE_224: number = 224;

	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<HmacSha256>();

	/**
	 * The instance of the hash.
	 * @internal
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly _instance: Hash<any>;

	/**
	 * Create a new instance of HmacSha256.
	 * @param key The key for the hmac.
	 * @param bits The number of bits.
	 */
	constructor(key: Uint8Array, bits: number = HmacSha256.SIZE_256) {
		if (bits !== HmacSha256.SIZE_224 && bits !== HmacSha256.SIZE_256) {
			throw new GeneralError(HmacSha256._CLASS_NAME, "bitSize", { bitSize: bits });
		}

		this._instance = hmac.create(bits === HmacSha256.SIZE_256 ? sha256 : sha224, key);
	}

	/**
	 * Perform Sum 224 on the block.
	 * @param key The key for the hmac.
	 * @param block The block to operate on.
	 * @returns The sum 224 of the block.
	 */
	public static sum224(key: Uint8Array, block: Uint8Array): Uint8Array {
		Guards.uint8Array(HmacSha256._CLASS_NAME, nameof(key), key);
		Guards.uint8Array(HmacSha256._CLASS_NAME, nameof(block), block);
		const instance = new HmacSha256(key, HmacSha256.SIZE_224);
		instance.update(block);
		return instance.digest();
	}

	/**
	 * Perform Sum 256 on the block.
	 * @param key The key for the hmac.
	 * @param block The block to operate on.
	 * @returns The sum 256 of the block.
	 */
	public static sum256(key: Uint8Array, block: Uint8Array): Uint8Array {
		Guards.uint8Array(HmacSha256._CLASS_NAME, nameof(key), key);
		Guards.uint8Array(HmacSha256._CLASS_NAME, nameof(block), block);
		const instance = new HmacSha256(key, HmacSha256.SIZE_256);
		instance.update(block);
		return instance.digest();
	}

	/**
	 * Update the hash with the block.
	 * @param block The block to update the hash with.
	 * @returns The instance for chaining.
	 */
	public update(block: Uint8Array): HmacSha256 {
		Guards.uint8Array(HmacSha256._CLASS_NAME, nameof(block), block);
		this._instance.update(block);
		return this;
	}

	/**
	 * Get the digest for the hash.
	 * @returns The instance for chaining.
	 */
	public digest(): Uint8Array {
		return this._instance.digest();
	}
}
