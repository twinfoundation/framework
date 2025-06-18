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

	test("can import an Ed25519 public key", async () => {
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);

		const jwk = await Jwk.fromEd25519Public(publicKey);
		expect(jwk).toEqual({
			alg: "EdDSA",
			crv: "Ed25519",
			kty: "OKP",
			use: "sig",
			x: "5zTqbCtiV95yNV5HKqBaTEh-a0Y8Ap7TBt8vAbVja1g"
		});
	});

	test("can import an Ed25519 private key", async () => {
		const privateKey = new Uint8Array(32).fill(170);

		const jwk = await Jwk.fromEd25519Private(privateKey);
		expect(jwk).toEqual({
			alg: "EdDSA",
			crv: "Ed25519",
			kty: "OKP",
			use: "enc",
			d: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo",
			x: "5zTqbCtiV95yNV5HKqBaTEh-a0Y8Ap7TBt8vAbVja1g"
		});
	});

	test("can convert jwk to raw keys", async () => {
		const bytes = await Jwk.toRaw({
			alg: "EdDSA",
			crv: "Ed25519",
			kty: "OKP",
			use: "enc",
			d: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo",
			x: "5zTqbCtiV95yNV5HKqBaTEh-a0Y8Ap7TBt8vAbVja1g"
		});
		const privateKey = new Uint8Array(32).fill(170);
		const publicKey = Ed25519.publicKeyFromPrivateKey(privateKey);
		expect(bytes?.publicKey).toEqual(publicKey);
		expect(bytes?.privateKey).toEqual(privateKey);
	});

	test("generate a kid for a jwk", async () => {
		const jwk: IJwk = {
			alg: "EdDSA",
			crv: "Ed25519",
			kty: "OKP",
			use: "enc",
			d: "nWGxne_9WmC6hEr0kuwsxERJxWl7MmkZcDusAxyuf2A",
			x: "11qYAYKxCrfVS_7TyWQHOg7hcvPapiMlrwIaaPcHURo"
		};
		const kid = await Jwk.generateKid(jwk);
		expect(kid).toEqual("kPrK_qmxVWaYVA9wwBF6Iuo3vVzz7TxHCTwXBygrS4k");
	});
});
