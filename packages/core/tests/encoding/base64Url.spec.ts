// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import testData from "./base64Url.json";
import { Base64Url } from "../../src/encoding/base64Url";
import { Converter } from "../../src/utils/converter";

describe("Base64Url", () => {
	test("Can encode bytes to base64", () => {
		expect(
			Base64Url.encode(
				new Uint8Array([
					62, 42, 58, 110, 71, 118, 42, 100, 41, 115, 114, 62, 85, 71, 58, 32, 97, 54, 110, 114, 63,
					49, 105, 95, 92
				])
			)
		).toEqual("Pio6bkd2KmQpc3I-VUc6IGE2bnI_MWlfXA");
	});

	test("Can decode base64 to bytes", () => {
		expect(Base64Url.decode("Pio6bkd2KmQpc3I-VUc6IGE2bnI_MWlfXA")).toEqual(
			new Uint8Array([
				62, 42, 58, 110, 71, 118, 42, 100, 41, 115, 114, 62, 85, 71, 58, 32, 97, 54, 110, 114, 63,
				49, 105, 95, 92
			])
		);
	});

	test("Can encode base64 strings to bytes", () => {
		for (const test of testData) {
			expect(Base64Url.encode(Converter.utf8ToBytes(test.decoded))).toEqual(test.encoded);
		}
	});

	test("Can decode base64 bytes to string", () => {
		for (const test of testData) {
			expect(Converter.bytesToUtf8(Base64Url.decode(test.encoded))).toEqual(test.decoded);
		}
	});
});
