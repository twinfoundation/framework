// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * Error correction level to use for the QR Code.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export enum ErrorCorrectLevel {
	/**
	 * 7% Error correction.
	 */
	L = 1,

	/**
	 * 15% Error correction.
	 */
	M = 0,

	/**
	 * 25% Error correction.
	 */
	Q = 3,

	/**
	 * 30% Error correction.
	 */
	H = 2
}
