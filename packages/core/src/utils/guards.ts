// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "./converter";
import { Is } from "./is";
import { GuardError } from "../errors/guardError";

/**
 * Class to handle guard operations for parameters.
 */
export class Guards {
	/**
	 * Is the property a string.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static string(source: string, property: string, value: unknown): asserts value is string {
		if (!Is.string(value)) {
			throw new GuardError(source, "guard.string", property, value);
		}
	}

	/**
	 * Is the property a string with a value.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static stringValue(
		source: string,
		property: string,
		value: unknown
	): asserts value is string {
		if (!Is.string(value)) {
			throw new GuardError(source, "guard.string", property, value);
		}
		if (value.length === 0) {
			throw new GuardError(source, "guard.stringEmpty", property, value);
		}
	}

	/**
	 * Is the property a string with a hex value.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static stringHex(
		source: string,
		property: string,
		value: unknown
	): asserts value is string {
		Guards.stringValue(source, property, value);
		if (!Converter.isHex(value)) {
			throw new GuardError(source, "guard.stringHex", property, value);
		}
	}

	/**
	 * Is the property a string with a hex value with fixed length.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param length The length of the string to match.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static stringHexLength(
		source: string,
		property: string,
		value: unknown,
		length: number
	): asserts value is string {
		Guards.stringHex(source, property, value);
		if (value.length !== length) {
			throw new GuardError(
				source,
				"guard.stringHexLength",
				property,
				value.length,
				length.toString()
			);
		}
	}

	/**
	 * Is the property a number.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static number(source: string, property: string, value: unknown): asserts value is number {
		if (!Is.number(value)) {
			throw new GuardError(source, "guard.number", property, value);
		}
	}

	/**
	 * Is the property an integer.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static integer(source: string, property: string, value: unknown): asserts value is number {
		if (!Is.integer(value)) {
			throw new GuardError(source, "guard.integer", property, value);
		}
	}

	/**
	 * Is the property a boolean.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static boolean(
		source: string,
		property: string,
		value: unknown
	): asserts value is boolean {
		if (!Is.boolean(value)) {
			throw new GuardError(source, "guard.boolean", property, value);
		}
	}

	/**
	 * Is the property a date.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static date(source: string, property: string, value: unknown): asserts value is Date {
		if (!Is.date(value)) {
			throw new GuardError(source, "guard.date", property, value);
		}
	}

	/**
	 * Is the property a timestamp in milliseconds.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static milliseconds(
		source: string,
		property: string,
		value: unknown
	): asserts value is number {
		if (!Is.milliseconds(value)) {
			throw new GuardError(source, "guard.milliseconds", property, value);
		}
	}

	/**
	 * Is the property a timestamp in seconds.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static seconds(source: string, property: string, value: unknown): asserts value is number {
		if (!Is.seconds(value)) {
			throw new GuardError(source, "guard.seconds", property, value);
		}
	}

	/**
	 * Is the property an object.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static object<T = { [id: string]: unknown }>(
		source: string,
		property: string,
		value: unknown
	): asserts value is T {
		if (Is.undefined(value)) {
			throw new GuardError(source, "guard.objectUndefined", property, value);
		}
		if (!Is.object<T>(value)) {
			throw new GuardError(source, "guard.object", property, value);
		}
	}

	/**
	 * Is the property is an object with at least one property.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static objectValue<T = { [id: string]: unknown }>(
		source: string,
		property: string,
		value: unknown
	): asserts value is T {
		if (Is.undefined(value)) {
			throw new GuardError(source, "guard.objectUndefined", property, value);
		}
		if (!Is.object<T>(value)) {
			throw new GuardError(source, "guard.object", property, value);
		}
		if (Object.keys(value || {}).length === 0) {
			throw new GuardError(source, "guard.objectValue", property, value);
		}
	}

	/**
	 * Is the property is an array.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static array<T>(source: string, property: string, value: unknown): asserts value is T[] {
		if (!Is.array<T>(value)) {
			throw new GuardError(source, "guard.array", property, value);
		}
	}

	/**
	 * Is the property is an array with at least one item.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static arrayValue<T>(
		source: string,
		property: string,
		value: unknown
	): asserts value is T[] {
		if (!Is.array(value)) {
			throw new GuardError(source, "guard.array", property, value);
		}
		if (value.length === 0) {
			throw new GuardError(source, "guard.arrayValue", property, value);
		}
	}

	/**
	 * Is the property one of a list of items.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param options The options the value must be one of.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static arrayOneOf<T>(
		source: string,
		property: string,
		value: T,
		options: T[]
	): asserts value is T {
		if (!Is.array<T>(options)) {
			throw new GuardError(source, "guard.array", property, value);
		}
		if (!options.includes(value)) {
			throw new GuardError(source, "guard.arrayOneOf", property, value, options.join(", "));
		}
	}

	/**
	 * Is the property a Uint8Array.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static uint8Array(
		source: string,
		property: string,
		value: unknown
	): asserts value is Uint8Array {
		if (!Is.uint8Array(value)) {
			throw new GuardError(source, "guard.uint8Array", property, value);
		}
	}

	/**
	 * Is the property a function.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @returns True if the value is a function.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static function(source: string, property: string, value: unknown): boolean {
		if (!Is.function(value)) {
			throw new GuardError(source, "guard.function", property, value);
		}
		return true;
	}

	/**
	 * Is the property a string formatted as an email address.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static email(source: string, property: string, value: unknown): asserts value is string {
		if (!Is.email(value)) {
			throw new GuardError(source, "guard.email", property, value);
		}
	}
}
