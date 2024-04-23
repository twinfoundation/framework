// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter, Guards, Is } from "@gtsc/core";
import { Ed25519, HmacSha256 } from "@gtsc/crypto";
import { nameof } from "@gtsc/nameof";
import type { JwtSigningMethods } from "../models/jwtSigningMethods";

/**
 * Class to encode and decode JavaScript Web Tokens.
 */
export class Jwt {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Jwt>();

	/**
	 * Encode a token.
	 * @param payload The payload to encode.
	 * @param key The key for signing the token.
	 * @param algorithm The algorithm to create the signature with.
	 * @returns The encoded token.
	 */
	public static encode<T>(
		payload: T,
		key: Uint8Array,
		algorithm: JwtSigningMethods = "EdDSA"
	): string {
		Guards.object(Jwt._CLASS_NAME, nameof(payload), payload);
		Guards.uint8Array(Jwt._CLASS_NAME, nameof(key), key);
		Guards.arrayOneOf<JwtSigningMethods>(Jwt._CLASS_NAME, nameof(algorithm), algorithm, [
			"HS256",
			"EdDSA"
		]);

		const header = {
			alg: algorithm,
			typ: "JWT"
		};

		const segments: string[] = [];
		const headerBytes = Converter.utf8ToBytes(JSON.stringify(header));
		segments.push(Converter.bytesToBase64Url(headerBytes));

		const payloadBytes = Converter.utf8ToBytes(JSON.stringify(payload));
		segments.push(Converter.bytesToBase64Url(payloadBytes));

		const jwtHeaderAndPayload = Converter.utf8ToBytes(segments.join("."));

		let sigBytes: Uint8Array;
		if (algorithm === "HS256") {
			const algo = new HmacSha256(key);
			sigBytes = algo.update(jwtHeaderAndPayload).digest();
		} else {
			sigBytes = Ed25519.sign(key, jwtHeaderAndPayload);
		}
		segments.push(Converter.bytesToBase64Url(sigBytes));

		return segments.join(".");
	}

	/**
	 * Verify a token.
	 * @param token The token to decode.
	 * @param key The key for verifying the token.
	 * @returns The base64 payload or undefined if the verify failed.
	 */
	public static verify(token: string, key: Uint8Array): Uint8Array | undefined {
		Guards.stringValue(Jwt._CLASS_NAME, nameof(token), token);
		Guards.uint8Array(Jwt._CLASS_NAME, nameof(key), key);

		const segments = token.split(".");
		if (segments.length !== 3) {
			return;
		}

		const segmentBytes = segments.map(s => Converter.base64UrlToBytes(s));

		const header: {
			alg: JwtSigningMethods;
			typ: "JWT";
		} = JSON.parse(Converter.bytesToUtf8(segmentBytes[0]));

		Guards.arrayOneOf<JwtSigningMethods>(Jwt._CLASS_NAME, nameof(header.alg), header.alg, [
			"HS256",
			"EdDSA"
		]);

		const sig = segments.pop();

		const jwtHeaderAndPayload = Converter.utf8ToBytes(segments.join("."));

		if (header.alg === "HS256") {
			const algo = new HmacSha256(key);
			const sigBytes = algo.update(jwtHeaderAndPayload).digest();
			if (Converter.bytesToBase64Url(sigBytes) !== sig) {
				return;
			}
		} else if (!Ed25519.verify(key, jwtHeaderAndPayload, segmentBytes[2])) {
			return;
		}

		return segmentBytes[1];
	}

	/**
	 * Decode a token.
	 * @param token The token to decode.
	 * @param key The key for verifying the token.
	 * @returns The decoded payload.
	 */
	public static decode<T>(token: string, key: Uint8Array): T | undefined {
		const payload = Jwt.verify(token, key);
		if (Is.empty(payload)) {
			return;
		}

		return JSON.parse(Converter.bytesToUtf8(payload)) as T;
	}
}
