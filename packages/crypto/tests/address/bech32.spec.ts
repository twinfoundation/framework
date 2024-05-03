// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter, I18n } from "@gtsc/core";
import { Bech32 } from "../../src/address/bech32";

describe("Bech32", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../../locales/en.json"));
	});

	test("Can fail to decode if there is no separator", () => {
		expect(() => Bech32.decode("a".repeat(91))).toThrow("bech32.noSeparator");
		expect(I18n.hasMessage("error.bech32.noSeparator")).toEqual(true);
	});

	test("Can fail to decode if the separator is too early", () => {
		expect(() => Bech32.decode(`1${"a".repeat(89)}`)).toThrow("bech32.separatorPos");
		expect(I18n.hasMessage("error.bech32.separatorPos")).toEqual(true);
	});

	test("Can fail to decode if the separator is too late", () => {
		expect(() => Bech32.decode(`${"a".repeat(84)}1${"a".repeat(5)}`)).toThrow(
			"bech32.separatorNoSpace"
		);
		expect(I18n.hasMessage("error.bech32.separatorNoSpace")).toEqual(true);
	});

	test("Can fail to decode with non 5 bit characters", () => {
		expect(() => Bech32.decodeTo5BitArray("iot1!aaaaa")).toThrow("bech32.invalidCharacter");
		expect(I18n.hasMessage("error.bech32.invalidCharacter")).toEqual(true);
	});

	test("Can fail to decode with invalid checksum", () => {
		const result = Bech32.decode(
			"iota1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp99"
		);

		expect(result).toBeUndefined();
	});

	test("Can encode a string", () => {
		const address = Converter.hexToBytes(
			"0152fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c649"
		);
		expect(Bech32.encode("iota", address)).toEqual(
			"iota1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryj0w6qwt"
		);
	});

	test("Can decode a string", () => {
		const result = Bech32.decode(
			"iota1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryj0w6qwt"
		);

		expect(result).toBeDefined();
		if (result) {
			expect(result.humanReadablePart).toEqual("iota");
			expect(Converter.bytesToHex(result.data)).toEqual(
				"0152fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c649"
			);
		}
	});

	test("Can fail to match empty address", () => {
		expect(Bech32.matches("iota", "")).toEqual(false);
	});

	test("Can fail to match undefined address", () => {
		expect(Bech32.matches("iota")).toEqual(false);
	});

	test("Can fail to match address too short", () => {
		expect(Bech32.matches("iota", "iot1q9f0m")).toEqual(false);
	});

	test("Can fail to match address hrp mismatch", () => {
		expect(
			Bech32.matches("iota", "iop1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")
		).toEqual(false);
	});

	test("Can fail to match address seprator missing", () => {
		expect(
			Bech32.matches("iota", "iopq9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")
		).toEqual(false);
	});

	test("Can fail to match address invalid chars", () => {
		expect(
			Bech32.matches("iota", "iota1q9f0mlqZyxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")
		).toEqual(false);
	});

	test("Can match address", () => {
		expect(
			Bech32.matches("iota", "iota1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")
		).toEqual(true);
	});
});
