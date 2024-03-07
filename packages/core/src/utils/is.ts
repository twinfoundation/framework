// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DateTime } from "luxon";
import { Converter } from "./converter";

/**
 * Class to check types of objects.
 */
export class Is {
	/**
	 * Is the property undefined.
	 * @param value The value to test.
	 * @returns True if the value is a empty.
	 */
	public static undefined(value: unknown): value is undefined {
		return value === undefined;
	}

	/**
	 * Is the property null.
	 * @param value The value to test.
	 * @returns True if the value is a empty.
	 */
	public static null(value: unknown): value is null {
		return value === null;
	}

	/**
	 * Is the property null or undefined.
	 * @param value The value to test.
	 * @returns True if the value is a empty.
	 */
	public static empty(value: unknown): value is undefined | null {
		return value === null || value === undefined;
	}

	/**
	 * Is the property is not null or undefined.
	 * @param value The value to test.
	 * @returns True if the value is a not empty.
	 */
	public static notEmpty(value: unknown): boolean {
		return value !== null && value !== undefined;
	}

	/**
	 * Is the value a string.
	 * @param value The value to test.
	 * @returns True if the value is a string.
	 */
	public static string(value: unknown): value is string {
		return typeof value === "string";
	}

	/**
	 * Is the value a string.
	 * @param value The value to test.
	 * @returns True if the value is a string.
	 */
	public static stringValue(value: unknown): value is string {
		return Is.string(value) && value.trim().length > 0;
	}

	/**
	 * Is the value a hex string.
	 * @param value The value to test.
	 * @returns True if the value is a hex string.
	 */
	public static stringHex(value: unknown): value is string {
		return Is.string(value) && Converter.isHex(value);
	}

	/**
	 * Is the value a hex string of fixed length.
	 * @param value The value to test.
	 * @param length The length to test.
	 * @returns True if the value is a hex string of required length.
	 */
	public static stringHexLength(value: unknown, length: number): value is string {
		return Is.stringHex(value) && value.length === length;
	}

	/**
	 * Is the value a number.
	 * @param value The value to test.
	 * @returns True if the value is a number.
	 */
	public static number(value: unknown): value is number {
		return typeof value === "number" && Number.isFinite(value) && !Number.isNaN(value);
	}

	/**
	 * Is the value an integer.
	 * @param value The value to test.
	 * @returns True if the value is a number.
	 */
	public static integer(value: unknown): value is number {
		return Is.number(value) && Number.isInteger(value);
	}

	/**
	 * Is the value a boolean.
	 * @param value The value to test.
	 * @returns True if the value is a boolean.
	 */
	public static boolean(value: unknown): value is boolean {
		return typeof value === "boolean";
	}

	/**
	 * Is the value a date.
	 * @param value The value to test.
	 * @returns True if the value is a date.
	 */
	public static date(value: unknown): value is Date {
		return (
			Object.prototype.toString.call(value) === "[object Date]" &&
			!Number.isNaN((value as Date).getTime())
		);
	}

	/**
	 * Is the value an empty date.
	 * @param value The value to test.
	 * @returns True if the value is an empty date.
	 */
	public static dateEmpty(value: unknown): boolean {
		return (
			Object.prototype.toString.call(value) === "[object Date]" &&
			Number.isNaN((value as Date).getTime())
		);
	}

	/**
	 * Is the value a date string.
	 * @param value The value to test.
	 * @returns True if the value is a string in ISO 8601 date format.
	 */
	public static dateString(value: unknown): boolean {
		if (typeof value !== "string" || value.length === 0 || value.includes("T")) {
			return false;
		}
		return DateTime.fromISO(value).isValid;
	}

	/**
	 * Is the value a date string.
	 * @param value The value to test.
	 * @returns True if the value is a string in ISO 8601 date/time format.
	 */
	public static dateTimeString(value: unknown): boolean {
		if (typeof value !== "string" || value.length === 0 || !value.includes("T")) {
			return false;
		}
		return DateTime.fromISO(value).isValid;
	}

	/**
	 * Is the value a time string.
	 * @param value The value to test.
	 * @returns True if the value is a string in ISO 8601 time format.
	 */
	public static timeString(value: unknown): boolean {
		if (typeof value !== "string" || value.length === 0 || value.includes("T")) {
			return false;
		}
		return DateTime.fromISO(value).isValid;
	}

	/**
	 * Is the value a timestamp in seconds.
	 * @param value The value to test.
	 * @returns True if the value is a date.
	 */
	public static seconds(value: unknown): value is number {
		if (!Is.integer(value)) {
			return false;
		}

		return value.toString().length < 12;
	}

	/**
	 * Is the value a timestamp in milliseconds.
	 * @param value The value to test.
	 * @returns True if the value is a date.
	 */
	public static milliseconds(value: unknown): value is number {
		if (!Is.integer(value)) {
			return false;
		}

		return value.toString().length >= 12;
	}

	/**
	 * Is the value an object.
	 * @param value The value to test.
	 * @returns True if the value is a object.
	 */
	public static object<T = { [id: string]: unknown }>(value: unknown): value is T {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}

	/**
	 * Is the value an object with at least one property.
	 * @param value The value to test.
	 * @returns True if the value is a object.
	 */
	public static objectValue<T = { [id: string]: unknown }>(value: unknown): value is T {
		return (
			typeof value === "object" &&
			value !== null &&
			!Array.isArray(value) &&
			Object.keys(value).length > 0
		);
	}

	/**
	 * Is the value an array.
	 * @param value The value to test.
	 * @returns True if the value is an array.
	 */
	public static array<T>(value: unknown): value is T[] {
		return Array.isArray(value);
	}

	/**
	 * Is the value an array with at least one element.
	 * @param value The value to test.
	 * @returns True if the value is an array with at least one element.
	 */
	public static arrayValue<T>(value: unknown): value is T[] {
		return Array.isArray(value) && value.length > 0;
	}

	/**
	 * Is the value an array with at least one element.
	 * @param value The value to test.
	 * @param options The options the value must be one of.
	 * @returns True if the value is an element from the options array.
	 */
	public static arrayOneOf<T>(value: T, options: T[]): value is T {
		if (
			Is.empty(value) ||
			!Is.stringValue(value) ||
			!Is.array<T>(options) ||
			!options.includes(value)
		) {
			return false;
		}

		return true;
	}

	/**
	 * Is the value a Uint8Array.
	 * @param value The value to test.
	 * @returns True if the value is a Uint8Array.
	 */
	public static uint8Array(value: unknown): value is Uint8Array {
		return value instanceof Uint8Array;
	}

	/**
	 * Is the property a function.
	 * @param value The value to test.
	 * @returns True if the value is a function.
	 */
	public static function(value: unknown): value is (...args: unknown[]) => unknown {
		return typeof value === "function";
	}

	/**
	 * Is the value a string formatted as an email address.
	 * @param value The value to test.
	 * @returns True if the value is a string.
	 */
	public static email(value: unknown): value is string {
		return (
			Is.string(value) &&
			/^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/.test(
				value
			)
		);
	}
}
