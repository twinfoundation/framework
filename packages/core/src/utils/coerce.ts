// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Is } from "./is";

/**
 * Coerce an object from one type to another.
 */
export class Coerce {
	/**
	 * Coerce the value to a string.
	 * @param value The value to coerce.
	 * @throws TypeError If the value can not be coerced.
	 * @returns The value if it can be coerced.
	 */
	public static string(value: unknown): string | undefined {
		if (Is.undefined(value)) {
			return value;
		}
		if (Is.string(value)) {
			return value;
		}
		if (Is.number(value)) {
			return value.toString();
		}
		if (Is.boolean(value)) {
			return value ? "true" : "false";
		}
		if (Is.date(value)) {
			return value.toISOString();
		}
	}

	/**
	 * Coerce the value to a number.
	 * @param value The value to coerce.
	 * @throws TypeError If the value can not be coerced.
	 * @returns The value if it can be coerced.
	 */
	public static number(value: unknown): number | undefined {
		if (Is.undefined(value)) {
			return value;
		}
		if (Is.number(value)) {
			return value;
		}
		if (Is.string(value)) {
			const parsed = Number.parseFloat(value);
			if (Is.number(parsed)) {
				return parsed;
			}
		}
		if (Is.boolean(value)) {
			return value ? 1 : 0;
		}
		if (Is.date(value)) {
			return value.getTime();
		}
	}

	/**
	 * Coerce the value to a boolean.
	 * @param value The value to coerce.
	 * @throws TypeError If the value can not be coerced.
	 * @returns The value if it can be coerced.
	 */
	public static boolean(value: unknown): boolean | undefined {
		if (Is.undefined(value)) {
			return value;
		}
		if (Is.boolean(value)) {
			return value;
		}
		if (Is.number(value)) {
			// eslint-disable-next-line no-unneeded-ternary
			return value ? true : false;
		}
		if (Is.string(value)) {
			if (/true/i.test(value)) {
				return true;
			}
			if (/false/i.test(value)) {
				return false;
			}
		}
	}

	/**
	 * Coerce the value to a date.
	 * @param value The value to coerce.
	 * @throws TypeError If the value can not be coerced.
	 * @returns The value if it can be coerced.
	 */
	public static date(value: unknown): Date | undefined {
		if (Is.undefined(value)) {
			return value;
		}
		if (Is.date(value)) {
			return value;
		}
		if (Is.number(value)) {
			return new Date(value);
		}
		if (Is.string(value)) {
			const dt = new Date(value);
			if (!Number.isNaN(dt.getTime())) {
				const utc = Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate());
				return new Date(utc);
			}
		}
	}

	/**
	 * Coerce the value to a date/time.
	 * @param value The value to coerce.
	 * @throws TypeError If the value can not be coerced.
	 * @returns The value if it can be coerced.
	 */
	public static dateTime(value: unknown): Date | undefined {
		if (Is.undefined(value)) {
			return value;
		}
		if (Is.date(value)) {
			return value;
		}
		if (Is.number(value)) {
			return new Date(value);
		}
		if (Is.string(value)) {
			const dt = new Date(value);
			if (!Number.isNaN(dt.getTime())) {
				const utc = Date.UTC(
					dt.getUTCFullYear(),
					dt.getUTCMonth(),
					dt.getUTCDate(),
					dt.getUTCHours(),
					dt.getUTCMinutes(),
					dt.getUTCSeconds(),
					dt.getUTCMilliseconds()
				);
				return new Date(utc);
			}
		}
	}

	/**
	 * Coerce the value to a time.
	 * @param value The value to coerce.
	 * @throws TypeError If the value can not be coerced.
	 * @returns The value if it can be coerced.
	 */
	public static time(value: unknown): Date | undefined {
		if (Is.undefined(value)) {
			return value;
		}
		if (Is.date(value)) {
			return value;
		}
		if (Is.number(value)) {
			const dt = new Date(value);
			dt.setFullYear(1970, 0, 1);
			return dt;
		}
		if (Is.string(value)) {
			const dt = new Date(value);
			if (!Number.isNaN(dt.getTime())) {
				const utc = Date.UTC(
					1970,
					0,
					1,
					dt.getUTCHours(),
					dt.getUTCMinutes(),
					dt.getUTCSeconds(),
					dt.getUTCMilliseconds()
				);
				return new Date(utc);
			}
		}
	}
}
