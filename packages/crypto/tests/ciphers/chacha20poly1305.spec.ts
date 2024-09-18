// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@twin.org/core";
import testVectors from "./chacha20poly1305.json";
import { ChaCha20Poly1305 } from "../../src/ciphers/chaCha20Poly1305";

test("ChaCha20Poly1305 encrypt/decrypt test vectors", () => {
	// Test vector from RFC 7539 Section 2.8.1.
	for (const testVector of testVectors) {
		const key = Converter.hexToBytes(testVector.key);
		const nonce = Converter.hexToBytes(testVector.nonce);
		const plainText = Converter.hexToBytes(testVector.plainText);
		const aad = Converter.hexToBytes(testVector.aad);
		const authTag = testVector.authTag;

		const cipher = new ChaCha20Poly1305(key, nonce, aad);
		const cipherData = cipher.encrypt(plainText);
		expect(Converter.bytesToHex(cipherData)).toEqual(testVector.cipherText + authTag);

		const decipher = new ChaCha20Poly1305(key, nonce, aad);
		const decipherData = decipher.decrypt(cipherData);
		expect(Converter.bytesToHex(decipherData)).toEqual(Converter.bytesToHex(plainText));
	}
});
