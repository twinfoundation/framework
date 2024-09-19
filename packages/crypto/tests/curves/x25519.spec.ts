// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@twin.org/core";
import testData from "./x25519.json";
import { X25519 } from "../../src/curves/x25519";

// https://github.com/hdevalence/ed25519consensus/blob/main/zip215_test.go
describe("X25519", () => {
	test("Can verify with standard tests", () => {
		for (const test of testData) {
			const ed25519PrivateKey = Converter.hexToBytes(test.ePrivateKey);
			const ed25519PublicKey = Converter.hexToBytes(test.ePublicKey);

			const xPrivate = X25519.convertPrivateKeyToX25519(ed25519PrivateKey);
			const xPublic = X25519.convertPublicKeyToX25519(ed25519PublicKey);

			expect(Converter.bytesToHex(xPrivate)).toEqual(test.xPrivateKey);
			expect(Converter.bytesToHex(xPublic)).toEqual(test.xPublicKey);
		}
	});
});
