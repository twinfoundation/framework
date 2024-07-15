// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * Error correction level to use for the QR Code.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ErrorCorrectLevel = {
	/**
	 * 7% Error correction.
	 */
	L: 1,

	/**
	 * 15% Error correction.
	 */
	M: 0,

	/**
	 * 25% Error correction.
	 */
	Q: 3,

	/**
	 * 30% Error correction.
	 */
	H: 2
} as const;

/**
 * Error correction level to use for the QR Code.
 * Based on https://github.com/kazuhikoarase/qrcode-generator/ .
 */
export type ErrorCorrectLevel = (typeof ErrorCorrectLevel)[keyof typeof ErrorCorrectLevel];
