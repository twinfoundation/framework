// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter } from "@gtsc/core";
import testData from "./testData.json";
import { Ed25519 } from "../../src/curves/ed25519";
import { Zip215 } from "../../src/curves/zip215";
import { Blake2b } from "../../src/hashes/blake2b";
import { HmacSha512 } from "../../src/hashes/hmacSha512";
import { Sha512 } from "../../src/hashes/sha512";

describe("Test Data", () => {
	test("Can validate data set", () => {
		for (const d of testData) {
			const privateKey = Converter.hexToBytes(d.privateKey);

			const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);

			expect(Converter.bytesToHex(privateKey)).toEqual(d.privateKey);
			expect(Converter.bytesToHex(publicKey)).toEqual(d.publicKey);

			const data = Converter.hexToBytes(d.data);

			const sig = Ed25519.sign(privateKey, data);
			expect(Converter.bytesToHex(sig)).toEqual(d.signature);

			const verified = Ed25519.verify(publicKey, data, sig);
			expect(verified).toEqual(d.verified);

			const verifiedZip = Zip215.verify(publicKey, data, sig);
			expect(verifiedZip).toEqual(d.verifiedZip);

			const blake256 = Blake2b.sum256(data);
			expect(Converter.bytesToHex(blake256)).toEqual(d.blake256);

			const blake512 = Blake2b.sum512(data);
			expect(Converter.bytesToHex(blake512)).toEqual(d.blake512);

			const sha512 = Sha512.sum512(data);
			expect(Converter.bytesToHex(sha512)).toEqual(d.sha512);

			const hmacsha512 = HmacSha512.sum512(privateKey, data);
			expect(Converter.bytesToHex(hmacsha512)).toEqual(d.hmacSha512);
		}
	});
});
