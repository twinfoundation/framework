// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@twin.org/core";
import { Ed25519 } from "@twin.org/crypto";
import type { CryptoKey } from "jose";
import type { IJwk } from "../../src/models/IJwk";
import { Jwk } from "../../src/utils/jwk";

describe("Jwk", () => {
	test("can import a public key", async () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);

		const jwk: IJwk = {
			kty: "OKP",
			use: "sig",
			alg: "EdDSA",
			crv: "Ed25519",
			x: Converter.bytesToBase64Url(publicKey)
		};

		const importedKey = (await Jwk.toCryptoKey(jwk)) as CryptoKey;
		expect(importedKey.extractable).toEqual(true);
		expect(importedKey.type).toEqual("public");
		expect(importedKey.algorithm).toEqual({ name: "Ed25519" });
		expect(importedKey.usages).toEqual(["verify"]);
	});

	test("can import a private key", async () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);

		const jwk: IJwk = {
			kty: "OKP",
			use: "sig",
			alg: "EdDSA",
			crv: "Ed25519",
			x: Converter.bytesToBase64Url(publicKey),
			d: Converter.bytesToBase64Url(privateKey)
		};

		const importedKey = (await Jwk.toCryptoKey(jwk)) as CryptoKey;
		expect(importedKey.extractable).toEqual(false);
		expect(importedKey.type).toEqual("private");
		expect(importedKey.algorithm).toEqual({ name: "Ed25519" });
		expect(importedKey.usages).toEqual(["sign"]);
	});
});
