// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { GuardError, Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";

/**
 * Implementation of Bip39 for mnemonic generation.
 */
export class Bip39 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Bip39>();

	/**
	 * Generate a random mnemonic.
	 * @param length The length of the mnemonic to generate, defaults to 256.
	 * @returns The random mnemonic.
	 * @throws Error if the length is not a multiple of 32.
	 */
	public static randomMnemonic(length: number = 256): string {
		if (length % 32 !== 0) {
			throw new GuardError(Bip39._CLASS_NAME, "guard.length32Multiple", nameof(length), length);
		}
		return bip39.generateMnemonic(wordlist);
	}

	/**
	 * Generate a mnemonic from the entropy.
	 * @param entropy The entropy to generate.
	 * @returns The mnemonic.
	 * @throws Error if the length of the entropy is not a multiple of 4, or is less than 16 or greater than 32.
	 */
	public static entropyToMnemonic(entropy: Uint8Array): string {
		if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
			throw new GuardError(
				Bip39._CLASS_NAME,
				"guard.lengthEntropy",
				nameof(entropy),
				entropy.length
			);
		}

		return bip39.entropyToMnemonic(entropy, wordlist);
	}

	/**
	 * Convert a mnemonic to a seed.
	 * @param mnemonic The mnemonic to convert.
	 * @param password The password to apply to the seed generation.
	 * @returns The seed.
	 */
	public static mnemonicToSeed(mnemonic: string, password?: string): Uint8Array {
		Guards.stringValue(Bip39._CLASS_NAME, nameof(mnemonic), mnemonic);
		return bip39.mnemonicToSeedSync(mnemonic, password);
	}

	/**
	 * Convert the mnemonic back to entropy.
	 * @param mnemonic The mnemonic to convert.
	 * @returns The entropy.
	 * @throws Error if the number of words is not a multiple of 3.
	 */
	public static mnemonicToEntropy(mnemonic: string): Uint8Array {
		Guards.stringValue(Bip39._CLASS_NAME, nameof(mnemonic), mnemonic);

		return bip39.mnemonicToEntropy(mnemonic, wordlist);
	}
}
