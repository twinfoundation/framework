// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter, GeneralError, Guards, Is } from "@twin.org/core";
import { Ed25519 } from "@twin.org/crypto";
import { nameof } from "@twin.org/nameof";
import { importJWK } from "jose";
import type { IJwk } from "../models/IJwk";
import type { JwkCryptoKey } from "../models/jwkCryptoKey";

/**
 * Class to handle JSON Web Keys.
 */
export class Jwk {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Jwk>();

	/**
	 * Convert the JWK to a crypto key.
	 * @param jwk The JWK to convert.
	 * @param alg The alg to be used.
	 * @returns The crypto key.
	 */
	public static async toCryptoKey(jwk: IJwk, alg?: string): Promise<JwkCryptoKey> {
		Guards.object<IJwk>(Jwk._CLASS_NAME, nameof(jwk), jwk);
		try {
			return importJWK(jwk, alg ?? jwk.alg);
		} catch (err) {
			throw new GeneralError(Jwk._CLASS_NAME, "jwkImportFailed", undefined, err);
		}
	}

	/**
	 * Convert the Ed25519 private key to a crypto key.
	 * @param privateKey The private key to use.
	 * @returns The crypto key.
	 */
	public static async fromEd25519Private(privateKey: Uint8Array): Promise<IJwk> {
		Guards.uint8Array(Jwk._CLASS_NAME, nameof(privateKey), privateKey);

		const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);

		const jwk: IJwk = {
			kty: "OKP",
			use: "enc",
			alg: "EdDSA",
			crv: "Ed25519",
			x: Converter.bytesToBase64Url(publicKey),
			d: Converter.bytesToBase64Url(privateKey)
		};

		return jwk;
	}

	/**
	 * Convert the Ed25519 public key to a crypto key.
	 * @param publicKey The private key to use.
	 * @returns The crypto key.
	 */
	public static async fromEd25519Public(publicKey: Uint8Array): Promise<IJwk> {
		Guards.uint8Array(Jwk._CLASS_NAME, nameof(publicKey), publicKey);

		const jwk: IJwk = {
			kty: "OKP",
			use: "sig",
			alg: "EdDSA",
			crv: "Ed25519",
			x: Converter.bytesToBase64Url(publicKey)
		};

		return jwk;
	}

	/**
	 * Convert the JWK to raw keys.
	 * @param jwk The JWK to convert to raw.
	 * @returns The crypto key.
	 */
	public static async toRaw(jwk: IJwk): Promise<{
		publicKey?: Uint8Array;
		privateKey?: Uint8Array;
	}> {
		Guards.object<IJwk>(Jwk._CLASS_NAME, nameof(jwk), jwk);

		let publicKey: Uint8Array | undefined;
		let privateKey: Uint8Array | undefined;

		if (Is.stringBase64Url(jwk.x)) {
			publicKey = Converter.base64UrlToBytes(jwk.x);
		}
		if (Is.stringBase64Url(jwk.d)) {
			privateKey = Converter.base64UrlToBytes(jwk.d);
		}

		return {
			publicKey,
			privateKey
		};
	}
}
