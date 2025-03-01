// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter, GeneralError, Guards, Is, Uint8ArrayHelper } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { jwtVerify, SignJWT } from "jose";
import type { IJwtHeader } from "../models/IJwtHeader";
import type { IJwtPayload } from "../models/IJwtPayload";
import type { JwkCryptoKey } from "../models/jwkCryptoKey";

/**
 * Class to handle JSON Web Tokens.
 */
export class Jwt {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Jwt>();

	/**
	 * Encode a token.
	 * @param header The header to encode.
	 * @param payload The payload to encode.
	 * @param key The key for signing the token, can be omitted if a signer is provided.
	 * @returns The encoded token.
	 */
	public static async encode<U extends IJwtHeader, T extends IJwtPayload>(
		header: U,
		payload: T,
		key: JwkCryptoKey
	): Promise<string> {
		Guards.object<IJwtHeader>(Jwt._CLASS_NAME, nameof(header), header);
		Guards.stringValue(Jwt._CLASS_NAME, nameof(header.alg), header.alg);

		Guards.object<IJwtPayload>(Jwt._CLASS_NAME, nameof(payload), payload);
		Guards.defined(Jwt._CLASS_NAME, nameof(key), key);

		return Jwt.internalEncode<U, T>(header, payload, key);
	}

	/**
	 * Encode a token.
	 * @param header The header to encode.
	 * @param payload The payload to encode.
	 * @param signer Custom signer method.
	 * @returns The encoded token.
	 */
	public static async encodeWithSigner<U extends IJwtHeader, T extends IJwtPayload>(
		header: U,
		payload: T,
		signer: (
			alg: string,
			key: JwkCryptoKey | undefined,
			header: IJwtHeader,
			payload: IJwtPayload
		) => Promise<string>
	): Promise<string> {
		Guards.object<IJwtHeader>(Jwt._CLASS_NAME, nameof(header), header);
		Guards.stringValue(Jwt._CLASS_NAME, nameof(header.alg), header.alg);

		Guards.object<IJwtPayload>(Jwt._CLASS_NAME, nameof(payload), payload);
		Guards.function(Jwt._CLASS_NAME, nameof(signer), signer);

		return Jwt.internalEncode<U, T>(header, payload, undefined, signer);
	}

	/**
	 * Decode a token.
	 * @param token The token to decode.
	 * @returns The decoded payload.
	 */
	public static async decode<U extends IJwtHeader, T extends IJwtPayload>(
		token: string
	): Promise<{
		header?: U;
		payload?: T;
		signature?: Uint8Array;
	}> {
		Guards.stringValue(Jwt._CLASS_NAME, nameof(token), token);

		let header: U | undefined;
		let payload: T | undefined;
		let signature: Uint8Array | undefined;

		const segments = token.split(".");
		if (segments.length > 0) {
			try {
				const bytesHeader = Converter.base64UrlToBytes(segments[0]);
				header = JSON.parse(Converter.bytesToUtf8(bytesHeader));
			} catch {}
		}

		if (segments.length > 1) {
			try {
				const bytesPayload = Converter.base64UrlToBytes(segments[1]);
				payload = JSON.parse(Converter.bytesToUtf8(bytesPayload));
			} catch {}
		}

		if (segments.length > 2) {
			signature = Converter.base64UrlToBytes(segments[2]);
		}

		return {
			header,
			payload,
			signature
		};
	}

	/**
	 * Verify a token.
	 * @param token The token to verify.
	 * @param key The key for verifying the token
	 * @returns The decoded payload.
	 */
	public static async verify<T extends IJwtHeader, U extends IJwtPayload>(
		token: string,
		key: JwkCryptoKey
	): Promise<{
		header: T;
		payload: U;
	}> {
		Guards.stringValue(Jwt._CLASS_NAME, nameof(token), token);
		Guards.defined(Jwt._CLASS_NAME, nameof(key), key);

		return Jwt.verifySignature<T, U>(token, key);
	}

	/**
	 * Verify a token.
	 * @param token The token to verify.
	 * @param verifier Custom verification method.
	 * @returns The decoded payload.
	 */
	public static async verifyWithVerifier<T extends IJwtHeader, U extends IJwtPayload>(
		token: string,
		verifier: (
			token: string,
			key: JwkCryptoKey | undefined
		) => Promise<{
			header: T;
			payload: U;
		}>
	): Promise<{
		header: T;
		payload: U;
	}> {
		Guards.stringValue(Jwt._CLASS_NAME, nameof(token), token);
		Guards.function(Jwt._CLASS_NAME, nameof(verifier), verifier);

		return Jwt.verifySignature<T, U>(token, undefined, verifier);
	}

