// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Compression } from "../../src/utils/compression";
import { Converter } from "../../src/utils/converter";

describe("Compression", () => {
	test("can compress and decompress data using gzip", async () => {
		const bytes = Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog");
		const compressed = await Compression.compress(bytes, "gzip");

		const decompressed = await Compression.decompress(compressed, "gzip");

		expect(Converter.bytesToUtf8(decompressed)).toEqual(
			"The quick brown fox jumps over the lazy dog"
		);
	});

	test("can compress and decompress data using deflate", async () => {
		const bytes = Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog");
		const compressed = await Compression.compress(bytes, "deflate");

		const decompressed = await Compression.decompress(compressed, "deflate");

		expect(Converter.bytesToUtf8(decompressed)).toEqual(
			"The quick brown fox jumps over the lazy dog"
		);
	});
});
