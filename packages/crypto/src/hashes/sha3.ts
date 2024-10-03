// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
// eslint-disable-next-line camelcase
import { sha3_224, sha3_256, sha3_384, sha3_512 } from "@noble/hashes/sha3";
import type { Hash } from "@noble/hashes/utils";
import { GeneralError, Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * Perform a SHA-3 hash on the block.
 */
export class Sha3 {
	/**
	 * Sha3 224.
	 */
	public static readonly SIZE_224: number = 224;

	/**
	 * Sha3 256.
	 */
	public static readonly SIZE_256: number = 256;

	/**
	 * Sha3 384.
	 */
	public static readonly SIZE_384: number = 384;

	/**
	 * Sha3 512.
	 */
	public static readonly SIZE_512: number = 512;

	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Sha3>();

	/**
	 * The instance of the hash.
	 * @internal
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly _instance: Hash<any>;

	/**
	 * Create a new instance of Sha3.
	 * @param bits The number of bits.
	 */
	constructor(bits: number = Sha3.SIZE_256) {
		if (
			bits !== Sha3.SIZE_224 &&
			bits !== Sha3.SIZE_256 &&
			bits !== Sha3.SIZE_384 &&
			bits !== Sha3.SIZE_512
		) {
			throw new GeneralError(Sha3._CLASS_NAME, "bitSize", { bitSize: bits });
		}

		if (bits === Sha3.SIZE_224) {
			// eslint-disable-next-line camelcase
			this._instance = sha3_224.create();
		} else if (bits === Sha3.SIZE_256) {
			// eslint-disable-next-line camelcase
			this._instance = sha3_256.create();
		} else if (bits === Sha3.SIZE_384) {
			// eslint-disable-next-line camelcase
			this._instance = sha3_384.create();
		} else {
			// eslint-disable-next-line camelcase
			this._instance = sha3_512.create();
		}
	}

	/**
	 * Perform Sum 256 on the block.
	 * @param block The block to operate on.
	 * @returns The sum 256 of the block.
	 */
	public static sum256(block: Uint8Array): Uint8Array {
		const b2b = new Sha3(Sha3.SIZE_256);
		b2b.update(block);
		return b2b.digest();
	}

	/**
	 * Perform Sum 224 on the block.
	 * @param block The block to operate on.
	 * @returns The sum 224 of the block.
	 */
	public static sum224(block: Uint8Array): Uint8Array {
		const b2b = new Sha3(Sha3.SIZE_224);
		b2b.update(block);
		return b2b.digest();
	}

	/**
	 * Perform Sum 384 on the block.
	 * @param block The block to operate on.
	 * @returns The sum 384 of the block.
	 */
	public static sum384(block: Uint8Array): Uint8Array {
		const b2b = new Sha3(Sha3.SIZE_384);
		b2b.update(block);
		return b2b.digest();
	}

	/**
	 * Perform Sum 512 on the block.
	 * @param block The block to operate on.
	 * @returns The sum 512 of the block.
	 */
	public static sum512(block: Uint8Array): Uint8Array {
		const b2b = new Sha3(Sha3.SIZE_512);
		b2b.update(block);
		return b2b.digest();
	}

	/**
	 * Update the hash with the block.
	 * @param block The block to update the hash with.
	 * @returns The instance for chaining.
	 */
	public update(block: Uint8Array): Sha3 {
		Guards.uint8Array(Sha3._CLASS_NAME, nameof(block), block);
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
