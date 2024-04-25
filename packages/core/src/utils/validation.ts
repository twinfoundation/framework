// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "./is";
import { ValidationError } from "../errors/validationError";
import type { IValidationFailure } from "../models/IValidationFailure";

/**
 * Class to handle validation operations.
 */
export class Validation {
	/**
	 * Is the property null or undefined.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a empty.
	 */
	public static empty(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is undefined | null {
		const is = Is.empty(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.empty",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property is not null or undefined.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a not empty.
	 */
	public static notEmpty(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): boolean {
		const is = Is.notEmpty(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.notEmpty",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a string.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a string.
	 */
	public static string(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Is.string(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beText",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a string with a value.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a string.
	 */
	public static stringValue(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Is.stringValue(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.notEmpty",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a number.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a number.
	 */
	public static number(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is number {
		const is = Is.number(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beNumber",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property an integer.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a number.
	 */
	public static integer(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is number {
		const is = Is.integer(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beWholeNumber",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a bigint.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a bigint.
	 */
	public static bigint(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is bigint {
		const is = Is.bigint(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beBigInteger",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a boolean.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a boolean.
	 */
	public static boolean(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is boolean {
		const is = Is.boolean(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beBoolean",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a date.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a date.
	 */
	public static date(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is Date {
		if (!Is.dateEmpty(value)) {
			failures.push({
				property,
				reason: "validation.notEmpty",
				properties: {
					value
				}
			});
			return false;
		}

		const is = Is.date(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beDate",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a date in ISO 8601 format.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a date.
	 */
	public static dateString(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		if (!Is.stringValue(value)) {
			failures.push({
				property,
				reason: "validation.notEmpty",
				properties: {
					value
				}
			});
			return false;
		}

		const is = Is.dateString(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beDate",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a date/time in ISO 8601 format.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a date/time.
	 */
	public static dateTimeString(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		if (!Is.stringValue(value)) {
			failures.push({
				property,
				reason: "validation.notEmpty",
				properties: {
					value
				}
			});
			return false;
		}

		const is = Is.dateTimeString(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beDateTime",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a time in ISO 8601 format.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a time.
	 */
	public static timeString(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		if (!Is.stringValue(value)) {
			failures.push({
				property,
				reason: "validation.notEmpty",
				properties: {
					value
				}
			});
			return false;
		}

		const is = Is.timeString(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beTime",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a timestamp in milliseconds.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a timestamp in milliseconds.
	 */
	public static milliseconds(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is number {
		if (Number.isNaN(value)) {
			failures.push({
				property,
				reason: "validation.notEmpty",
				properties: {
					value
				}
			});
			return false;
		}

		const is = Is.milliseconds(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beMilliseconds",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a timestamp in seconds.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a timestamp in seconds.
	 */
	public static seconds(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is number {
		if (Number.isNaN(value)) {
			failures.push({
				property,
				reason: "validation.notEmpty",
				properties: {
					value
				}
			});
			return false;
		}

		const is = Is.seconds(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beSeconds",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property an object.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a object.
	 */
	public static object<T = { [id: string]: unknown }>(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is T {
		const is = Is.object<T>(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beObject",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property an array.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is an array.
	 */
	public static array<T>(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is T[] {
		const is = Is.array<T>(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beArray",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property an array with at least one item.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is an array with at least one element.
	 */
	public static arrayValue<T>(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is T[] {
		const is = Is.array(value) && value.length > 0;
		if (!is) {
			failures.push({
				property,
				reason: "validation.beArrayValue",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property one of a list of items.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param options The options the value must be one of.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is one of the items in the options.
	 */
	public static arrayOneOf<T>(
		property: string,
		value: T,
		options: T[],
		failures: IValidationFailure[]
	): value is T {
		if (Is.empty(value) || !Is.stringValue(value)) {
			failures.push({
				property,
				reason: "validation.notEmpty",
				properties: {
					value
				}
			});
			return false;
		}

		const is = Is.array<T>(options) && options.includes(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.notRecognised",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property a Uint8Array.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a Uint8Array.
	 */
	public static uint8Array(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is Uint8Array {
		const is = Is.uint8Array(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beByteArray",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Is the property valid JSON.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is valid JSON.
	 */
	public static json(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		try {
			if (Is.string(value)) {
				JSON.parse(value);
				return true;
			}
		} catch {
			failures.push({
				property,
				reason: "validation.beJSON",
				properties: {
					value
				}
			});
		}
		return false;
	}

	/**
	 * Is the property a string in e-mail format.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is a valid looking e-mail.
	 */
	public static email(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Is.email(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beEmail",
				properties: {
					value
				}
			});
		}
		return is;
	}

	/**
	 * Throw the validation failures as a ValidationError.
	 * @param source The source of the error.
	 * @param objectName The object that was being validated.
	 * @param failures The validation failures.
	 * @throws ValidationError From the converted failures.
	 */
	public static asValidationError(
		source: string,
		objectName: string,
		failures: IValidationFailure[]
	): void {
		if (Is.arrayValue<IValidationFailure>(failures)) {
			throw new ValidationError(source, objectName, failures);
		}
	}

	/**
	 * Append failures to the parent for a child object.
	 * @param failures The validation failures.
	 * @param childFailures The validation failures for the child.
	 * @param childName The name of the child object.
	 */
	public static appendChildFailures(
		failures: IValidationFailure[],
		childFailures: IValidationFailure[],
		childName?: string
	): void {
		if (Is.stringValue(childName)) {
			for (const childValidationFailure of childFailures) {
				failures.push({
					property: `${childName}.${childValidationFailure.property}`,
					reason: childValidationFailure.reason,
					properties: childValidationFailure.properties
				});
			}
		} else {
			for (const childValidationFailure of childFailures) {
				failures.push(childValidationFailure);
			}
		}
	}

	/**
	 * Map a list of failures to their properties.
	 * @param failures The validation failures.
	 * @returns The failures mapped to their properties.
	 */
	public static toPropertyMap(failures: IValidationFailure[]): {
		[id: string]: string;
	} {
		const validationErrors: { [id: string]: string } = {};

		for (const validationFailure of failures) {
			if (!validationErrors[validationFailure.property]?.includes(validationFailure.reason)) {
				if (!validationErrors[validationFailure.property]) {
					validationErrors[validationFailure.property] = "";
				} else {
					validationErrors[validationFailure.property] += "\n";
				}
				validationErrors[validationFailure.property] += validationFailure.reason;
			}
		}

		return validationErrors;
	}
}
