// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { HDKey as HDKeySecp256k1 } from "@scure/bip32";
import { Converter, GeneralError } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { HDKey as HDKeyEd25519 } from "micro-key-producer/slip10.js";
import type { Bip32Path } from "./bip32Path";
import { Ed25519 } from "../curves/ed25519";
import { Secp256k1 } from "../curves/secp256k1";
import { KeyType } from "../models/keyType";

/**
 * Class to help with slip0010 key derivation
 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md.
 */
export class Slip0010 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Slip0010>();

	/**
	 * Get the master key from the seed.
	 * @param seed The seed to generate the master key from.
	 * @param keyType The key type.
	 * @returns The key and chain code.
	 * @throws If the seed is invalid.
	 */
	public static getMasterKeyFromSeed(
		seed: Uint8Array,
		keyType: KeyType = KeyType.Ed25519
	): {
		privateKey: Uint8Array;
		chainCode: Uint8Array;
	} {
		try {
			const masterKey =
				keyType === KeyType.Ed25519
					? HDKeyEd25519.fromMasterSeed(seed)
					: HDKeySecp256k1.fromMasterSeed(seed);

			return {
				privateKey: masterKey.privateKey ?? new Uint8Array(),
				chainCode: masterKey.chainCode ?? new Uint8Array()
			};
		} catch (error) {
			throw new GeneralError(
				Slip0010._CLASS_NAME,
				"invalidSeed",
				{ seed: Converter.bytesToUtf8(seed) },
				error
			);
		}
	}

	/**
	 * Derive a key from the path.
	 * @param seed The seed.
	 * @param path The path.
	 * @param keyType The key type.
	 * @returns The key and chain code.
	 */
	public static derivePath(
		seed: Uint8Array,
		path: Bip32Path,
		keyType: KeyType = KeyType.Ed25519
	): {
		privateKey: Uint8Array;
		chainCode: Uint8Array;
	} {
		const keyOpts = Slip0010.getMasterKeyFromSeed(seed, keyType);

		if (keyType === KeyType.Ed25519) {
			const hdKey = new HDKeyEd25519(keyOpts);
			const derivedKey = hdKey.derive(path.toString());
			return {
				privateKey: derivedKey.privateKey,
				chainCode: derivedKey.chainCode
			};
		}
		const hdKey = new HDKeySecp256k1(keyOpts);
		const derivedKey = hdKey.derive(path.toString());
		return {
			privateKey: derivedKey.privateKey ?? new Uint8Array(),
			chainCode: derivedKey.chainCode ?? new Uint8Array()
		};
	}

	/**
	 * Get the public key from the private key.
	 * @param privateKey The private key.
	 * @param keyType The key type.
	 * @param withZeroByte Include a zero bute prefix.
	 * @returns The public key.
	 */
	public static getPublicKey(
		privateKey: Uint8Array,
		keyType: KeyType = KeyType.Ed25519,
		withZeroByte: boolean = true
	): Uint8Array {
		const signPk =
			keyType === KeyType.Ed25519
				? Ed25519.publicKeyFromPrivateKey(privateKey)
				: Secp256k1.publicKeyFromPrivateKey(privateKey);
		if (withZeroByte) {
			const arr = new Uint8Array(1 + signPk.length);
			arr[0] = 0;
			arr.set(signPk, 1);
			return arr;
		}
		return signPk;
	}
}
