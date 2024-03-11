// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * The mode for the qr data.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export enum QRDataMode {
	/**
	 * Number.
	 */
	Number = 1,

	/**
	 * Alphabet and number.
	 */
	AlphaNumeric = 2,

	/**
	 * 8bit byte.
	 */
	Byte8 = 4
}
