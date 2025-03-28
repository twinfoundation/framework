// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ed25519 } from "@noble/curves/ed25519";
import { GeneralError, Guards, Uint8ArrayHelper } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

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

	/**
	 * Convert a private key in PKCS8 format.
	 * @param privateKey The private key to convert.
	 * @returns The private key in PKCS8 format.
	 */
	public static async privateKeyToPkcs8(privateKey: Uint8Array): Promise<CryptoKey> {
		Guards.uint8Array(Ed25519._CLASS_NAME, nameof(privateKey), privateKey);

		if (privateKey.length !== Ed25519.PRIVATE_KEY_SIZE) {
			throw new GeneralError(Ed25519._CLASS_NAME, "privateKeyLength", {
				requiredSize: Ed25519.PRIVATE_KEY_SIZE,
				actualSize: privateKey.length
			});
		}

		// crypto.subtle.importKey does not support Ed25519 keys in raw format.
		// We need to convert the key to PKCS8 format before importing.
		// The PKCS8 format is the raw key prefixed with the ASN.1 sequence for an Ed25519 private key.
		// The ASN.1 sequence is 48 46 02 01 00 30 05 06 03 2b 65 70 04 20 04 20 (0x302e020100300506032b657004220420)
		const pkcs8Prefix = new Uint8Array([48, 46, 2, 1, 0, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32]);
		const fullKey = Uint8ArrayHelper.concat([pkcs8Prefix, privateKey]);
		return crypto.subtle.importKey("pkcs8", fullKey, "Ed25519", true, ["sign"]);
	}

	/**
	 * Convert a crypto key to raw private key.
	 * @param cryptoKey The crypto key to convert.
	 * @returns The raw private key.
	 */
	public static async pkcs8ToPrivateKey(cryptoKey: CryptoKey): Promise<Uint8Array> {
		Guards.defined(Ed25519._CLASS_NAME, nameof(cryptoKey), cryptoKey);

		// crypto.subtle.exportKey does not support Ed25519 keys in raw format.
		// so we export as PKCS8 and remove the ASN.1 sequence prefix.
		const pkcs8Bytes = await crypto.subtle.exportKey("pkcs8", cryptoKey);

		return new Uint8Array(pkcs8Bytes.slice(16));
	}
}
