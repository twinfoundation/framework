// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter } from "@gtsc/core";
import { Bip39, Blake2b, Ed25519 } from "@gtsc/crypto";
import { Jwt } from "../../src/utils/jwt";

describe("Jwt", () => {
	test("can encode a jwt using hs256", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key"));

		const token = Jwt.encode({ alg: "HS256" }, { sub: "123456", iat: 100000000 }, key);
		expect(token).toEqual(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc"
		);
	});

	test("can decode a jwt using HS256", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key"));

		const decoded = Jwt.decode(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
			key
		);
		expect(decoded.verified).toBeTruthy();
		expect(decoded?.header?.alg).toEqual("HS256");
		expect(decoded?.header?.typ).toEqual("JWT");
		expect(decoded?.payload?.sub).toEqual("123456");
		expect(decoded?.payload?.iat).toEqual(100000000);
	});

	test("can encode a jwt using EdDSA", () => {
		const mnemonic =
			"merge skate cycle typical service scrub idea gaze alert lion primary mosquito arrow hover ensure unusual immune length antique shrug earn spatial era pass";
		const seed = Bip39.mnemonicToSeed(mnemonic);
		const keyPair = Ed25519.keyPairFromSeed(seed);

		const token = Jwt.encode(
			{ alg: "EdDSA" },
			{ sub: "123456", iat: 100000000 },
			keyPair.privateKey
		);
		expect(token).toEqual(
			"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.fGmPmgy96AwZ__G_7Y6CDsPQXVPqEQy6x9I1ENKuEAOKJMWS4wZiCZGaGzXxSJbNXXyIfd5m7mUJInyK-KE5CQ"
		);
	});

	test("can decode a jwt using EdDSA", () => {
		const mnemonic =
			"merge skate cycle typical service scrub idea gaze alert lion primary mosquito arrow hover ensure unusual immune length antique shrug earn spatial era pass";
		const seed = Bip39.mnemonicToSeed(mnemonic);
		const keyPair = Ed25519.keyPairFromSeed(seed);

		const decoded = Jwt.decode(
			"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.fGmPmgy96AwZ__G_7Y6CDsPQXVPqEQy6x9I1ENKuEAOKJMWS4wZiCZGaGzXxSJbNXXyIfd5m7mUJInyK-KE5CQ",
			keyPair.publicKey
		);
		expect(decoded.verified).toBeTruthy();
		expect(decoded?.header?.alg).toEqual("EdDSA");
		expect(decoded?.header?.typ).toEqual("JWT");
		expect(decoded?.payload?.sub).toEqual("123456");
		expect(decoded?.payload?.iat).toEqual(100000000);
	});

	test("can fail to verify a jwt using EdDSA with an invalid signature but still return data", () => {
		const mnemonic =
			"merge skate cycle typical service scrub idea gaze alert lion primary mosquito arrow hover ensure unusual immune length antique shrug earn spatial era pass";
		const seed = Bip39.mnemonicToSeed(mnemonic);
		const keyPair = Ed25519.keyPairFromSeed(seed);

		const decoded = Jwt.decode(
			"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.fGmPmgy96AwZ__G_7Y6CDsPQXVPqEQy6x9I1ENKuEAOKJMWS4wZiCZGaGzXxSJbNXXyIfd5m7mUJInyK-KE5C",
			keyPair.publicKey
		);
		expect(decoded.verified).toEqual(false);
		expect(decoded?.header?.alg).toEqual("EdDSA");
		expect(decoded?.header?.typ).toEqual("JWT");
		expect(decoded?.payload?.sub).toEqual("123456");
		expect(decoded?.payload?.iat).toEqual(100000000);
	});

	test("can fail to verify a jwt with wrong number of segments", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		const decoded = Jwt.decode(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc.sfdhdfjhg",
			key
		);
		expect(decoded.verified).toEqual(false);
	});

	test("can fail to verify a jwt with incorrect key but still return data", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		const decoded = Jwt.decode(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
			key
		);
		expect(decoded.verified).toEqual(false);
		expect(decoded?.header?.alg).toEqual("HS256");
		expect(decoded?.header?.typ).toEqual("JWT");
		expect(decoded?.payload?.sub).toEqual("123456");
		expect(decoded?.payload?.iat).toEqual(100000000);
	});

	test("can fail to decode a jwt with invalid key but still return data", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		const decoded = Jwt.decode(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
			key
		);
		expect(decoded.verified).toEqual(false);
		expect(decoded?.header?.alg).toEqual("HS256");
		expect(decoded?.header?.typ).toEqual("JWT");
		expect(decoded?.payload?.sub).toEqual("123456");
		expect(decoded?.payload?.iat).toEqual(100000000);
	});

	test("can fail to decode with invalid base64", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		const decoded = Jwt.decode("!.!.!", key);
		expect(decoded.verified).toEqual(false);
	});

	test("can fail to decode with missing segments", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		const decoded = Jwt.decode(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0",
			key
		);
		expect(decoded.verified).toEqual(false);
	});

	test("can decode a jwt", () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key"));

		const decoded = Jwt.decode(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
			key
		);
		expect(decoded?.header?.alg).toEqual("HS256");
		expect(decoded?.header?.typ).toEqual("JWT");
		expect(decoded?.payload?.sub).toEqual("123456");
		expect(decoded?.payload?.iat).toEqual(100000000);
	});
});
