// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Ed25519 } from "@twin.org/crypto";
import { Jwk } from "../../src/utils/jwk";
import { Jws } from "../../src/utils/jws";

describe("Jws", () => {
	test("can create a signature", async () => {
		const privateKey = new Uint8Array(32).fill(170);
		const jwk = await Jwk.fromEd25519Private(privateKey);
		const cryptoKey = await Jwk.toCryptoKey(jwk);

		const hash = new Uint8Array(32).fill(85);
		const jws = await Jws.create(cryptoKey, hash);
		expect(jws).toEqual(
			"eyJhbGciOiJFZDI1NTE5IiwiYjY0IjpmYWxzZSwiY3JpdCI6WyJiNjQiXX0..1N0IScc3lZO5PjFoo-0ziC-9On0V-fEr8DLnZh7E6dOG75-q-1Ek-vQnSzjNbXG5nnn53QV84doBdzSsbl3bBg"
		);
	});

	test("can verify a signature", async () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);
		const jwk = await Jwk.fromEd25519Public(publicKey);
		const cryptoKey = await Jwk.toCryptoKey(jwk);

		const hash = new Uint8Array(32).fill(85);
		const verified = await Jws.verify(
			"eyJhbGciOiJFZDI1NTE5IiwiYjY0IjpmYWxzZSwiY3JpdCI6WyJiNjQiXX0..1N0IScc3lZO5PjFoo-0ziC-9On0V-fEr8DLnZh7E6dOG75-q-1Ek-vQnSzjNbXG5nnn53QV84doBdzSsbl3bBg",
			cryptoKey,
			hash
		);
		expect(verified).toEqual(true);
	});
});
