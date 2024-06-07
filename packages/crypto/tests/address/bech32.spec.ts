// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter, I18n } from "@gtsc/core";
import { Bech32 } from "../../src/address/bech32";

describe("Bech32", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../../locales/en.json"));
	});

	test("Can fail to decode with invalid checksum", () => {
		expect(() =>
			Bech32.decode("iota1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp99")
		).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "bech32.invalidChecksum"
			})
		);
	});

	test("Can fail to decode with separator misused", () => {
		expect(() =>
			Bech32.decode("iopq9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")
		).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "bech32.separatorMisused"
			})
		);
	});

	test("Can fail to decode with mix of lowercase and uppercase", () => {
		expect(() =>
			Bech32.decode("iopq9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73uTryjtzcp98")
		).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "bech32.lowerUpper"
			})
		);
	});

	test("Can fail to decode with not enough data", () => {
		expect(() => Bech32.decode("iot1q9f0m")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "bech32.dataTooShort"
			})
		);
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
		expect(Bech32.isBech32("")).toEqual(false);
	});

	test("Can fail to match undefined address", () => {
		expect(Bech32.isBech32("iota")).toEqual(false);
	});

	test("Can fail to match address too short", () => {
		expect(Bech32.isBech32("iot1q9f0m")).toEqual(false);
	});

	test("Can fail to match address hrp mismatch", () => {
		expect(
			Bech32.isBech32("iop1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")
		).toEqual(false);
	});

	test("Can fail to match address seprator missing", () => {
		expect(
			Bech32.isBech32("iopq9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")
		).toEqual(false);
	});

	test("Can fail to match address invalid chars", () => {
		expect(
			Bech32.isBech32("iota1q9f0mlqZyxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryjtzcp98")
		).toEqual(false);
	});

	test("Can match address", () => {
		expect(
			Bech32.isBech32("iota1qrmhx628sac676880a8h8kzeuc8443035j4w69hnduf3686s9amngcdvl0h")
		).toEqual(true);
	});
});
