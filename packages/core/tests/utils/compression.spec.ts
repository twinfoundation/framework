// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Compression } from "../../src/utils/compression";
import { Converter } from "../../src/utils/converter";

describe("Compression", () => {
	test("can compress a bytes array using gzip", async () => {
		const bytes = Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog");
		const compressed = await Compression.compress(bytes, "gzip");
		expect(compressed).toEqual(
			new Uint8Array([
				31, 139, 8, 0, 0, 0, 0, 0, 0, 10, 11, 201, 72, 85, 40, 44, 205, 76, 206, 86, 72, 42, 202,
				47, 207, 83, 72, 203, 175, 80, 200, 42, 205, 45, 40, 86, 200, 47, 75, 45, 82, 40, 201, 72,
				85, 200, 73, 172, 170, 84, 72, 201, 79, 7, 0, 57, 163, 79, 65, 43, 0, 0, 0
			])
		);
	});

	test("can decompress a bytes array using gzip", async () => {
		const bytes = new Uint8Array([
			31, 139, 8, 0, 0, 0, 0, 0, 0, 10, 11, 201, 72, 85, 40, 44, 205, 76, 206, 86, 72, 42, 202, 47,
			207, 83, 72, 203, 175, 80, 200, 42, 205, 45, 40, 86, 200, 47, 75, 45, 82, 40, 201, 72, 85,
			200, 73, 172, 170, 84, 72, 201, 79, 7, 0, 57, 163, 79, 65, 43, 0, 0, 0
		]);

		const decompressed = await Compression.decompress(bytes, "gzip");
		expect(Converter.bytesToUtf8(decompressed)).toEqual(
			"The quick brown fox jumps over the lazy dog"
		);
	});

	test("can compress a bytes array using deflate", async () => {
		const bytes = Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog");
		const compressed = await Compression.compress(bytes, "deflate");
		expect(compressed).toEqual(
			new Uint8Array([
				120, 156, 11, 201, 72, 85, 40, 44, 205, 76, 206, 86, 72, 42, 202, 47, 207, 83, 72, 203, 175,
				80, 200, 42, 205, 45, 40, 86, 200, 47, 75, 45, 82, 40, 201, 72, 85, 200, 73, 172, 170, 84,
				72, 201, 79, 7, 0, 91, 220, 15, 218
			])
		);
	});

	test("can decompress a bytes array using deflate", async () => {
		const bytes = new Uint8Array([
			120, 156, 11, 201, 72, 85, 40, 44, 205, 76, 206, 86, 72, 42, 202, 47, 207, 83, 72, 203, 175,
			80, 200, 42, 205, 45, 40, 86, 200, 47, 75, 45, 82, 40, 201, 72, 85, 200, 73, 172, 170, 84, 72,
			201, 79, 7, 0, 91, 220, 15, 218
		]);
		const decompressed = await Compression.decompress(bytes, "deflate");
		expect(Converter.bytesToUtf8(decompressed)).toEqual(
			"The quick brown fox jumps over the lazy dog"
		);
	});
});
