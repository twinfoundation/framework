// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@twin.org/core";
import { PngEncoder } from "../src/encoders/pngEncoder";

describe("PngEncoder", () => {
	test("Can encode an empty image", async () => {
		const encoder = new PngEncoder();
		const results = await encoder.encode([new Uint8Array()], 0, 0);
		expect(Converter.bytesToBase64(results)).toEqual(
			"iVBORw0KGgoAAAANSUhEUgAAAAAAAAAAAQMAAAABRe5RAAAAAXNSR0IB2cksfwAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAISURBVHicAwAAAAABSAaJ0gAAAABJRQ=="
		);
	});

	test("Can encode an image", async () => {
		const encoder = new PngEncoder();
		const results = await encoder.encode(
			[new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0])],
			8,
			2
		);
		expect(Converter.bytesToBase64(results)).toEqual(
			"iVBORw0KGgoAAAANSUhEUgAAAAgAAAACAgMAAAAY+nV+AAAAAXNSR0IB2cksfwAAAAlQTFRFAAAA/wAAAAAAZ6dCDAAAAAN0Uk5TAAAA+nbE3gAAAAxJREFUeJxj4GJAAwAAvAALsNYy4wAAAABJRU5ErkI="
		);
	});
});
