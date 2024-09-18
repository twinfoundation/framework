// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable camelcase */

import { hmac } from "@noble/hashes/hmac";
import { sha512_224, sha512_256, sha384, sha512 } from "@noble/hashes/sha512";
import type { Hash } from "@noble/hashes/utils";
import { GeneralError, Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * Class to help with HmacSha512 scheme.
 */
export class HmacSha512 {
	/**
	 * Sha512 224.
	 */
	public static SIZE_224: number = 224;

	/**
	 * Sha512 256.
	 */
	public static SIZE_256: number = 256;

	/**
	 * Sha512 384.
	 */
	public static SIZE_384: number = 384;

	/**
	 * Sha512 512.
	 */
	public static SIZE_512: number = 512;

	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<HmacSha512>();

	/**
	 * The instance of the hash.
	 * @internal
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly _instance: Hash<any>;

	/**
	 * Create a new instance of HmacSha512.
	 * @param key The key for the hmac.
	 * @param bits The number of bits.
	 */
	constructor(key: Uint8Array, bits: number = HmacSha512.SIZE_512) {
		if (
			bits !== HmacSha512.SIZE_224 &&
			bits !== HmacSha512.SIZE_256 &&
			bits !== HmacSha512.SIZE_384 &&
			bits !== HmacSha512.SIZE_512
		) {
			throw new GeneralError(HmacSha512._CLASS_NAME, "bitSize", { bitSize: bits });
		}

		if (bits === HmacSha512.SIZE_224) {
			this._instance = hmac.create(sha512_224, key);
		} else if (bits === HmacSha512.SIZE_256) {
			this._instance = hmac.create(sha512_256, key);
		} else if (bits === HmacSha512.SIZE_384) {
			this._instance = hmac.create(sha384, key);
		} else {
			this._instance = hmac.create(sha512, key);
		}
	}

	/**
	 * Perform Sum 512 on the block.
	 * @param key The key for the hmac.
	 * @param block The block to operate on.
	 * @returns The sum 512 of the block.
	 */
	public static sum512(key: Uint8Array, block: Uint8Array): Uint8Array {
		Guards.uint8Array(HmacSha512._CLASS_NAME, nameof(key), key);
		Guards.uint8Array(HmacSha512._CLASS_NAME, nameof(block), block);
		const instance = new HmacSha512(key, HmacSha512.SIZE_512);
		instance.update(block);
		return instance.digest();
	}

	/**
	 * Perform Sum 384 on the block.
	 * @param key The key for the hmac.
	 * @param block The block to operate on.
	 * @returns The sum 384 of the block.
	 */
	public static sum384(key: Uint8Array, block: Uint8Array): Uint8Array {
		Guards.uint8Array(HmacSha512._CLASS_NAME, nameof(key), key);
		Guards.uint8Array(HmacSha512._CLASS_NAME, nameof(block), block);
		const instance = new HmacSha512(key, HmacSha512.SIZE_384);
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
		Guards.uint8Array(HmacSha512._CLASS_NAME, nameof(key), key);
		Guards.uint8Array(HmacSha512._CLASS_NAME, nameof(block), block);
		const instance = new HmacSha512(key, HmacSha512.SIZE_256);
		instance.update(block);
		return instance.digest();
	}

	/**
	 * Perform Sum 224 on the block.
	 * @param key The key for the hmac.
	 * @param block The block to operate on.
	 * @returns The sum 224 of the block.
	 */
	public static sum224(key: Uint8Array, block: Uint8Array): Uint8Array {
		Guards.uint8Array(HmacSha512._CLASS_NAME, nameof(key), key);
		Guards.uint8Array(HmacSha512._CLASS_NAME, nameof(block), block);
		const instance = new HmacSha512(key, HmacSha512.SIZE_224);
		instance.update(block);
		return instance.digest();
	}

	/**
	 * Update the hash with the block.
	 * @param block The block to update the hash with.
	 * @returns The instance for chaining.
	 */
	public update(block: Uint8Array): HmacSha512 {
		Guards.uint8Array(HmacSha512._CLASS_NAME, nameof(block), block);
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
