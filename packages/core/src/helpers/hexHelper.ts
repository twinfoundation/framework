// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Helper methods for hex conversions.
 */
export class HexHelper {
	/**
	 * Strip the 0x prefix if it exists.
	 * @param hex The hex value to strip.
	 * @returns The stripped hex without the prefix.
	 */
	public static stripPrefix(hex: string): string {
		return hex.replace(/^0x/, "");
	}

	/**
	 * Add the 0x prefix if it does not exist.
	 * @param hex The hex value to add the prefix to.
	 * @returns The hex with the prefix.
	 */
	public static addPrefix(hex: string): string {
		return HexHelper.hasPrefix(hex) ? hex : `0x${hex}`;
	}

	/**
	 * Does the hex string have the prefix.
	 * @param hex The hex value to check for the prefix.
	 * @returns True if the hex string has the prefix.
	 */
	public static hasPrefix(hex: string): boolean {
		return hex.startsWith("0x");
	}

	/**
	 * Is the data hex format.
	 * @param value The value to test.
	 * @param allowPrefix Allow the hex to have the 0x prefix.
	 * @returns True if the string is hex.
	 */
	public static isHex(value: string, allowPrefix: boolean = false): boolean {
		const localHex = allowPrefix ? HexHelper.stripPrefix(value) : value;

		if (localHex.length % 2 === 1) {
			return false;
		}
		return /^[\da-f]+$/g.test(localHex);
	}
}
