// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter } from "@gtsc/core";
import testVectors from "./chacha20.json";
import { ChaCha20 } from "../../src/ciphers/chaCha20";

test("ChaCha20 can run test vectors", () => {
	// Test Vectors https://www.ietf.org/rfc/rfc8439.html#appendix-A
	for (const testVector of testVectors) {
		const cipher = new ChaCha20(
			Converter.hexToBytes(testVector.key),
			Converter.hexToBytes(testVector.nonce),
			testVector.counter
		);

		const keyStream = cipher.keyStream(testVector.keyStream.length / 2);

		expect(Converter.bytesToHex(keyStream)).toEqual(testVector.keyStream);
	}
});
