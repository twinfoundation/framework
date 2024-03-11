// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */

import { nameof } from "@gtsc/nameof";
import { GeneralError } from "../errors/generalError";

/**
 * Class to help with base63 Encoding/Decoding.
 */
export class Base32 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Base32>();

	/**
	 * Alphabet table for encoding.
	 * @internal
	 */
	private static readonly _ALPHABET: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

	/**
	 * Convert the base 32 string to a byte array.
	 * @param base32 The base32 string to convert.
	 * @returns The byte array.
	 * @throws If the input string contains a character not in the Base32 alphabet.
	 */
	public static decode(base32: string): Uint8Array {
		let bits = 0;
		let value = 0;

		base32 = base32.replace(/=+$/, "");

		let index = 0;
		const output = new Uint8Array(Math.trunc((base32.length * 5) / 8));

		for (let i = 0; i < base32.length; i++) {
			const idx = Base32._ALPHABET.indexOf(base32[i]);

			if (idx === -1) {
				throw new GeneralError(Base32._CLASS_NAME, "invalidCharacter", {
					invalidCharacter: base32[i]
				});
			}
			value = (value << 5) | idx;
			bits += 5;

			if (bits >= 8) {
				output[index++] = (value >>> (bits - 8)) & 255;
				bits -= 8;
			}
		}

		return output;
	}

	/**
	 * Convert a byte array to base 32.
	 * @param bytes The byte array to convert.
	 * @returns The data as base32 string.
	 */
	public static encode(bytes: Uint8Array): string {
		let bits = 0;
		let value = 0;
		let output = "";

		for (let i = 0; i < bytes.byteLength; i++) {
			value = (value << 8) | bytes[i];
			bits += 8;

			while (bits >= 5) {
				output += Base32._ALPHABET[(value >>> (bits - 5)) & 31];
				bits -= 5;
			}
		}

		if (bits > 0) {
			output += Base32._ALPHABET[(value << (5 - bits)) & 31];
		}

		while (output.length % 8 !== 0) {
			output += "=";
		}

		return output;
	}
}
