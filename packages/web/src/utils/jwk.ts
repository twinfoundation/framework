// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter, GeneralError, Guards } from "@twin.org/core";
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
	 * @returns The crypto key.
	 */
	public static async toCryptoKey(jwk: IJwk): Promise<JwkCryptoKey> {
		Guards.object<IJwk>(Jwk._CLASS_NAME, nameof(jwk), jwk);

		try {
			return importJWK(jwk);
		} catch (err) {
			throw new GeneralError(Jwk._CLASS_NAME, "jwkImportFailed", undefined, err);
		}
	}

	/**
	 * Convert the Ed25519 private key to a crypto key.
	 * @param privateKey The private key to use.
	 * @returns The crypto key.
	 */
	public static async fromEd25519Private(privateKey: Uint8Array): Promise<JwkCryptoKey> {
		Guards.uint8Array(Jwk._CLASS_NAME, nameof(privateKey), privateKey);

		try {
			const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);

			const jwk: IJwk = {
				kty: "OKP",
				use: "sig",
				alg: "EdDSA",
				crv: "Ed25519",
				x: Converter.bytesToBase64Url(publicKey),
				d: Converter.bytesToBase64Url(privateKey)
			};

			return importJWK(jwk);
		} catch (err) {
			throw new GeneralError(Jwk._CLASS_NAME, "jwkImportFailed", undefined, err);
		}
	}

	/**
	 * Convert the Ed25519 public key to a crypto key.
	 * @param publicKey The private key to use.
	 * @returns The crypto key.
	 */
	public static async fromEd25519Public(publicKey: Uint8Array): Promise<JwkCryptoKey> {
		Guards.uint8Array(Jwk._CLASS_NAME, nameof(publicKey), publicKey);

		try {
			const jwk: IJwk = {
				kty: "OKP",
				use: "sig",
				alg: "EdDSA",
				crv: "Ed25519",
				x: Converter.bytesToBase64Url(publicKey)
			};

			return importJWK(jwk);
		} catch (err) {
			throw new GeneralError(Jwk._CLASS_NAME, "jwkImportFailed", undefined, err);
		}
	}
}
