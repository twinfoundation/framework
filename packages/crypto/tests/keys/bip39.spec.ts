// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter } from "@gtsc/core";
import testData from "./bip39.json";
import { Bip39 } from "../../src/keys/bip39";

describe("Bip39", () => {
	test("Can generate a random mnemonic with default length", () => {
		const mnemonic = Bip39.randomMnemonic();
		expect(mnemonic.split(" ").length).toEqual(24);
	});

	test("Can generate a random mnemonic with custom length", () => {
		const mnemonic = Bip39.randomMnemonic(128);
		expect(mnemonic.split(" ").length).toEqual(12);
	});

	test("Can verify with test vectors", () => {
		for (const test of testData) {
			const entropyBytes = Converter.hexToBytes(test.entropy);

			expect(Bip39.entropyToMnemonic(entropyBytes)).toEqual(test.mnemonic);

			expect(Converter.bytesToHex(Bip39.mnemonicToEntropy(test.mnemonic))).toEqual(test.entropy);

			expect(Converter.bytesToHex(Bip39.mnemonicToSeed(test.mnemonic, test.password))).toEqual(
				test.seed
			);
		}
	});
});
