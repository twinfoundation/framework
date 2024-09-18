// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ed25519 } from "@noble/curves/ed25519";
import { Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { Ed25519 } from "./ed25519";

/**
 * Implementation of Zip215.
 */
export class Zip215 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Zip215>();

	/**
	 * Verify reports whether sig is a valid signature of block by
	 * publicKey, using precisely-specified validation criteria (ZIP 215) suitable
	 * for use in consensus-critical contexts.
	 * @param publicKey The public key for the block.
	 * @param block The block content to validate.
	 * @param sig The signature to verify.
	 * @returns True if the signature is valid.
	 */
	public static verify(publicKey: Uint8Array, block: Uint8Array, sig: Uint8Array): boolean {
		Guards.uint8Array(Zip215._CLASS_NAME, nameof(publicKey), publicKey);
		Guards.uint8Array(Zip215._CLASS_NAME, nameof(block), block);
		Guards.uint8Array(Zip215._CLASS_NAME, nameof(sig), sig);
		if (publicKey.length !== Ed25519.PUBLIC_KEY_SIZE) {
			return false;
		}
		return ed25519.verify(sig, block, publicKey, { zip215: true });
	}
}
