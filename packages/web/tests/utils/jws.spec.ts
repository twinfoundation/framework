// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Ed25519 } from "@twin.org/crypto";
import { Jwk } from "../../src/utils/jwk";
import { Jws } from "../../src/utils/jws";

describe("Jws", () => {
	test("can create a signature", async () => {
		const privateKey = new Uint8Array(32).fill(170);
		const importedKey = (await Jwk.fromEd25519Private(privateKey)) as CryptoKey;

		const hash = new Uint8Array(32).fill(85);
		const jws = await Jws.create(importedKey, hash);
		expect(jws).toEqual(
			"eyJhbGciOiJFZDI1NTE5IiwiYjY0IjpmYWxzZSwiY3JpdCI6WyJiNjQiXX0..1N0IScc3lZO5PjFoo-0ziC-9On0V-fEr8DLnZh7E6dOG75-q-1Ek-vQnSzjNbXG5nnn53QV84doBdzSsbl3bBg"
		);
	});

	test("can verify a signature", async () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);
		const importedKey = (await Jwk.fromEd25519Public(publicKey)) as CryptoKey;

		const hash = new Uint8Array(32).fill(85);
		const verified = await Jws.verify(
			"eyJhbGciOiJFZDI1NTE5IiwiYjY0IjpmYWxzZSwiY3JpdCI6WyJiNjQiXX0..1N0IScc3lZO5PjFoo-0ziC-9On0V-fEr8DLnZh7E6dOG75-q-1Ek-vQnSzjNbXG5nnn53QV84doBdzSsbl3bBg",
			importedKey,
			hash
		);
		expect(verified).toEqual(true);
	});
});
