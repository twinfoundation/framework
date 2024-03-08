// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */

import { Converter, Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { HmacSha1 } from "../macs/hmacSha1";

/**
 * Perform HOTP.
 * Implementation of https://datatracker.ietf.org/doc/html/rfc4226 .
 */
export class Hotp {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Hotp>();

	/**
	 * Generate a counter based One Time Password.
	 * @param key Key for the one time password.
	 * @param counter This should be stored by the application,
	 * must be user specific, and be incremented for each request.
	 * @returns The one time password.
	 */
	public static generate(key: Uint8Array, counter: number): string {
		Guards.uint8Array(Hotp._CLASS_NAME, nameof(key), key);
		Guards.number(Hotp._CLASS_NAME, nameof(counter), counter);

		const digits = 6;

		const hmac = new HmacSha1(key);
		hmac.update(Converter.hexToBytes(counter.toString(16).padStart(16, "0")));
		const digest = hmac.digest();

		const offset = digest[digest.length - 1] & 0xf;
		const v =
			((digest[offset] & 0x7f) << 24) |
			((digest[offset + 1] & 0xff) << 16) |
			((digest[offset + 2] & 0xff) << 8) |
			(digest[offset + 3] & 0xff);

		const digitsPow = 10 ** digits;
		const truncated = v % digitsPow;

		return truncated.toString().padStart(digits, "0");
	}

	/**
	 * Check a One Time Password based on a counter.
	 * @param token Passcode to validate.
	 * @param key Key for the one time password.
	 * @param window The allowable margin for the counter.
	 * @param counter This should be stored by the application.
	 * @returns Undefined if failure, delta on success
	 * delta is the time step difference between the client and the server.
	 */
	public static verify(
		token: string,
		key: Uint8Array,
		window: number = 50,
		counter = 0
	): number | undefined {
		// Now loop through from C to C + W to determine if there is
		// a correct code
		for (let i = counter - window; i <= counter + window; ++i) {
			const gen = this.generate(key, i);
			if (gen === token) {
				// We have found a matching code
				return i - counter;
			}
		}

		// If we get to here then no codes have matched, return undefined
		return undefined;
	}
}
