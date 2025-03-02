// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter, GeneralError, Guards, Is, ObjectHelper } from "@twin.org/core";
import { Ed25519 } from "@twin.org/crypto";
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
	public static async encode<T extends IJwtHeader, U extends IJwtPayload>(
		header: T,
		payload: U,
		key: JwkCryptoKey
	): Promise<string> {
		Guards.object<IJwtHeader>(Jwt._CLASS_NAME, nameof(header), header);
		Guards.stringValue(Jwt._CLASS_NAME, nameof(header.alg), header.alg);

		Guards.object<IJwtPayload>(Jwt._CLASS_NAME, nameof(payload), payload);
		Guards.defined(Jwt._CLASS_NAME, nameof(key), key);

		return Jwt.internalEncode<T, U>(header, payload, key);
	}

	/**
	 * Encode a token.
	 * @param header The header to encode.
	 * @param payload The payload to encode.
	 * @param signer Custom signer method.
	 * @returns The encoded token.
	 */
	public static async encodeWithSigner<T extends IJwtHeader, U extends IJwtPayload>(
		header: T,
		payload: U,
		signer: (
			header: IJwtHeader,
			payload: IJwtPayload,
			key: JwkCryptoKey | undefined
		) => Promise<string>
	): Promise<string> {
		Guards.object<IJwtHeader>(Jwt._CLASS_NAME, nameof(header), header);
		Guards.stringValue(Jwt._CLASS_NAME, nameof(header.alg), header.alg);

		Guards.object<IJwtPayload>(Jwt._CLASS_NAME, nameof(payload), payload);
		Guards.function(Jwt._CLASS_NAME, nameof(signer), signer);

		return Jwt.internalEncode<T, U>(header, payload, undefined, signer);
	}

	/**
	 * Decode a token.
	 * @param token The token to decode.
	 * @returns The decoded payload.
	 */
	public static async decode<T extends IJwtHeader, U extends IJwtPayload>(
		token: string
	): Promise<{
		header?: T;
		payload?: U;
		signature?: Uint8Array;
	}> {
		Guards.stringValue(Jwt._CLASS_NAME, nameof(token), token);

		let header: T | undefined;
		let payload: U | undefined;
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
	 * @param header The header to sign.
	 * @param payload The payload to sign.
	 * @param key The optional key to sign with.
	 * @returns The signature.
	 */
	public static async defaultSigner(
		header: IJwtHeader,
		payload: IJwtPayload,
		key: JwkCryptoKey | undefined
	): Promise<string> {
		Guards.object(Jwt._CLASS_NAME, nameof(header), header);
		Guards.object(Jwt._CLASS_NAME, nameof(payload), payload);
		Guards.defined(Jwt._CLASS_NAME, nameof(key), key);

		const signer = new SignJWT(payload);
		signer.setProtectedHeader(header);

		let finalKey = key;
		if (header.alg === "EdDSA" && Is.uint8Array(key)) {
			// Jose does not support Ed25519 keys in raw format, so we need to convert it to PKCS8.
			finalKey = await Ed25519.privateKeyToPKCS8(key);
		}
		return signer.sign(finalKey);
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
	 * Create bytes for signing from header and payload.
	 * @param header The header.
	 * @param payload The payload.
	 * @returns The bytes to sign.
	 */
	public static toSigningBytes<T extends IJwtHeader, U extends IJwtPayload>(
		header: T,
		payload: U
	): Uint8Array {
		Guards.object<T>(Jwt._CLASS_NAME, nameof(header), header);
		Guards.object<U>(Jwt._CLASS_NAME, nameof(payload), payload);

		const segments: string[] = [];

		const headerBytes = Converter.utf8ToBytes(JSON.stringify(header));
		segments.push(Converter.bytesToBase64Url(headerBytes));

		const payloadBytes = Converter.utf8ToBytes(JSON.stringify(payload));
		segments.push(Converter.bytesToBase64Url(payloadBytes));

		return Converter.utf8ToBytes(segments.join("."));
	}

	/**
	 * Create header and payload from signing bytes.
	 * @param signingBytes The signing bytes from a token.
	 * @returns The header and payload.
	 * @throws If the signing bytes are invalid
	 */
	public static fromSigningBytes<T extends IJwtHeader, U extends IJwtPayload>(
		signingBytes: Uint8Array
	): {
		header: T;
		payload: U;
	} {
		Guards.uint8Array(Jwt._CLASS_NAME, nameof(signingBytes), signingBytes);

		const segments = Converter.bytesToUtf8(signingBytes).split(".");
		if (segments.length !== 2) {
			throw new GeneralError(Jwt._CLASS_NAME, "invalidSigningBytes");
		}

		const headerBytes = Converter.base64UrlToBytes(segments[0]);
		const payloadBytes = Converter.base64UrlToBytes(segments[1]);

		return {
			header: ObjectHelper.fromBytes<T>(headerBytes),
			payload: ObjectHelper.fromBytes<U>(payloadBytes)
		};
	}

	/**
	 * Convert signed bytes and signature bytes to token.
	 * @param signingBytes The signed bytes.
	 * @param signature The signature.
	 * @returns The token.
	 */
	public static tokenFromBytes(signingBytes: Uint8Array, signature: Uint8Array): string {
		Guards.uint8Array(Jwt._CLASS_NAME, nameof(signingBytes), signingBytes);
		Guards.uint8Array(Jwt._CLASS_NAME, nameof(signature), signature);
		const signedBytesUtf8 = Converter.bytesToUtf8(signingBytes);
		const signatureBase64 = Converter.bytesToBase64Url(signature);
		return `${signedBytesUtf8}.${signatureBase64}`;
	}

	/**
	 * Convert the token to signing bytes and signature bytes.
	 * @param token The token to convert to bytes.
	 * @returns The decoded bytes.
	 * @throws If the token is invalid.
	 */
	public static tokenToBytes(token: string): {
		signingBytes: Uint8Array;
		signature: Uint8Array;
	} {
		Guards.stringValue(Jwt._CLASS_NAME, nameof(token), token);

		const segments: string[] = token.split(".");

		if (segments.length !== 3) {
			throw new GeneralError(Jwt._CLASS_NAME, "invalidTokenParts");
		}

		const signingBytes = Converter.utf8ToBytes(`${segments[0]}.${segments[1]}`);
		const signature = Converter.base64UrlToBytes(segments[2]);

		return {
			signingBytes,
			signature
		};
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
	private static async internalEncode<T extends IJwtHeader, U extends IJwtPayload>(
		header: T,
		payload: U,
		key?: JwkCryptoKey,
		signer?: (
			header: IJwtHeader,
			payload: IJwtPayload,
			key: JwkCryptoKey | undefined
		) => Promise<string>
	): Promise<string> {
		const hasKey = Is.notEmpty(key);
		const hasSigner = Is.notEmpty(signer);
		if (!hasKey && !hasSigner) {
			throw new GeneralError(Jwt._CLASS_NAME, "noKeyOrSigner");
		}

		signer ??= async (h, p, k): Promise<string> => Jwt.defaultSigner(h, p, k);

		if (Is.undefined(header.typ)) {
			header.typ = "JWT";
		}

		return signer(header, payload, key);
	}
}
