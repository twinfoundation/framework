// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { CryptoKey } from "jose";

/**
 * The crypto key for a JWK.
 */
export type JwkCryptoKey = CryptoKey | Uint8Array;
