// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { GeneralError, Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { ed25519 } from "@noble/curves/ed25519";

/**
 * Implementation of Ed25519.
 */
export class Ed25519 {
	/**
	 * Private Key Size is the size, in bytes, of private keys as used in this package.
	 */
	public static PRIVATE_KEY_SIZE: number = 32;

	/**
	 * Public Key Size is the size, in bytes, of public keys as used in this package.
	 */
	public static PUBLIC_KEY_SIZE: number = 32;

	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Ed25519>();

	/**
	 * Public returns the PublicKey corresponding to private.
	 * @param privateKey The private key to get the corresponding public key.
	 * @returns The public key.
	 * @throws Error if the private key is not the correct length.
	 */
	public static publicKeyFromPrivateKey(privateKey: Uint8Array): Uint8Array {
		Guards.uint8Array(Ed25519._CLASS_NAME, nameof(privateKey), privateKey);
		if (privateKey.length !== Ed25519.PRIVATE_KEY_SIZE) {
			throw new GeneralError(Ed25519._CLASS_NAME, "privateKeyLength", {
				requiredSize: Ed25519.PRIVATE_KEY_SIZE,
				actualSize: privateKey.length
			});
		}
		return ed25519.getPublicKey(privateKey);
	}

	/**
	 * Sign the block with privateKey and returns a signature.
	 * @param privateKey The private key.
	 * @param block The block to sign.
	 * @returns The signature.
	 * @throws Error if the private key is not the correct length.
	 */
	public static sign(privateKey: Uint8Array, block: Uint8Array): Uint8Array {
		Guards.uint8Array(Ed25519._CLASS_NAME, nameof(privateKey), privateKey);
		Guards.uint8Array(Ed25519._CLASS_NAME, nameof(block), block);

		if (privateKey.length !== Ed25519.PRIVATE_KEY_SIZE) {
			throw new GeneralError(Ed25519._CLASS_NAME, "privateKeyLength", {
				requiredSize: Ed25519.PRIVATE_KEY_SIZE,
				actualSize: privateKey ? privateKey.length : 0
			});
		}

		return ed25519.sign(block, privateKey);
	}

	/**
	 * Verify reports whether sig is a valid signature of block by publicKey.
	 * @param publicKey The public key to verify the signature.
	 * @param block The block for the signature.
	 * @param signature The signature.
	 * @returns True if the signature matches.
	 * @throws Error if the public key is not the correct length.
	 */
	public static verify(publicKey: Uint8Array, block: Uint8Array, signature: Uint8Array): boolean {
		Guards.uint8Array(Ed25519._CLASS_NAME, nameof(publicKey), publicKey);
		Guards.uint8Array(Ed25519._CLASS_NAME, nameof(block), block);
		Guards.uint8Array(Ed25519._CLASS_NAME, nameof(signature), signature);

		if (publicKey.length !== Ed25519.PUBLIC_KEY_SIZE) {
			throw new GeneralError(Ed25519._CLASS_NAME, "publicKeyLength", {
				requiredSize: Ed25519.PUBLIC_KEY_SIZE,
				actualSize: publicKey ? publicKey.length : 0
			});
		}

		try {
			return ed25519.verify(signature, block, publicKey);
		} catch {
			return false;
		}
	}
}
