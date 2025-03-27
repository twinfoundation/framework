// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Class to help with uint8 arrays.
 */
export class Uint8ArrayHelper {
	/**
	 * Concatenate multiple arrays.
	 * @param arrays The array to concatenate.
	 * @returns The combined array.
	 */
	public static concat(arrays: Uint8Array[]): Uint8Array {
		let totalLength = 0;

		for (const array of arrays) {
			totalLength += array.length;
		}

		const concatBytes = new Uint8Array(totalLength);

		let offset = 0;
		for (const array of arrays) {
			concatBytes.set(array, offset);
			offset += array.length;
		}

		return concatBytes;
	}
}
