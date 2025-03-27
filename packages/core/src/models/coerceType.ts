// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types the extracted data can be coerced to.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CoerceType = {
	/**
	 * String.
	 */
	String: "string",

	/**
	 * Number.
	 */
	Number: "number",

	/**
	 * Integer.
	 */
	Integer: "integer",

	/**
	 * Boolean.
	 */
	Boolean: "boolean",

	/**
	 * Big Integer.
	 */
	BigInt: "bigint",

	/**
	 * Date.
	 */
	Date: "date",

	/**
	 * Date Time.
	 */
	DateTime: "datetime",

	/**
	 * Time.
	 */
	Time: "time",

	/**
	 * Object.
	 */
	Object: "object",

	/**
	 * Uint8Array.
	 */
	Uint8Array: "uint8array"
} as const;

/**
 * The types the extracted data can be coerced to.
 */
export type CoerceType = (typeof CoerceType)[keyof typeof CoerceType];
