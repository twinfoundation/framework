// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * The mode for the qr data.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const QRDataMode = {
	/**
	 * Number.
	 */
	Number: 1,

	/**
	 * Alphabet and number.
	 */
	AlphaNumeric: 2,

	/**
	 * 8bit byte.
	 */
	Byte8: 4
} as const;

/**
 * The mode for the qr data.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export type QRDataMode = (typeof QRDataMode)[keyof typeof QRDataMode];
