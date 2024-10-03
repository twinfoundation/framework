// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@twin.org/core";
import testData from "./blake3.json";
import { Blake3 } from "../../src/hashes/blake3";

describe("Blake3", () => {
	test("Can perform a sum512 on short text", () => {
		const sum = Blake3.sum512(Converter.utf8ToBytes("abc"));
		expect(Converter.bytesToHex(sum)).toEqual(
			"6437b3ac38465133ffb63b75273a8db548c558465d79db03fd359c6cd5bd9d851fb250ae7393f5d02813b65d521a0d492d9ba09cf7ce7f4cffd900f23374bf0b"
		);
	});

	test("Can perform a sum512 on empty text", () => {
		const sum = Blake3.sum512(Converter.utf8ToBytes(""));
		expect(Converter.bytesToHex(sum)).toEqual(
			"af1349b9f5f9a1a6a0404dea36dcc9499bcb25c9adc112b7cc9a93cae41f3262e00f03e7b69af26b7faaf09fcd333050338ddfe085b8cc869ca98b206c08243a"
		);
	});

	test("Can perform a sum512 on sentence", () => {
		const sum = Blake3.sum512(Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog"));
		expect(Converter.bytesToHex(sum)).toEqual(
			"2f1514181aadccd913abd94cfa592701a5686ab23f8df1dff1b74710febc6d4ac0615cd845be939b4ef6aec25e799aaa450c63f8d9e333cdb0dd79b70ee69879"
		);
	});

	test("Can validate test vectors", () => {
		// https://github.com/BLAKE3-team/BLAKE3/blob/master/test_vectors/test_vectors.json
		for (const test of testData.cases) {
			const res = new Blake3(test.hash.length / 2)
				.update(Uint8Array.from({ length: test.input_len }, (i, j) => j % 0xfb))
				.digest();
			expect(Converter.bytesToHex(res)).toEqual(test.hash);
		}
	});
});
