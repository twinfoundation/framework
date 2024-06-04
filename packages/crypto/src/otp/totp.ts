// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Base32, RandomHelper } from "@gtsc/core";
import * as otp from "micro-key-producer/otp.js";

/**
 * Perform TOTP.
 * Implementation of https://datatracker.ietf.org/doc/html/rfc4226 .
 */
export class Totp {
	/**
	 * Generate a time based One Time Password.
	 * @param key Key for the one time password.
	 * @param interval The time step of the counter.
	 * @param timestamp The timestamp.
	 * @returns The one time password.
	 */
	public static generate(
		key: Uint8Array,
		interval: number = 30,
		timestamp: number = Date.now()
	): string {
		return otp.totp({ secret: key, digits: 6, algorithm: "sha1", interval }, timestamp);
	}

	/**
	 * Check a One Time Password based on a timer.
	 * @param token Passcode to validate.
	 * @param key Key for the one time password. This should be unique and secret for
	 * every user as it is the seed used to calculate the HMAC.
	 * @param window The allowable margin for the counter.
	 * @param interval The time step of the counter.
	 * @param timestamp The timestamp now.
	 * @returns Undefined if failure, delta on success
	 */
	public static verify(
		token: string,
		key: Uint8Array,
		window: number = 2,
		interval: number = 30,
		timestamp: number = Date.now()
	): number | undefined {
		for (let i = -window; i < window; i++) {
			const intervalWindow = i * interval * 1000;
			if (timestamp + intervalWindow > 0) {
				const gen = this.generate(key, interval, timestamp + intervalWindow);
				if (gen === token) {
					// We have found a matching code
					return i;
				}
			}
		}

		// If we get to here then no codes have matched, return undefined
		return undefined;
	}

	/**
	 * Generate a secret.
	 * @param length The length of the secret to generate.
	 * @returns The secret encoded as base32.
	 */
	public static generateSecret(length: number): string {
		const encodedBase32 = Base32.encode(RandomHelper.generate(length));

		// Strip the trailing = the authenticator apps don't need them
		return encodedBase32.replace(/=/g, "");
	}

	/**
	 * Convert the secret back to bytes.
	 * @param secretBase32 The secret encoded as base32.
	 * @returns The bytes of the secret.
	 */
	public static secretToBytes(secretBase32: string): Uint8Array {
		return Base32.decode(secretBase32);
	}

	/**
	 * Generate a url for use with authenticator apps.
	 * See https://github.com/google/google-authenticator/wiki/Key-Uri-Format .
	 * @param issuer The issuer of the totp.
	 * @param label The label that will show in auth apps.
	 * @param secretBase32 The secret as base 32.
	 * @returns The url.
	 */
	public static generateAuthUrl(issuer: string, label: string, secretBase32: string): string {
		const encodedIssuer = encodeURIComponent(issuer);
		return `otpauth://totp/${encodedIssuer}%3A${encodeURIComponent(
			label
		)}?secret=${secretBase32}&issuer=${encodedIssuer}&digits=6&algorithm=SHA1&interval=30`;
	}
}
