// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { CompactSign, flattenedVerify } from "jose";

/**
 * Class to handle JSON Web Signatures.
 */
export class Jws {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Jws>();

	/**
	 * Create a signature.
	 * @param privateKey The private key to use.
	 * @param hash The hash to sign.
	 * @returns The signature.
	 */
	public static async create(privateKey: CryptoKey, hash: Uint8Array): Promise<string> {
		Guards.defined(Jws._CLASS_NAME, nameof(privateKey), privateKey);
		Guards.uint8Array(Jws._CLASS_NAME, nameof(hash), hash);

		try {
			const jws = await new CompactSign(hash)
				.setProtectedHeader({
					alg: privateKey.algorithm.name,
					b64: false,
					crit: ["b64"]
				})
				.sign(privateKey);

			return jws;
		} catch (err) {
			throw new GeneralError(Jws._CLASS_NAME, "createFailed", undefined, err);
		}
	}

	/**
	 * Verify a signature.
	 * @param jws The signature to verify.
	 * @param publicKey The public key to verify the signature with.
	 * @param hash The hash to verify.
	 * @returns True if the signature was verified.
	 */
	public static async verify(
		jws: string,
		publicKey: CryptoKey,
		hash: Uint8Array
	): Promise<boolean> {
		Guards.stringValue(Jws._CLASS_NAME, nameof(jws), jws);
		Guards.defined(Jws._CLASS_NAME, nameof(publicKey), publicKey);
		Guards.uint8Array(Jws._CLASS_NAME, nameof(hash), hash);

		try {
			const jwsParts: string[] = jws.split(".");

			await flattenedVerify(
				{ protected: jwsParts[0], payload: hash, signature: jwsParts[2] },
				publicKey
			);

			return true;
		} catch (err) {
			throw new GeneralError(Jws._CLASS_NAME, "verifyFailed", undefined, err);
		}
	}
}
