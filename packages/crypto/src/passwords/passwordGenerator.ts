// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { RandomHelper } from "@twin.org/core";

/**
 * Generate random passwords.
 */
export class PasswordGenerator {
	/**
	 * Generate a password of given length.
	 * @param length The length of the password to generate.
	 * @returns The random password.
	 */
	public static generate(length: number): string {
		const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const alphabet2 = `${alphabet}0123456789!#$£%^&*+=@~?}`;

		const chars: string[] = [];

		while (chars.length < length) {
			const charSet = chars.length === 0 ? alphabet : alphabet2;
			let b;
			do {
				b = RandomHelper.generate(1)[0];
			} while (b >= charSet.length);
			chars.push(charSet[b]);
		}

		return chars.join("");
	}
}
