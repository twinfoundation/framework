// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter, Guards, Is } from "@gtsc/core";
import { Ed25519, HmacSha256 } from "@gtsc/crypto";
import { nameof } from "@gtsc/nameof";
import type { IJwtHeader } from "../models/IJwtHeader";
import type { IJwtPayload } from "../models/IJwtPayload";
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
	 * @param header The header to encode.
	 * @param payload The payload to encode.
	 * @param key The key for signing the token.
	 * @returns The encoded token.
	 */
	public static encode<U extends IJwtHeader, T extends IJwtPayload>(
		header: U,
		payload: T,
		key: Uint8Array
	): string {
		Guards.object<IJwtHeader>(Jwt._CLASS_NAME, nameof(header), header);
		Guards.arrayOneOf<JwtSigningMethods>(Jwt._CLASS_NAME, nameof(header.alg), header.alg, [
			"HS256",
			"EdDSA"
		]);

		Guards.object<IJwtPayload>(Jwt._CLASS_NAME, nameof(payload), payload);
		Guards.uint8Array(Jwt._CLASS_NAME, nameof(key), key);

		if (Is.undefined(header.typ)) {
			header.typ = "JWT";
		}

		const segments: string[] = [];
		const headerBytes = Converter.utf8ToBytes(JSON.stringify(header));
		segments.push(Converter.bytesToBase64Url(headerBytes));

		const payloadBytes = Converter.utf8ToBytes(JSON.stringify(payload));
		segments.push(Converter.bytesToBase64Url(payloadBytes));

		const jwtHeaderAndPayload = Converter.utf8ToBytes(segments.join("."));

		let sigBytes: Uint8Array;
		if (header.alg === "HS256") {
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
	public static verify(
		token: string,
		key: Uint8Array
	):
		| {
				header: Uint8Array;
				payload: Uint8Array;
		  }
		| undefined {
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

		return {
			header: segmentBytes[0],
			payload: segmentBytes[1]
		};
	}

	/**
	 * Decode a token.
	 * @param token The token to decode.
	 * @param key The key for verifying the token.
	 * @returns The decoded payload.
	 */
	public static decode<U extends IJwtHeader, T extends IJwtPayload>(
		token: string,
		key: Uint8Array
	):
		| {
				header: U;
				payload: T;
		  }
		| undefined {
		const headerAndPayload = Jwt.verify(token, key);
		if (Is.empty(headerAndPayload)) {
			return;
		}

		return {
			header: JSON.parse(Converter.bytesToUtf8(headerAndPayload.header)) as U,
			payload: JSON.parse(Converter.bytesToUtf8(headerAndPayload.payload)) as T
		};
	}
}
