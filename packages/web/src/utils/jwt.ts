// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { ArrayHelper, Converter, GeneralError, Guards, Is } from "@gtsc/core";
import { Ed25519, HmacSha256 } from "@gtsc/crypto";
import { nameof } from "@gtsc/nameof";
import type { IJwtHeader } from "../models/IJwtHeader";
import type { IJwtPayload } from "../models/IJwtPayload";
import type { JwtAlgorithms } from "../models/jwtAlgorithms";

/**
 * Class to encode and decode JSON Web Tokens.
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
	 * @param signer Custom signer method.
	 * @returns The encoded token.
	 */
	public static async encode<U extends IJwtHeader, T extends IJwtPayload>(
		header: U,
		payload: T,
		key?: Uint8Array,
		signer?: (
			alg: JwtAlgorithms,
			key: Uint8Array | undefined,
			payload: Uint8Array
		) => Promise<Uint8Array>
	): Promise<string> {
		Guards.object<IJwtHeader>(Jwt._CLASS_NAME, nameof(header), header);
		Guards.arrayOneOf<JwtAlgorithms>(Jwt._CLASS_NAME, nameof(header.alg), header.alg, [
			"HS256",
			"EdDSA"
		]);

		Guards.object<IJwtPayload>(Jwt._CLASS_NAME, nameof(payload), payload);

		const hasKey = Is.notEmpty(key);
		const hasSigner = Is.notEmpty(signer);
		if (!hasKey && !hasSigner) {
			throw new GeneralError(Jwt._CLASS_NAME, "noKeyOrSigner");
		}

		if (hasKey) {
			Guards.uint8Array(Jwt._CLASS_NAME, nameof(key), key);
		}

		signer ??= async (alg, k, p): Promise<Uint8Array> => Jwt.defaultSigner(alg, k as Uint8Array, p);

		if (Is.undefined(header.typ)) {
			header.typ = "JWT";
		}

		const segments: string[] = [];
		const headerBytes = Converter.utf8ToBytes(JSON.stringify(header));
		segments.push(Converter.bytesToBase64Url(headerBytes));

		const payloadBytes = Converter.utf8ToBytes(JSON.stringify(payload));
		segments.push(Converter.bytesToBase64Url(payloadBytes));

		const jwtHeaderAndPayload = Converter.utf8ToBytes(segments.join("."));

		const sigBytes = await signer(header.alg, key, jwtHeaderAndPayload);

		segments.push(Converter.bytesToBase64Url(sigBytes));

		return segments.join(".");
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
	 * @param verifier Custom verification method.
	 * @returns The decoded payload.
	 */
	public static async verify<U extends IJwtHeader, T extends IJwtPayload>(
		token: string,
		key: Uint8Array | undefined,
		verifier?: (
			alg: JwtAlgorithms,
			key: Uint8Array | undefined,
			payload: Uint8Array,
			signature: Uint8Array
		) => Promise<boolean>
	): Promise<{
		verified: boolean;
		header?: U;
		payload?: T;
		signature?: Uint8Array;
	}> {
		Guards.stringValue(Jwt._CLASS_NAME, nameof(token), token);
		Guards.uint8Array(Jwt._CLASS_NAME, nameof(key), key);

		const decoded = await Jwt.decode<U, T>(token);
		const verified = await Jwt.verifySignature<U, T>(
			decoded.header,
			decoded.payload,
			decoded.signature,
			key,
			verifier
		);

		return {
			verified,
			...decoded
		};
	}

	/**
	 * Verify a token by parts.
	 * @param header The header to verify.
	 * @param payload The payload to verify.
	 * @param signature The signature to verify.
	 * @param key The key for verifying the token, if not provided no verification occurs.
	 * @param verifier Custom verification method.
	 * @returns True if the parts are verified.
	 */
	public static async verifySignature<U extends IJwtHeader, T extends IJwtPayload>(
		header?: U,
		payload?: T,
		signature?: Uint8Array,
		key?: Uint8Array,
		verifier?: (
			alg: JwtAlgorithms,
			key: Uint8Array | undefined,
			payload: Uint8Array,
			signature: Uint8Array
		) => Promise<boolean>
	): Promise<boolean> {
		let verified = false;

		if (
			Is.object<U>(header) &&
			Is.object<T>(payload) &&
			Is.uint8Array(signature) &&
			Is.uint8Array(key) &&
			Is.arrayOneOf<JwtAlgorithms>(header.alg, ["HS256", "EdDSA"])
		) {
			const segments: string[] = [];
			const headerBytes = Converter.utf8ToBytes(JSON.stringify(header));
			segments.push(Converter.bytesToBase64Url(headerBytes));

			const payloadBytes = Converter.utf8ToBytes(JSON.stringify(payload));
			segments.push(Converter.bytesToBase64Url(payloadBytes));

			const jwtHeaderAndPayload = Converter.utf8ToBytes(segments.join("."));

			verifier ??= async (alg, k, p, s): Promise<boolean> =>
				Jwt.defaultVerifier(alg, k as Uint8Array, p, s);

			verified = await verifier(header.alg, key, jwtHeaderAndPayload, signature);
		}

		return verified;
	}

	/**
	 * The default signer for the JWT.
	 * @param alg The algorithm to use.
	 * @param key The key to sign with.
	 * @param payload The payload to sign.
	 * @returns The signature.
	 */
	public static async defaultSigner(
		alg: JwtAlgorithms,
		key: Uint8Array,
		payload: Uint8Array
	): Promise<Uint8Array> {
		if (alg === "HS256") {
			const algo = new HmacSha256(key);
			return algo.update(payload).digest();
		}
		return Ed25519.sign(key, payload);
	}

	/**
	 * The default verifier for the JWT.
	 * @param alg The algorithm to use.
	 * @param key The key to verify with.
	 * @param payload The payload to verify.
	 * @param signature The signature to verify.
	 * @returns True if the signature was verified.
	 */
	public static async defaultVerifier(
		alg: JwtAlgorithms,
		key: Uint8Array,
		payload: Uint8Array,
		signature: Uint8Array
	): Promise<boolean> {
		if (alg === "HS256") {
			const algo = new HmacSha256(key);
			const sigBytes = algo.update(payload).digest();
			return ArrayHelper.matches(sigBytes, signature);
		}
		return Ed25519.verify(key, payload, signature);
	}
}
