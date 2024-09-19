// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { pbkdf2 } from "@noble/hashes/pbkdf2";
import { sha256 } from "@noble/hashes/sha256";
import { sha512 } from "@noble/hashes/sha512";
import { Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * Implementation of the password based key derivation function 2.
 */
export class Pbkdf2 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Pbkdf2>();

	/**
	 * Derive a key from the parameters using Sha256.
	 * @param password The password to derive the key from.
	 * @param salt The salt for the derivation.
	 * @param iterations Number of iterations to perform.
	 * @param keyLength The length of the key to derive.
	 * @returns The derived key.
	 */
	public static sha256(
		password: Uint8Array,
		salt: Uint8Array,
		iterations: number,
		keyLength: number
	): Uint8Array {
		Guards.uint8Array(Pbkdf2._CLASS_NAME, nameof(password), password);
		Guards.uint8Array(Pbkdf2._CLASS_NAME, nameof(salt), salt);
		Guards.number(Pbkdf2._CLASS_NAME, nameof(iterations), iterations);
		Guards.number(Pbkdf2._CLASS_NAME, nameof(keyLength), keyLength);
		return pbkdf2(sha256, password, salt, { c: iterations, dkLen: keyLength });
	}

	/**
	 * Derive a key from the parameters using Sha512.
	 * @param password The password to derive the key from.
	 * @param salt The salt for the derivation.
	 * @param iterations Number of iterations to perform.
	 * @param keyLength The length of the key to derive.
	 * @returns The derived key.
	 */
	public static sha512(
		password: Uint8Array,
		salt: Uint8Array,
		iterations: number,
		keyLength: number
	): Uint8Array {
		Guards.uint8Array(Pbkdf2._CLASS_NAME, nameof(password), password);
		Guards.uint8Array(Pbkdf2._CLASS_NAME, nameof(salt), salt);
		Guards.number(Pbkdf2._CLASS_NAME, nameof(iterations), iterations);
		Guards.number(Pbkdf2._CLASS_NAME, nameof(keyLength), keyLength);
		return pbkdf2(sha512, password, salt, { c: iterations, dkLen: keyLength });
	}
}
