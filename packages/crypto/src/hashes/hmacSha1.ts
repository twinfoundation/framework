// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { hmac } from "@noble/hashes/hmac";
import { sha1 } from "@noble/hashes/sha1";
import type { Hash } from "@noble/hashes/utils";

/**
 * Class to help with HmacSha1 scheme.
 */
export class HmacSha1 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<HmacSha1>();

	/**
	 * The instance of the hash.
	 * @internal
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly _instance: Hash<any>;

	/**
	 * Create a new instance of HmacSha1.
	 * @param key The key for the hmac.
	 */
	constructor(key: Uint8Array) {
		this._instance = hmac.create(sha1, key);
	}

	/**
	 * Perform Sum on the block.
	 * @param key The key for the hmac.
	 * @param block The block to operate on.
	 * @returns The sum of the block.
	 */
	public static sum(key: Uint8Array, block: Uint8Array): Uint8Array {
		Guards.uint8Array(HmacSha1._CLASS_NAME, nameof(key), key);
		Guards.uint8Array(HmacSha1._CLASS_NAME, nameof(block), block);
		return new HmacSha1(key).update(block).digest();
	}

	/**
	 * Update the hash with the block.
	 * @param block The block to update the hash with.
	 * @returns The instance for chaining.
	 */
	public update(block: Uint8Array): HmacSha1 {
		Guards.uint8Array(HmacSha1._CLASS_NAME, nameof(block), block);
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
