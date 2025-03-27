// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@twin.org/core";
import testData from "./secp256k1.json";
import { Secp256k1 } from "../../src/curves/secp256k1";

describe("Secp256k1", () => {
	test("Can generate a key pair from a seed", () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Secp256k1.publicKeyFromPrivateKey(privateKey);

		expect(Converter.bytesToHex(privateKey)).toEqual(
			"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
		);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"026a04ab98d9e4774ad806e302dddeb63bea16b5cb5f223ee77478e861bb583eb3"
		);
	});

	test("Can generate a signature with a private key", () => {
		const privateKey = new Uint8Array(32).fill(170);

		const data = new Uint8Array(100).fill(100);

		const sig = Secp256k1.sign(privateKey, data);

		expect(Converter.bytesToHex(sig)).toEqual(
			"bf1a01d3e1d70687343bfaea90f678a40c7549db9a9f296fdb16c577486592e6674681ec9d1742d9716ced405cab6e53406f6ba8daafae18d76282dd4392f317"
		);
	});

	test("Can validate a signature with the public key", () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Secp256k1.publicKeyFromPrivateKey(privateKey);

		const data = new Uint8Array(100).fill(100);

		const sig = Secp256k1.sign(privateKey, data);

		const verified = Secp256k1.verify(publicKey, data, sig);

		expect(verified).toEqual(true);
	});

	test("Can validate a signature with the public key", () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Secp256k1.publicKeyFromPrivateKey(privateKey);

		const data = new Uint8Array(100).fill(100);

		const sig = Secp256k1.sign(privateKey, data);

		const verified = Secp256k1.verify(publicKey, data, sig);

		expect(verified).toEqual(true);
	});

	test("Can validate test data", () => {
		for (const test of testData) {
			const bPrivateKey = Converter.hexToBytes(test.privateKey);
			const bPublicKey = Converter.hexToBytes(test.publicKey);

			const calcPubKey = Secp256k1.publicKeyFromPrivateKey(bPrivateKey);

			expect(test.publicKey).toEqual(Converter.bytesToHex(calcPubKey));

			const bData = Converter.hexToBytes(test.data);

			const calcSignature = Secp256k1.sign(bPrivateKey, bData);
			expect(test.signature).toEqual(Converter.bytesToHex(calcSignature));

			const verified = Secp256k1.verify(bPublicKey, bData, calcSignature);
			expect(verified).toEqual(true);
		}
	});
});
