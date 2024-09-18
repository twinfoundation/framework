// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { sha224, sha256 } from "@noble/hashes/sha256";
import type { Hash } from "@noble/hashes/utils";
import { GeneralError, Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * Perform a SHA-256 hash on the block.
 */
export class Sha256 {
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
	private static readonly _CLASS_NAME: string = nameof<Sha256>();

	/**
	 * The instance of the hash.
	 * @internal
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly _instance: Hash<any>;

	/**
	 * Create a new instance of Sha256.
	 * @param bits The number of bits.
	 */
	constructor(bits: number = Sha256.SIZE_256) {
		if (bits !== Sha256.SIZE_224 && bits !== Sha256.SIZE_256) {
			throw new GeneralError(Sha256._CLASS_NAME, "bitSize", { bitSize: bits });
		}

		this._instance = bits === Sha256.SIZE_256 ? sha256.create() : sha224.create();
	}

	/**
	 * Perform Sum 256 on the block.
	 * @param block The block to operate on.
	 * @returns The sum 256 of the block.
	 */
	public static sum256(block: Uint8Array): Uint8Array {
		const b2b = new Sha256(Sha256.SIZE_256);
		b2b.update(block);
		return b2b.digest();
	}

	/**
	 * Perform Sum 224 on the block.
	 * @param block The block to operate on.
	 * @returns The sum 224 of the block.
	 */
	public static sum224(block: Uint8Array): Uint8Array {
		const b2b = new Sha256(Sha256.SIZE_224);
		b2b.update(block);
		return b2b.digest();
	}

	/**
	 * Update the hash with the block.
	 * @param block The block to update the hash with.
	 * @returns The instance for chaining.
	 */
	public update(block: Uint8Array): Sha256 {
		Guards.uint8Array(Sha256._CLASS_NAME, nameof(block), block);
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
