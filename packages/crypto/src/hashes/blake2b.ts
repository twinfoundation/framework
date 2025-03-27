// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { blake2b } from "@noble/hashes/blake2b";
import type { Hash } from "@noble/hashes/utils";
import { Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * Class to help with Blake2B Signature scheme.
 */
export class Blake2b {
	/**
	 * Blake2b 160.
	 */
	public static SIZE_160: number = 20;

	/**
	 * Blake2b 256.
	 */
	public static SIZE_256: number = 32;

	/**
	 * Blake2b 512.
	 */
	public static SIZE_512: number = 64;

	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Blake2b>();

	/**
	 * The instance of the hash.
	 * @internal
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly _instance: Hash<any>;

	/**
	 * Create a new instance of Blake2b.
	 * @param outputLength The output length.
	 * @param key Optional key for the hash.
	 */
	constructor(outputLength: number, key?: Uint8Array) {
		this._instance = blake2b.create({
			dkLen: outputLength,
			key
		});
	}

	/**
	 * Perform Sum 160 on the block.
	 * @param block The block to operate on.
	 * @param key Optional key for the hash.
	 * @returns The sum 160 of the block.
	 */
	public static sum160(block: Uint8Array, key?: Uint8Array): Uint8Array {
		Guards.uint8Array(Blake2b._CLASS_NAME, nameof(block), block);
		return new Blake2b(Blake2b.SIZE_160, key).update(block).digest();
	}

	/**
	 * Perform Sum 256 on the block.
	 * @param block The block to operate on.
	 * @param key Optional key for the hash.
	 * @returns The sum 256 of the block.
	 */
	public static sum256(block: Uint8Array, key?: Uint8Array): Uint8Array {
		Guards.uint8Array(Blake2b._CLASS_NAME, nameof(block), block);
		return new Blake2b(Blake2b.SIZE_256, key).update(block).digest();
	}

	/**
	 * Perform Sum 512 on the block.
	 * @param block The block to operate on.
	 * @param key Optional key for the hash.
	 * @returns The sum 512 of the block.
	 */
	public static sum512(block: Uint8Array, key?: Uint8Array): Uint8Array {
		Guards.uint8Array(Blake2b._CLASS_NAME, nameof(block), block);
		return new Blake2b(Blake2b.SIZE_512, key).update(block).digest();
	}

	/**
	 * Update the hash with the block.
	 * @param block The block to update the hash with.
	 * @returns The instance for chaining.
	 */
	public update(block: Uint8Array): Blake2b {
		Guards.uint8Array(Blake2b._CLASS_NAME, nameof(block), block);
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
