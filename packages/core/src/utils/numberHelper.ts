// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Is } from "./is.js";

/**
 * Class to help with numbers.
 */
export class NumberHelper {
	/**
	 * Strict parse as float.
	 * @param value The value to parse.
	 * @returns The parsed value.
	 */
	public static strictParseFloat(value: unknown): number {
		if (Is.stringValue(value)) {
			// Use Number cast instead of parseFloat as this will return NaN
			// if there are any invalid characters, parseFloat still works
			// with 1.23aaa
			return Number(value);
		}
		return Number.NaN;
	}

	/**
	 * Strict parse as integer.
	 * @param value The value to parse.
	 * @returns The parsed value.
	 */
	public static strictParseInt(value: unknown): number {
		if (Is.stringValue(value) && /^[+-]?(\d+)$/.test(value)) {
			// Use Number cast instead of parseInt as this will return NaN
			// if there are any invalid characters, parseInt still works
			// with 123aaa
			return Number(value);
		}
		return Number.NaN;
	}
}
