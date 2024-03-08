// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Base32, RandomHelper } from "@gtsc/core";
import { Hotp } from "./hotp";

/**
 * Perform TOTP.
 * Implementation of https://datatracker.ietf.org/doc/html/rfc4226 .
 */
export class Totp {
	/**
	 * Generate a time based One Time Password.
	 * @param key Key for the one time password.
	 * @param timeStep The time step of the counter.
	 * @param now The timestamp now.
	 * @returns The one time password.
	 */
	public static generate(key: Uint8Array, timeStep: number = 30, now: number = Date.now()): string {
		const counter = Math.floor(now / 1000 / timeStep);

		return Hotp.generate(key, counter);
	}

	/**
	 * Check a One Time Password based on a timer.
	 * @param token Passcode to validate.
	 * @param key Key for the one time password. This should be unique and secret for
	 * every user as it is the seed used to calculate the HMAC.
	 * @param window The allowable margin for the counter.
	 * @param timeStep The time step of the counter.
	 * @param now The timestamp now.
	 * @returns Undefined if failure, delta on success
	 * delta is the time step difference between the client and the server.
	 */
	public static verify(
		token: string,
		key: Uint8Array,
		window: number = 2,
		timeStep: number = 30,
		now: number = Date.now()
	): number | undefined {
		const counter = Math.floor(now / 1000 / timeStep);

		return Hotp.verify(token, key, window, counter);
	}

	/**
	 * Generate a secret.
	 * @param length The length of the secret to generate.
	 * @returns The secret encoded as base32.
	 */
	public static generateSecret(length: number): string {
		const encodedBase32 = Base32.encode(RandomHelper.generate(length));

		// Strip the trailing = the authenticator apps don't need them
		// eslint-disable-next-line no-div-regex
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
		)}?secret=${secretBase32}&issuer=${encodedIssuer}`;
	}
}
