// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@twin.org/core";
import { Bip39, Blake2b, Ed25519 } from "@twin.org/crypto";
import { SignJWT } from "jose";
import type { IJwtHeader } from "../../src/models/IJwtHeader";
import type { IJwtPayload } from "../../src/models/IJwtPayload";
import type { JwkCryptoKey } from "../../src/models/jwkCryptoKey";
import { Jwt } from "../../src/utils/jwt";

describe("Jwt", () => {
	test("can fail to encode with missing header", async () => {
		await expect(
			Jwt.encode(
				undefined as unknown as IJwtHeader,
				undefined as unknown as IJwtPayload,
				undefined as unknown as JwkCryptoKey
			)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.objectUndefined",
			properties: {
				property: "header",
				value: "undefined"
			}
		});
	});

	test("can fail to encode with missing payload", async () => {
		await expect(
			Jwt.encode(
				{
					alg: "EdDSA"
				},
				undefined as unknown as IJwtPayload,
				undefined as unknown as JwkCryptoKey
			)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.objectUndefined",
			properties: {
				property: "payload",
				value: "undefined"
			}
		});
	});

	test("can fail to encode with missing key", async () => {
		await expect(
			Jwt.encode(
				{
					alg: "EdDSA"
				},
				{},
				undefined as unknown as JwkCryptoKey
			)
		).rejects.toMatchObject({
			name: "GuardError",
			message: "guard.undefined",
			properties: {
				property: "key",
				value: "undefined"
			}
		});
	});

	test("can encode a jwt using hs256", async () => {
		const key: JwkCryptoKey = Blake2b.sum256(Converter.utf8ToBytes("my-key"));

		const token = await Jwt.encode({ alg: "HS256" }, { sub: "123456", iat: 100000000 }, key);
		expect(token).toEqual(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc"
		);
	});

	test("can encode a jwt with a custom signer", async () => {
		const token = await Jwt.encodeWithSigner(
			{ alg: "HS256" },
			{ sub: "123456", iat: 100000000 },
			async (alg, key, header, payload) => {
				const signer = new SignJWT(payload);
				header.alg = alg;
				signer.setProtectedHeader(header);
				return signer.sign(Converter.utf8ToBytes("my-key"));
			}
		);
		expect(token).toEqual(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.oz0g82dbLsfLe8UtpZ4qY_Cz-BAq_74Dz_Aa-QDN8vw"
		);
	});

	test("can decode a jwt using HS256", async () => {
		const decoded = await Jwt.decode(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.oz0g82dbLsfLe8UtpZ4qY_Cz-BAq_74Dz_Aa-QDN8vw"
		);
		expect(decoded?.header?.alg).toEqual("HS256");
		expect(decoded?.header?.typ).toEqual("JWT");
		expect(decoded?.payload?.sub).toEqual("123456");
		expect(decoded?.payload?.iat).toEqual(100000000);
	});

	test("can encode a jwt using EdDSA", async () => {
		const mnemonic =
			"merge skate cycle typical service scrub idea gaze alert lion primary mosquito arrow hover ensure unusual immune length antique shrug earn spatial era pass";
		const seed = Bip39.mnemonicToSeed(mnemonic);

		const token = await Jwt.encode(
			{ alg: "EdDSA" },
			{ sub: "123456", iat: 100000000 },
			seed.slice(0, Ed25519.PRIVATE_KEY_SIZE)
		);
		expect(token).toEqual(
			"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.fGmPmgy96AwZ__G_7Y6CDsPQXVPqEQy6x9I1ENKuEAOKJMWS4wZiCZGaGzXxSJbNXXyIfd5m7mUJInyK-KE5CQ"
		);
	});

	test("can decode a jwt using EdDSA", async () => {
		const decoded = await Jwt.decode(
			"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.fGmPmgy96AwZ__G_7Y6CDsPQXVPqEQy6x9I1ENKuEAOKJMWS4wZiCZGaGzXxSJbNXXyIfd5m7mUJInyK-KE5CQ"
		);
		expect(decoded?.header?.alg).toEqual("EdDSA");
		expect(decoded?.header?.typ).toEqual("JWT");
		expect(decoded?.payload?.sub).toEqual("123456");
		expect(decoded?.payload?.iat).toEqual(100000000);
	});

	test("can fail to verify a jwt using EdDSA with an invalid signature", async () => {
		const mnemonic =
			"merge skate cycle typical service scrub idea gaze alert lion primary mosquito arrow hover ensure unusual immune length antique shrug earn spatial era pass";
		const seed = Bip39.mnemonicToSeed(mnemonic);
		const publicKey = Ed25519.publicKeyFromPrivateKey(seed.slice(0, Ed25519.PRIVATE_KEY_SIZE));

		await expect(
			Jwt.verify(
				"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.fGmPmgy96AwZ__G_7Y6CDsPQXVPqEQy6x9I1ENKuEAOKJMWS4wZiCZGaGzXxSJbNXXyIfd5m7mUJInyK-KE5C",
				publicKey
			)
		).rejects.toThrowError("verifyFailed");
	});

	test("can fail to verify a jwt with wrong number of segments", async () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		await expect(
			Jwt.verify(
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc.sfdhdfjhg",
				key
			)
		).rejects.toThrowError("verifyFailed");
	});

	test("can fail to verify a jwt with incorrect key", async () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		await expect(
			Jwt.verify(
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
				key
			)
		).rejects.toThrowError("verifyFailed");
	});

	test("can fail to decode a jwt with invalid key", async () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		await expect(
			Jwt.verify(
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
				key
			)
		).rejects.toThrowError("verifyFailed");
	});

	test("can fail to decode with invalid base64", async () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		await expect(Jwt.verify("!.!.", key)).rejects.toThrowError("verifyFailed");
	});

	test("can fail to decode with missing segments", async () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key2"));

		await expect(
			Jwt.verify(
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0",
				key
			)
		).rejects.toThrowError("verifyFailed");
	});

	test("can verify a jwt", async () => {
		const key = Blake2b.sum256(Converter.utf8ToBytes("my-key"));

		const decoded = await Jwt.verify(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
			key
		);
		expect(decoded?.header?.alg).toEqual("HS256");
		expect(decoded?.header?.typ).toEqual("JWT");
		expect(decoded?.payload?.sub).toEqual("123456");
		expect(decoded?.payload?.iat).toEqual(100000000);
	});

	test("can verify a jwt with a custom verifier", async () => {
		const decoded = await Jwt.verifyWithVerifier(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJpYXQiOjEwMDAwMDAwMH0.6zW3IrkPpisqfnBQdv79hX_em32FAmil3qp3aCDpUSc",
			async () => ({
				header: { alg: "HS256", typ: "JWT" },
				payload: { sub: "123456", iat: 100000000 }
			})
		);
		expect(decoded?.header?.alg).toEqual("HS256");
		expect(decoded?.header?.typ).toEqual("JWT");
		expect(decoded?.payload?.sub).toEqual("123456");
		expect(decoded?.payload?.iat).toEqual(100000000);
	});
});
