// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * This is a TypeScript port of https://github.com/katzenpost/core/blob/master/crypto/extra25519/extra25519.go.
 */
import { edwardsToMontgomeryPriv, edwardsToMontgomeryPub } from "@noble/curves/ed25519";
import { Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * Implementation of X25519.
 */
export class X25519 {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<X25519>();

	/**
	 * Convert Ed25519 private key to X25519 private key.
	 * @param ed25519PrivateKey The ed25519 private key to convert.
	 * @returns The x25519 private key.
	 */
	public static convertPrivateKeyToX25519(ed25519PrivateKey: Uint8Array): Uint8Array {
		Guards.uint8Array(X25519._CLASS_NAME, nameof(ed25519PrivateKey), ed25519PrivateKey);
		return edwardsToMontgomeryPriv(ed25519PrivateKey);
	}

	/**
	 * Convert Ed25519 public key to X25519 public key.
	 * @param ed25519PublicKey The ed25519 public key to convert.
	 * @returns The x25519 public key.
	 * @throws GeneralError On invalid public key.
	 */
	public static convertPublicKeyToX25519(ed25519PublicKey: Uint8Array): Uint8Array {
		Guards.uint8Array(X25519._CLASS_NAME, nameof(ed25519PublicKey), ed25519PublicKey);
		return edwardsToMontgomeryPub(ed25519PublicKey);
	}
}