	/**
	 * Verify a token by parts.
	 * @param token The token to verify.
	 * @param key The key for verifying the token, if not provided no verification occurs.
	 * @param verifier Custom verification method.
	 * @returns True if the parts are verified.
	 */
	public static async verifySignature<T extends IJwtHeader, U extends IJwtPayload>(
		token: string,
		key?: JwkCryptoKey,
		verifier?: (
			token: string,
			key: JwkCryptoKey | undefined
		) => Promise<{
			header: T;
			payload: U;
		}>
	): Promise<{
		header: T;
		payload: U;
	}> {
		Guards.stringValue(Jwt._CLASS_NAME, nameof(token), token);
		const hasKey = Is.notEmpty(key);
		const hasVerifier = Is.notEmpty(verifier);
		if (!hasKey && !hasVerifier) {
			throw new GeneralError(Jwt._CLASS_NAME, "noKeyOrVerifier");
		}

		verifier ??= async (
			t,
			k
		): Promise<{
			header: T;
			payload: U;
		}> => Jwt.defaultVerifier(t, k);

		return verifier(token, key);
	}

	/**
	 * The default signer for the JWT.
	 * @param alg The algorithm to use.
	 * @param key The key to sign with.
	 * @param header The header to sign.
	 * @param payload The payload to sign.
	 * @returns The signature.
	 */
	public static async defaultSigner(
		alg: string,
		key: JwkCryptoKey | undefined,
		header: IJwtHeader,
		payload: IJwtPayload
	): Promise<string> {
		Guards.defined(Jwt._CLASS_NAME, nameof(key), key);
		Guards.object(Jwt._CLASS_NAME, nameof(header), header);
		Guards.object(Jwt._CLASS_NAME, nameof(payload), payload);

		const signer = new SignJWT(payload);
		header.alg = alg;
		signer.setProtectedHeader(header);

		if (alg === "EdDSA" && Is.uint8Array(key)) {
			// crypto.subtle.importKey does not support Ed25519 keys in raw format.
			// We need to convert the key to PKCS8 format before importing.
			// The PKCS8 format is the raw key prefixed with the ASN.1 sequence for an Ed25519 private key.
			// The ASN.1 sequence is 48 46 02 01 00 30 05 06 03 2b 65 70 04 20 04 20
			const pkcs8Prefix = new Uint8Array([
				48, 46, 2, 1, 0, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32
			]); // 0x302e020100300506032b657004220420
			const pkcs8PrivateKey = Uint8ArrayHelper.concat([pkcs8Prefix, key]);
			const imported = await crypto.subtle.importKey("pkcs8", pkcs8PrivateKey, "Ed25519", false, [
				"sign"
			]);
			return signer.sign(imported);
		}
		return signer.sign(key);
	}

	/**
	 * The default verifier for the JWT.
	 * @param token The token to verify.
	 * @param key The key to verify with.
	 * @returns True if the signature was verified.
	 */
	public static async defaultVerifier<T extends IJwtHeader, U extends IJwtPayload>(
		token: string,
		key: JwkCryptoKey | undefined
	): Promise<{
		header: T;
		payload: U;
	}> {
		Guards.stringValue(Jwt._CLASS_NAME, nameof(token), token);
		Guards.defined(Jwt._CLASS_NAME, nameof(key), key);

		try {
			const result = await jwtVerify(token, key);
			return {
				header: result.protectedHeader as T,
				payload: result.payload as U
			};
		} catch (err) {
			throw new GeneralError(Jwt._CLASS_NAME, "verifyFailed", undefined, err);
		}
	}

	/**
	 * Encode a token.
	 * @param header The header to encode.
	 * @param payload The payload to encode.
	 * @param key The key for signing the token, can be omitted if a signer is provided.
	 * @param signer Custom signer method.
	 * @returns The encoded token.
	 * @internal
	 */
	private static async internalEncode<U extends IJwtHeader, T extends IJwtPayload>(
		header: U,
		payload: T,
		key?: JwkCryptoKey,
		signer?: (
			alg: string,
			key: JwkCryptoKey | undefined,
			header: IJwtHeader,
			payload: IJwtPayload
		) => Promise<string>
	): Promise<string> {
		const hasKey = Is.notEmpty(key);
		const hasSigner = Is.notEmpty(signer);
		if (!hasKey && !hasSigner) {
			throw new GeneralError(Jwt._CLASS_NAME, "noKeyOrSigner");
		}

		signer ??= async (alg, k, h, p): Promise<string> => Jwt.defaultSigner(alg, k, h, p);

		if (Is.undefined(header.typ)) {
			header.typ = "JWT";
		}

		return signer(header.alg, key, header, payload);
	}
}
