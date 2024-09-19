// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { GuardError, Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

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
	 * @param strength The strength of the mnemonic to generate, defaults to 256.
	 * @param words The wordlist to use, defaults to the English wordlist.
	 * @returns The random mnemonic.
	 * @throws Error if the length is not a multiple of 32.
	 */
	public static randomMnemonic(strength: number = 256, words: string[] = wordlist): string {
		Guards.number(Bip39._CLASS_NAME, nameof(strength), strength);
		Guards.arrayValue(Bip39._CLASS_NAME, nameof(words), words);

		if (strength % 32 !== 0) {
			throw new GuardError(Bip39._CLASS_NAME, "guard.length32Multiple", nameof(strength), strength);
		}
		return bip39.generateMnemonic(words, strength);
	}

	/**
	 * Generate a mnemonic from the entropy.
	 * @param entropy The entropy to generate.
	 * @param words The wordlist to use, defaults to the English wordlist.
	 * @returns The mnemonic.
	 * @throws Error if the length of the entropy is not a multiple of 4, or is less than 16 or greater than 32.
	 */
	public static entropyToMnemonic(entropy: Uint8Array, words: string[] = wordlist): string {
		Guards.uint8Array(Bip39._CLASS_NAME, nameof(entropy), entropy);
		Guards.arrayValue(Bip39._CLASS_NAME, nameof(words), words);

		if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
			throw new GuardError(
				Bip39._CLASS_NAME,
				"guard.lengthEntropy",
				nameof(entropy),
				entropy.length
			);
		}

		return bip39.entropyToMnemonic(entropy, words);
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
	 * @param words The wordlist to use, defaults to the English wordlist.
	 * @returns The entropy.
	 * @throws Error if the number of words is not a multiple of 3.
	 */
	public static mnemonicToEntropy(mnemonic: string, words: string[] = wordlist): Uint8Array {
		Guards.stringValue(Bip39._CLASS_NAME, nameof(mnemonic), mnemonic);
		Guards.arrayValue(Bip39._CLASS_NAME, nameof(words), words);

		return bip39.mnemonicToEntropy(mnemonic, words);
	}
}
