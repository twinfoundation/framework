// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Mask patterns for QR codes.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MaskPattern = {
	/**
	 * Mask pattern 000.
	 */
	PATTERN000: 0b000,

	/**
	 * Mask pattern 001.
	 */
	PATTERN001: 0b001,

	/**
	 * Mask pattern 010.
	 */
	PATTERN010: 0b010,

	/**
	 * Mask pattern 011.
	 */
	PATTERN011: 0b011,

	/**
	 * Mask pattern 100.
	 */
	PATTERN100: 0b100,

	/**
	 * Mask pattern 101.
	 */
	PATTERN101: 0b101,

	/**
	 * Mask pattern 110.
	 */
	PATTERN110: 0b110,

	/**
	 * Mask pattern 111.
	 */
	PATTERN111: 0b111
};

/**
 * Mask patterns for QR codes.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export type MaskPattern = (typeof MaskPattern)[keyof typeof MaskPattern];
