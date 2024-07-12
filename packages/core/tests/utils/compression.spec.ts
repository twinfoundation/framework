// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Compression } from "../../src/utils/compression";
import { Converter } from "../../src/utils/converter";

describe("Compression", () => {
	test("can compress a bytes array using gzip", async () => {
		const bytes = Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog");
		const compressed = await Compression.compress(bytes, "gzip");
		expect(Converter.bytesToBase64(compressed)).toEqual(
			"H4sIAAAAAAAAAwvJSFUoLM1MzlZIKsovz1NIy69QyCrNLShWyC9LLVIoyUhVyEmsqlRIyU8HADmjT0ErAAAA"
		);
	});

	test("can decompress a bytes array using gzip", async () => {
		const bytes = Converter.base64ToBytes(
			"H4sIAAAAAAAAAwvJSFUoLM1MzlZIKsovz1NIy69QyCrNLShWyC9LLVIoyUhVyEmsqlRIyU8HADmjT0ErAAAA"
		);
		const decompressed = await Compression.decompress(bytes, "gzip");
		expect(Converter.bytesToUtf8(decompressed)).toEqual(
			"The quick brown fox jumps over the lazy dog"
		);
	});

	test("can compress a bytes array using deflate", async () => {
		const bytes = Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog");
		const compressed = await Compression.compress(bytes, "deflate");
		expect(Converter.bytesToBase64(compressed)).toEqual(
			"eJwLyUhVKCzNTM5WSCrKL89TSMuvUMgqzS0oVsgvSy1SKMlIVchJrKpUSMlPBwBb3A/a"
		);
	});

	test("can decompress a bytes array using deflate", async () => {
		const bytes = Converter.base64ToBytes(
			"eJwLyUhVKCzNTM5WSCrKL89TSMuvUMgqzS0oVsgvSy1SKMlIVchJrKpUSMlPBwBb3A/a"
		);
		const decompressed = await Compression.decompress(bytes, "deflate");
		expect(Converter.bytesToUtf8(decompressed)).toEqual(
			"The quick brown fox jumps over the lazy dog"
		);
	});
});
