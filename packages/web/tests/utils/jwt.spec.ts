// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter } from "@gtsc/core";
import { Bip39, Blake2b, Ed25519 } from "@gtsc/crypto";
import { Jwt } from "../../src/utils/jwt";

describe("Jwt", () => {
	test("can encode a jwt using hs256", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key"));

		const token = Jwt.encode({ sub: "123456", iat: 100000000 }, key, "HS256");
		expect(token).toEqual(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc"
		);
	});

	test("can verify a jwt using HS256", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key"));

		const payload = Jwt.verify(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
			key
		);
		expect(payload).toBeDefined();
	});

	test("can encode a jwt using EdDSA", () => {
		const mnemonic =
			"merge skate cycle typical service scrub idea gaze alert lion primary mosquito arrow hover ensure unusual immune length antique shrug earn spatial era pass";
		const seed = Bip39.mnemonicToSeed(mnemonic);
		const keyPair = Ed25519.keyPairFromSeed(seed);

		const token = Jwt.encode({ sub: "123456", iat: 100000000 }, keyPair.privateKey, "EdDSA");
		expect(token).toEqual(
			"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.fGmPmgy96AwZ__G_7Y6CDsPQXVPqEQy6x9I1ENKuEAOKJMWS4wZiCZGaGzXxSJbNXXyIfd5m7mUJInyK-KE5CQ"
		);
	});

	test("can verify a jwt using EdDSA", () => {
		const mnemonic =
			"merge skate cycle typical service scrub idea gaze alert lion primary mosquito arrow hover ensure unusual immune length antique shrug earn spatial era pass";
		const seed = Bip39.mnemonicToSeed(mnemonic);
		const keyPair = Ed25519.keyPairFromSeed(seed);

		const payload = Jwt.verify(
			"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.fGmPmgy96AwZ__G_7Y6CDsPQXVPqEQy6x9I1ENKuEAOKJMWS4wZiCZGaGzXxSJbNXXyIfd5m7mUJInyK-KE5CQ",
			keyPair.publicKey
		);
		expect(payload).toBeDefined();
	});

	test("can fail to verify a jwt using EdDSA with an invalid signature", () => {
		const mnemonic =
			"merge skate cycle typical service scrub idea gaze alert lion primary mosquito arrow hover ensure unusual immune length antique shrug earn spatial era pass";
		const seed = Bip39.mnemonicToSeed(mnemonic);
		const keyPair = Ed25519.keyPairFromSeed(seed);

		const payload = Jwt.verify(
			"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.fGmPmgy96AwZ__G_7Y6CDsPQXVPqEQy6x9I1ENKuEAOKJMWS4wZiCZGaGzXxSJbNXXyIfd5m7mUJInyK-KE5C",
			keyPair.publicKey
		);
		expect(payload).toBeUndefined();
	});

	test("can fail to verify a jwt with wrong number of segments", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		const payload = Jwt.verify(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc.sfdhdfjhg",
			key
		);
		expect(payload).toBeUndefined();
	});

	test("can fail to verify a jwt with incorrect key", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		const payloadString = Jwt.verify(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
			key
		);
		expect(payloadString).toBeUndefined();
	});

	test("can fail to decode a jwt with invalid key", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		const payload = Jwt.decode<{ sub: string; iat: number }>(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
			key
		);
		expect(payload).toBeUndefined();
	});

	test("can decode a jwt", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key"));

		const payload = Jwt.decode<{ sub: string; iat: number }>(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
			key
		);
		expect(payload?.sub).toEqual("123456");
		expect(payload?.iat).toEqual(100000000);
	});
});
