// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "./converter";
import { Is } from "./is";
import { CoerceType } from "../models/coerceType";

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
	 * Coerce the value to an integer.
	 * @param value The value to coerce.
	 * @throws TypeError If the value can not be coerced.
	 * @returns The value if it can be coerced.
	 */
	public static integer(value: unknown): number | undefined {
		const num = Coerce.number(value);
		if (!Is.undefined(num)) {
			return Math.trunc(num);
		}
	}

	/**
	 * Coerce the value to a bigint.
	 * @param value The value to coerce.
	 * @throws TypeError If the value can not be coerced.
	 * @returns The value if it can be coerced.
	 */
	public static bigint(value: unknown): bigint | undefined {
		if (Is.undefined(value)) {
			return value;
		}
		if (Is.bigint(value)) {
			return value;
		}
		if (Is.number(value)) {
			return BigInt(value);
		}
		if (Is.string(value)) {
			const parsed = Number.parseFloat(value);
			if (Is.integer(parsed)) {
				return BigInt(parsed);
			}
		}
		if (Is.boolean(value)) {
			return value ? 1n : 0n;
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

	/**
	 * Coerce the value to an object.
	 * @param value The value to coerce.
	 * @throws TypeError If the value can not be coerced.
	 * @returns The value if it can be coerced.
	 */
	public static object<T = unknown>(value: unknown): T | undefined {
		if (Is.undefined(value)) {
			return value;
		}
		if (Is.object<T>(value)) {
			return value;
		}
		if (Is.stringValue(value)) {
			try {
				return JSON.parse(value) as T;
			} catch {}
		}
	}

	/**
	 * Coerce the value to a Uint8Array.
	 * @param value The value to coerce.
	 * @throws TypeError If the value can not be coerced.
	 * @returns The value if it can be coerced.
	 */
	public static uint8Array(value: unknown): Uint8Array | undefined {
		if (Is.undefined(value)) {
			return value;
		}
		if (Is.string(value)) {
			if (Is.stringHex(value.toLowerCase(), true)) {
				return Converter.hexToBytes(value.toLowerCase());
			}
			if (Is.stringBase64(value)) {
				return Converter.base64ToBytes(value);
			}
		}
	}

	/**
	 * Coerces a value based on the coercion type.
	 * @param value The value to coerce.
	 * @param type The coercion type to perform.
	 * @returns The coerced value.
	 */
	public static byType(value: unknown, type?: CoerceType): unknown {
		if (Is.undefined(type)) {
			return value;
		}
		switch (type) {
			case CoerceType.String:
				return Coerce.string(value);
			case CoerceType.Number:
				return Coerce.number(value);
			case CoerceType.Integer:
				return Coerce.integer(value);
			case CoerceType.BigInt:
				return Coerce.bigint(value);
			case CoerceType.Boolean:
				return Coerce.boolean(value);
			case CoerceType.Date:
				return Coerce.date(value);
			case CoerceType.DateTime:
				return Coerce.dateTime(value);
			case CoerceType.Time:
				return Coerce.time(value);
			case CoerceType.Object:
				return Coerce.object(value);
			case CoerceType.Uint8Array:
				return Coerce.uint8Array(value);
		}
	}
}
