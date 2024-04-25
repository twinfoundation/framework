// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { PngEncoder } from "../src/encoders/pngEncoder";

describe("PngEncoder", () => {
	test("Can encode an empty image", async () => {
		const encoder = new PngEncoder();
		const results = await encoder.encode([new Uint8Array()], 0, 0);
		expect(results).toEqual(
			new Uint8Array([
				137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3,
				0, 0, 0, 1, 69, 238, 81, 0, 0, 0, 1, 115, 82, 71, 66, 1, 217, 201, 44, 127, 0, 0, 0, 3, 80,
				76, 84, 69, 0, 0, 0, 167, 122, 61, 218, 0, 0, 0, 1, 116, 82, 78, 83, 0, 64, 230, 216, 102,
				0, 0, 0, 8, 73, 68, 65, 84, 120, 156, 3, 0, 0, 0, 0, 1, 72, 6, 137, 210, 0, 0, 0, 0, 73, 69
			])
		);
	});

	test("Can encode an image", async () => {
		const encoder = new PngEncoder();
		const results = await encoder.encode(
			[new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0])],
			8,
			2
		);
		expect(results).toEqual(
			new Uint8Array([
				137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 8, 0, 0, 0, 2, 2, 3,
				0, 0, 0, 24, 250, 117, 126, 0, 0, 0, 1, 115, 82, 71, 66, 1, 217, 201, 44, 127, 0, 0, 0, 9,
				80, 76, 84, 69, 0, 0, 0, 255, 0, 0, 0, 0, 0, 103, 167, 66, 12, 0, 0, 0, 3, 116, 82, 78, 83,
				0, 0, 0, 250, 118, 196, 222, 0, 0, 0, 12, 73, 68, 65, 84, 120, 156, 99, 224, 98, 64, 3, 0,
				0, 188, 0, 11, 176, 214, 50, 227, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66
			])
		);
	});
});
