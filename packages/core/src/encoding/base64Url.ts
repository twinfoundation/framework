// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Base64 } from "./base64";

/**
 * Class to help with base64 URL Encoding/Decoding.
 * https://www.rfc-editor.org/rfc/rfc4648#section-5.
 */
export class Base64Url {
	/**
	 * Convert the base 64 string to a byte array.
	 * @param base64Url The base64 url string to convert.
	 * @returns The byte array.
	 */
	public static decode(base64Url: string): Uint8Array {
		let base64 = base64Url;

		// Base 64 url can have padding removed, so add it back if it is missing.
		if (base64.length > 0 && !base64.endsWith("=")) {
			const placeHoldersLen = 4 - (base64.length % 4);
			if (placeHoldersLen > 0 && placeHoldersLen < 4) {
				base64 = base64.padEnd(base64.length + placeHoldersLen, "=");
			}
		}

		base64 = base64.replace(/-/g, "+").replace(/_/g, "/");
		return Base64.decode(base64);
	}

	/**
	 * Convert a byte array to base 64 url.
	 * @param bytes The byte array to convert.
	 * @returns The data as base64 url string.
	 */
	public static encode(bytes: Uint8Array): string {
		const base64 = Base64.encode(bytes);
		// Base 64 url can have padding removed, so remove it.
		return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
	}
}
