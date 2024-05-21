// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter } from "@gtsc/core";
import { Bip44 } from "../../src/address/bip44";
import { Bip39 } from "../../src/keys/bip39";
import { KeyType } from "../../src/models/keyType";

describe("Bip44", () => {
	test("Can generate an address", () => {
		const mnemonic =
			"agree ill brick grant cement security expire appear unknown law toe keep believe project whale welcome easy twenty deposit hour doctor witness edit mimic";
		const seed = Bip39.mnemonicToSeed(mnemonic);
		const addressAndKeyPair = Bip44.addressBech32(seed, KeyType.Ed25519, "rms", 4219, 0, false, 0);
		expect(addressAndKeyPair.address).toBe(
			"rms1qrk2zfuwdmhtw0vc2larmsypvemgsmph25scptnmluyhhxlpkfwx5546u34"
		);
		expect(Converter.bytesToHex(addressAndKeyPair.privateKey)).toBe(
			"7819681660e891d8b1c4f04e7e9bc77d8b81dc2d25c756da6c1f3b6721ac6831"
		);
		expect(Converter.bytesToHex(addressAndKeyPair.publicKey)).toBe(
			"af8ab4cb01c2107ece426a78430c1eafaf1684f74f2f36cd884ee430863be0c2"
		);
	});
});
