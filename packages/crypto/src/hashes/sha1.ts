// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { sha1 } from "@noble/hashes/sha1";
import type { Hash } from "@noble/hashes/utils";

/**
 * Perform a SHA-1 hash on the block.
 */
export class Sha1 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Sha1>();

	/**
	 * The instance of the hash.
	 * @internal
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly _instance: Hash<any>;

	/**
	 * Create a new instance of Sha1.
	 */
	constructor() {
		this._instance = sha1.create();
	}

	/**
	 * Perform Sum on the block.
	 * @param block The block to operate on.
	 * @returns The sum of the block.
	 */
	public static sum(block: Uint8Array): Uint8Array {
		Guards.uint8Array(Sha1._CLASS_NAME, nameof(block), block);
		return new Sha1().update(block).digest();
	}

	/**
	 * Update the hash with the block.
	 * @param block The block to update the hash with.
	 * @returns The instance for chaining.
	 */
	public update(block: Uint8Array): Sha1 {
		Guards.uint8Array(Sha1._CLASS_NAME, nameof(block), block);
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
