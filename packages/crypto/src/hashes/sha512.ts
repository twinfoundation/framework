// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable camelcase */

import { GeneralError, Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { sha512_224, sha512_256, sha384, sha512 } from "@noble/hashes/sha512";
import type { Hash } from "@noble/hashes/utils";

/**
 * Perform a SHA-512 hash on the block.
 */
export class Sha512 {
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
	private static readonly _CLASS_NAME: string = nameof<Sha512>();

	/**
	 * The instance of the hash.
	 * @internal
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly _instance: Hash<any>;

	/**
	 * Create a new instance of Sha512.
	 * @param bits The number of bits.
	 */
	constructor(bits: number = Sha512.SIZE_512) {
		if (
			bits !== Sha512.SIZE_224 &&
			bits !== Sha512.SIZE_256 &&
			bits !== Sha512.SIZE_384 &&
			bits !== Sha512.SIZE_512
		) {
			throw new GeneralError(Sha512._CLASS_NAME, "bitSize", { bitSize: bits });
		}

		if (bits === Sha512.SIZE_224) {
			this._instance = sha512_224.create();
		} else if (bits === Sha512.SIZE_256) {
			this._instance = sha512_256.create();
		} else if (bits === Sha512.SIZE_384) {
			this._instance = sha384.create();
		} else {
			this._instance = sha512.create();
		}
	}

	/**
	 * Perform Sum 512 on the block.
	 * @param block The block to operate on.
	 * @returns The sum 512 of the block.
	 */
	public static sum512(block: Uint8Array): Uint8Array {
		const b2b = new Sha512(Sha512.SIZE_512);
		b2b.update(block);
		return b2b.digest();
	}

	/**
	 * Perform Sum 384 on the block.
	 * @param block The block to operate on.
	 * @returns The sum 384 of the block.
	 */
	public static sum384(block: Uint8Array): Uint8Array {
		const b2b = new Sha512(Sha512.SIZE_384);
		b2b.update(block);
		return b2b.digest();
	}

	/**
	 * Perform Sum 256 on the block.
	 * @param block The block to operate on.
	 * @returns The sum 256 of the block.
	 */
	public static sum256(block: Uint8Array): Uint8Array {
		const b2b = new Sha512(Sha512.SIZE_256);
		b2b.update(block);
		return b2b.digest();
	}

	/**
	 * Perform Sum 224 on the block.
	 * @param block The block to operate on.
	 * @returns The sum 224 of the block.
	 */
	public static sum224(block: Uint8Array): Uint8Array {
		const b2b = new Sha512(Sha512.SIZE_224);
		b2b.update(block);
		return b2b.digest();
	}

	/**
	 * Update the hash with the block.
	 * @param block The block to update the hash with.
	 * @returns The instance for chaining.
	 */
	public update(block: Uint8Array): Sha512 {
		Guards.uint8Array(Sha512._CLASS_NAME, nameof(block), block);
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
