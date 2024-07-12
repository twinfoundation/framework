// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@gtsc/core";
import { Bip32Path } from "../../src/keys/bip32Path";
import { Slip0010 } from "../../src/keys/slip0010";
import { KeyType } from "../../src/models/keyType";

describe("Slip0010", () => {
	// https://github.com/satoshilabs/slips/blob/master/slip-0010.md
	test("Can generate a master key and chain code from seed ed25519", () => {
		const { privateKey, chainCode } = Slip0010.getMasterKeyFromSeed(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f")
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"2b4be7f19ee27bbf30c667b642d5f4aa69fd169872f8fc3059c08ebae2eb19e7"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"90046a93de5380a72b5e45010748567d5ea02bbf6522f979e05c0d8d8ca9fffb"
		);

		const publicKey = Slip0010.getPublicKey(privateKey);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"00a4b2856bfec510abab89753fac1ac0e1112364e7d250545963f135f2a33188ed"
		);
	});

	test("Can generate a key and chain code from seed and path m/0' ed25519", () => {
		const { privateKey, chainCode } = Slip0010.derivePath(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			new Bip32Path("m/0'")
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"68e0fe46dfb67e368c75379acec591dad19df3cde26e63b93a8e704f1dade7a3"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"8b59aa11380b624e81507a27fedda59fea6d0b779a778918a2fd3590e16e9c69"
		);

		const publicKey = Slip0010.getPublicKey(privateKey);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"008c8a13df77a28f3445213a0f432fde644acaa215fc72dcdf300d5efaa85d350c"
		);
	});

	test("Can generate a key and chain code from seed and path m/0'/1' ed25519", () => {
		const { privateKey, chainCode } = Slip0010.derivePath(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			new Bip32Path("m/0'/1'")
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"b1d0bad404bf35da785a64ca1ac54b2617211d2777696fbffaf208f746ae84f2"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"a320425f77d1b5c2505a6b1b27382b37368ee640e3557c315416801243552f14"
		);

		const publicKey = Slip0010.getPublicKey(privateKey);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"001932a5270f335bed617d5b935c80aedb1a35bd9fc1e31acafd5372c30f5c1187"
		);
	});

	test("Can generate a key and chain code from seed and path m/0'/1'/2' ed25519", () => {
		const { privateKey, chainCode } = Slip0010.derivePath(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			new Bip32Path("m/0'/1'/2'")
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"92a5b23c0b8a99e37d07df3fb9966917f5d06e02ddbd909c7e184371463e9fc9"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"2e69929e00b5ab250f49c3fb1c12f252de4fed2c1db88387094a0f8c4c9ccd6c"
		);

		const publicKey = Slip0010.getPublicKey(privateKey);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"00ae98736566d30ed0e9d2f4486a64bc95740d89c7db33f52121f8ea8f76ff0fc1"
		);
	});

	test("Can generate a key and chain code from seed and path m/0'/1'/2'/2' ed25519", () => {
		const { privateKey, chainCode } = Slip0010.derivePath(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			new Bip32Path("m/0'/1'/2'/2'")
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"30d1dc7e5fc04c31219ab25a27ae00b50f6fd66622f6e9c913253d6511d1e662"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"8f6d87f93d750e0efccda017d662a1b31a266e4a6f5993b15f5c1f07f74dd5cc"
		);

		const publicKey = Slip0010.getPublicKey(privateKey);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"008abae2d66361c879b900d204ad2cc4984fa2aa344dd7ddc46007329ac76c429c"
		);
	});

	test("Can generate a key and chain code from seed and path m/0'/1'/2'/2'/1000000000' ed25519", () => {
		const { privateKey, chainCode } = Slip0010.derivePath(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			new Bip32Path("m/0'/1'/2'/2'/1000000000'")
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"8f94d394a8e8fd6b1bc2f3f49f5c47e385281d5c17e65324b0f62483e37e8793"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"68789923a0cac2cd5a29172a475fe9e0fb14cd6adb5ad98a3fa70333e7afa230"
		);

		const publicKey = Slip0010.getPublicKey(privateKey);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"003c24da049451555d51a7014a37337aa4e12d41e485abccfa46b47dfb2af54b7a"
		);
	});

	test("Can generate a master key and chain code from seed secp256k1", () => {
		const { privateKey, chainCode } = Slip0010.getMasterKeyFromSeed(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			KeyType.Secp256k1
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"e8f32e723decf4051aefac8e2c93c9c5b214313817cdb01a1494b917c8436b35"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508"
		);

		const publicKey = Slip0010.getPublicKey(privateKey, KeyType.Secp256k1, false);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"0339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2"
		);
	});

	test("Can generate a master key and chain code from seed and path m/0' secp256k1", () => {
		const { privateKey, chainCode } = Slip0010.derivePath(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			new Bip32Path("m/0'"),
			KeyType.Secp256k1
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"edb2e14f9ee77d26dd93b4ecede8d16ed408ce149b6cd80b0715a2d911a0afea"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"47fdacbd0f1097043b78c63c20c34ef4ed9a111d980047ad16282c7ae6236141"
		);

		const publicKey = Slip0010.getPublicKey(privateKey, KeyType.Secp256k1, false);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"035a784662a4a20a65bf6aab9ae98a6c068a81c52e4b032c0fb5400c706cfccc56"
		);
	});

	test("Can generate a master key and chain code from seed and path m/0'/1 secp256k1", () => {
		const { privateKey, chainCode } = Slip0010.derivePath(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			new Bip32Path("m/0'/1"),
			KeyType.Secp256k1
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"3c6cb8d0f6a264c91ea8b5030fadaa8e538b020f0a387421a12de9319dc93368"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"2a7857631386ba23dacac34180dd1983734e444fdbf774041578e9b6adb37c19"
		);

		const publicKey = Slip0010.getPublicKey(privateKey, KeyType.Secp256k1, false);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"03501e454bf00751f24b1b489aa925215d66af2234e3891c3b21a52bedb3cd711c"
		);
	});

	test("Can generate a master key and chain code from seed and path m/0'/1/2' secp256k1", () => {
		const { privateKey, chainCode } = Slip0010.derivePath(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			new Bip32Path("m/0'/1/2'"),
			KeyType.Secp256k1
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"cbce0d719ecf7431d88e6a89fa1483e02e35092af60c042b1df2ff59fa424dca"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"04466b9cc8e161e966409ca52986c584f07e9dc81f735db683c3ff6ec7b1503f"
		);

		const publicKey = Slip0010.getPublicKey(privateKey, KeyType.Secp256k1, false);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"0357bfe1e341d01c69fe5654309956cbea516822fba8a601743a012a7896ee8dc2"
		);
	});

	test("Can generate a master key and chain code from seed and path m/0'/1/2'/2 secp256k1", () => {
		const { privateKey, chainCode } = Slip0010.derivePath(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			new Bip32Path("m/0'/1/2'/2"),
			KeyType.Secp256k1
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"0f479245fb19a38a1954c5c7c0ebab2f9bdfd96a17563ef28a6a4b1a2a764ef4"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"cfb71883f01676f587d023cc53a35bc7f88f724b1f8c2892ac1275ac822a3edd"
		);

		const publicKey = Slip0010.getPublicKey(privateKey, KeyType.Secp256k1, false);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"02e8445082a72f29b75ca48748a914df60622a609cacfce8ed0e35804560741d29"
		);
	});

	test("Can generate a master key and chain code from seed and path m/0'/1/2'/2/1000000000 secp256k1", () => {
		const { privateKey, chainCode } = Slip0010.derivePath(
			Converter.hexToBytes("000102030405060708090a0b0c0d0e0f"),
			new Bip32Path("m/0'/1/2'/2/1000000000"),
			KeyType.Secp256k1
		);
		expect(Converter.bytesToHex(privateKey)).toEqual(
			"471b76e389e528d6de6d816857e012c5455051cad6660850e58372a6c3e6e7c8"
		);
		expect(Converter.bytesToHex(chainCode)).toEqual(
			"c783e67b921d2beb8f6b389cc646d7263b4145701dadd2161548a8b078e65e9e"
		);

		const publicKey = Slip0010.getPublicKey(privateKey, KeyType.Secp256k1, false);
		expect(Converter.bytesToHex(publicKey)).toEqual(
			"022a471424da5e657499d1ff51cb43c47481a03b1e77f951fe64cec9f5a48f7011"
		);
	});
});
