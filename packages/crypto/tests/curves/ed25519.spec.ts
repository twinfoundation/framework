// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@gtsc/core";
import testData from "./ed25519.json";
import { Ed25519 } from "../../src/curves/ed25519";

describe("Ed25519", () => {
	test("Can generate a key pair from a seed", () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);

		expect(Converter.bytesToHex(privateKey)).toEqual(
			"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
		);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"e734ea6c2b6257de72355e472aa05a4c487e6b463c029ed306df2f01b5636b58"
		);
	});

	test("Can generate a signature with a private key", () => {
		const seed = new Uint8Array(32).fill(170);

		const data = new Uint8Array(100).fill(100);

		const sig = Ed25519.sign(seed, data);

		expect(Converter.bytesToHex(sig)).toEqual(
			"359aa3bd52531f40f5fa85a9c8d16f7f55708fea795328ad6ec1a5a503ee3f1e2c8506d44e10329b1051eaeea8371e8f0cb36d45abc6b00717127816bee30b0b"
		);
	});

	test("Can validate a signature with the public key", () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);

		const data = new Uint8Array(100).fill(100);

		const sig = Ed25519.sign(privateKey, data);

		const verified = Ed25519.verify(publicKey, data, sig);

		expect(verified).toEqual(true);
	});

	test("Can validate a signature with the public key", () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);

		const data = new Uint8Array(100).fill(100);

		const sig = Ed25519.sign(privateKey, data);

		const verified = Ed25519.verify(publicKey, data, sig);

		expect(verified).toEqual(true);
	});

	test("Can validate test data", () => {
		for (const test of testData) {
			const bPrivateKey = Converter.hexToBytes(test.privateKey);
			const bPublicKey = Converter.hexToBytes(test.publicKey);
			const calcPubKey = Ed25519.publicKeyFromPrivateKey(bPrivateKey);

			expect(test.publicKey).toEqual(Converter.bytesToHex(calcPubKey));

			const bData = Converter.hexToBytes(test.data);

			const calcSignature = Ed25519.sign(bPrivateKey, bData);
			expect(test.signature).toEqual(Converter.bytesToHex(calcSignature));

			const verified = Ed25519.verify(bPublicKey, bData, calcSignature);
			expect(verified).toEqual(true);
		}
	});
});
