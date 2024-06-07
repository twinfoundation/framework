// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, GeneralError, Guards, Is } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { bech32 } from "@scure/base";

/**
 * Bech32 encoding and decoding.
 */
export class Bech32 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Bech32>();

	/**
	 * Encode the buffer.
	 * @param humanReadablePart The header.
	 * @param data The data to encode.
	 * @returns The encoded data.
	 */
	public static encode(humanReadablePart: string, data: Uint8Array): string {
		Guards.stringValue(Bech32._CLASS_NAME, "humanReadablePart", humanReadablePart);
		Guards.uint8Array(Bech32._CLASS_NAME, "data", data);
		return bech32.encode(humanReadablePart, bech32.toWords(data));
	}

	/**
	 * Decode a bech32 string.
	 * @param bech The text to decode.
	 * @returns The decoded data or undefined if it could not be decoded.
	 * @throws An error if the decoding fails.
	 */
	public static decode(bech: string): {
		humanReadablePart: string;
		data: Uint8Array;
	} {
		Guards.stringValue(Bech32._CLASS_NAME, "bech", bech);

		try {
			const result = bech32.decodeToBytes(bech);
			return {
				humanReadablePart: result.prefix,
				data: result.bytes
			};
		} catch (err) {
			if (BaseError.isErrorMessage(err, /checksum/)) {
				throw new GeneralError(Bech32._CLASS_NAME, "invalidChecksum", { bech: bech32 });
			} else if (BaseError.isErrorMessage(err, /between prefix and data only/i)) {
				throw new GeneralError(Bech32._CLASS_NAME, "separatorMisused", { bech: bech32 });
			} else if (BaseError.isErrorMessage(err, /lowercase or uppercase/i)) {
				throw new GeneralError(Bech32._CLASS_NAME, "lowerUpper", { bech: bech32 });
			} else if (
				BaseError.isErrorMessage(err, /must be at least/i) ||
				BaseError.isErrorMessage(err, /wrong string length/i)
			) {
				throw new GeneralError(Bech32._CLASS_NAME, "dataTooShort", { bech: bech32 });
			}

			throw new GeneralError(Bech32._CLASS_NAME, "decodeFailed", { bech: bech32 }, err);
		}
	}

	/**
	 * Is the input a bech 32 address.
	 * @param bech The value to test.
	 * @returns True if this is potentially a match.
	 */
	public static isBech32(bech: unknown): bech is string {
		try {
			if (Is.stringValue(bech)) {
				const result = bech32.decodeToBytes(bech);
				return (
					Is.stringValue(result.prefix) && Is.uint8Array(result.bytes) && result.bytes.length > 0
				);
			}
		} catch {}
		return false;
	}
}
