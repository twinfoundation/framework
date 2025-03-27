// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@twin.org/core";
import testData from "./zip215.json";
import { Zip215 } from "../../src/curves/zip215";

// https://github.com/hdevalence/ed25519consensus/blob/main/zip215_test.go
describe("Zip215", () => {
	test("Can verify with standard tests", () => {
		for (const test of testData.slice(0, 1)) {
			const key = Converter.hexToBytes(test[0]);
			const sig = Converter.hexToBytes(test[1]);

			const v = Zip215.verify(key, new TextEncoder().encode("Zcash"), sig);
			expect(v).toEqual(true);
		}
	});
});
