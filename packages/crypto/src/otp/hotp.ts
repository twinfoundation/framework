// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import * as otp from "micro-key-producer/otp.js";

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

		return otp.hotp({ secret: key, digits: 6, algorithm: "sha1", interval: 30 }, counter);
	}
}
