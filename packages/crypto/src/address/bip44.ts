// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { GeneralError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { AddressType } from "./addressType";
import { Bech32 } from "../address/bech32";
import { Blake2b } from "../hashes/blake2b";
import { Bip32Path } from "../keys/bip32Path";
import { Slip0010 } from "../keys/slip0010";
import { Ed25519 } from "../signatures/ed25519";

/**
 * Implementation of Bip44 for address generation.
 */
export class Bip44 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Bip44>();

	/**
	 * Generate a bip44 address from the seed and parts.
	 * @param seed The account seed.
	 * @param addressType The address type.
	 * @param hrp The human readable part of the address.
	 * @param coinType The coin type.
	 * @param accountIndex The account index.
	 * @param isInternal Is this an internal address.
	 * @param addressIndex The address index.
	 * @returns The generated path.
	 */
	public static addressBech32(
		seed: Uint8Array,
		addressType: AddressType,
		hrp: string,
		coinType: number,
		accountIndex: number,
		isInternal: boolean,
		addressIndex: number
	): {
		address: string;
		keyPair: {
			privateKey: Uint8Array;
			publicKey: Uint8Array;
		};
	} {
		const keyPair = Bip44.keyPair(
			seed,
			addressType,
			coinType,
			accountIndex,
			isInternal,
			addressIndex
		);

		const addressData = Blake2b.sum256(keyPair.publicKey);
		const bech32Data = new Uint8Array(1 + addressData.length);
		bech32Data[0] = addressType;
		bech32Data.set(addressData, 1);

		return {
			address: Bech32.encode(hrp, bech32Data),
			keyPair
		};
	}

	/**
	 * Generate a bip44 key pair from the seed and parts.
	 * @param seed The account seed.
	 * @param addressType The address type.
	 * @param coinType The coin type.
	 * @param accountIndex The account index.
	 * @param isInternal Is this an internal address.
	 * @param addressIndex The address index.
	 * @returns The key pair.
	 * @throws Error if the address type is not supported.
	 */
	public static keyPair(
		seed: Uint8Array,
		addressType: AddressType,
		coinType: number,
		accountIndex: number,
		isInternal: boolean,
		addressIndex: number
	): {
		privateKey: Uint8Array;
		publicKey: Uint8Array;
	} {
		const bip44Path = Bip44.path(coinType, accountIndex, isInternal, addressIndex);
		const keys = Slip0010.derivePath(seed, bip44Path);

		if (addressType === AddressType.Ed25519) {
			const keyPair = Ed25519.keyPairFromSeed(keys.privateKey);
			return {
				privateKey:	keyPair.privateKey.slice(0, 32),
				publicKey: keyPair.publicKey
			};
		}

		throw new GeneralError(Bip44._CLASS_NAME, "unsupportedAddressType", { addressType });
	}

	/**
	 * Generate a bip44 path based on all its parts.
	 * @param coinType The coin type.
	 * @param accountIndex The account index.
	 * @param isInternal Is this an internal address.
	 * @param addressIndex The address index.
	 * @returns The generated path.
	 */
	public static path(
		coinType: number,
		accountIndex: number,
		isInternal: boolean,
		addressIndex: number
	): Bip32Path {
		const bip32Path = new Bip32Path(Bip44.basePath(coinType));

		bip32Path.pushHardened(accountIndex);
		bip32Path.pushHardened(isInternal ? 1 : 0);
		bip32Path.pushHardened(addressIndex);

		return bip32Path;
	}

	/**
	 * Create a bip44 base path for the provided coin type.
	 * @param coinType The coin type.
	 * @returns The bip44 address base path.
	 */
	public static basePath(coinType: number): string {
		return `m/44'/${coinType}'`;
	}
}
