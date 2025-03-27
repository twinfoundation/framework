// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Compression types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CompressionType = {
	/**
	 * Gzip.
	 */
	Gzip: "gzip",

	/**
	 * Deflate.
	 */
	Deflate: "deflate"
} as const;

/**
 * Compression types.
 */
export type CompressionType = (typeof CompressionType)[keyof typeof CompressionType];
