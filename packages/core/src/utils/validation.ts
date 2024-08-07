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
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a empty.
	 */
	public static empty(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is undefined | null {
		const is = Is.empty(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beEmpty",
				fieldName: fieldNameResource ?? "validation.defaultFieldName",
				properties: { value }
			});
		}
		return is;
	}

	/**
	 * Is the property is not null or undefined.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a not empty.
	 */
	public static notEmpty(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): boolean {
		const is = Is.notEmpty(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beNotEmpty",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property a string.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @param options Additional options for the validation.
	 * @param options.minLength The minimum length of the string.
	 * @param options.maxLength The maximum length of the string.
	 * @returns True if the value is a valid string.
	 */
	public static string(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string,
		options?: {
			minLength?: number;
			maxLength?: number;
		}
	): value is string {
		const is = Is.string(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beText",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		} else {
			const minLength = options?.minLength;
			const maxLength = options?.maxLength;
			const minLimitDefined = Is.integer(minLength);
			const maxLimitDefined = Is.integer(maxLength);
			const belowMin = minLimitDefined && value.length < minLength;
			const aboveMax = maxLimitDefined && value.length > maxLength;

			if (minLimitDefined && maxLimitDefined && (belowMin || aboveMax)) {
				failures.push({
					property,
					reason: "validation.beTextMinMax",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						minLength,
						maxLength
					}
				});
			} else if (minLimitDefined && belowMin) {
				failures.push({
					property,
					reason: "validation.beTextMin",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						minLength
					}
				});
			} else if (maxLimitDefined && aboveMax) {
				failures.push({
					property,
					reason: "validation.beTextMax",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						maxLength
					}
				});
			}
		}
		return failures.length === 0;
	}

	/**
	 * Is the property a string with a value.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @param options Additional options for the validation.
	 * @param options.minLength The minimum length of the string.
	 * @param options.maxLength The maximum length of the string.
	 * @returns True if the value is a valid string.
	 */
	public static stringValue(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string,
		options?: {
			minLength?: number;
			maxLength?: number;
		}
	): value is string {
		const is = Is.stringValue(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beTextValue",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		} else {
			const minLength = options?.minLength;
			const maxLength = options?.maxLength;
			const minLimitDefined = Is.integer(minLength);
			const maxLimitDefined = Is.integer(maxLength);
			const belowMin = minLimitDefined && value.length < minLength;
			const aboveMax = maxLimitDefined && value.length > maxLength;

			if (minLimitDefined && maxLimitDefined && (belowMin || aboveMax)) {
				failures.push({
					property,
					reason: "validation.beTextMinMax",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						minLength,
						maxLength
					}
				});
			} else if (minLimitDefined && belowMin) {
				failures.push({
					property,
					reason: "validation.beTextMin",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						minLength
					}
				});
			} else if (maxLimitDefined && aboveMax) {
				failures.push({
					property,
					reason: "validation.beTextMax",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						maxLength
					}
				});
			}
		}
		return failures.length === 0;
	}

	/**
	 * Is the property a number.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @param options Additional options for the validation.
	 * @param options.minValue The minimum value of the number.
	 * @param options.maxValue The maximum value of the number.
	 * @returns True if the value is a valid number.
	 */
	public static number(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string,
		options?: {
			minValue?: number;
			maxValue?: number;
		}
	): value is number {
		const is = Is.number(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beNumber",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		} else {
			const minValue = options?.minValue;
			const maxValue = options?.maxValue;
			const minLimitDefined = Is.number(minValue);
			const maxLimitDefined = Is.number(maxValue);
			const belowMin = minLimitDefined && value < minValue;
			const aboveMax = maxLimitDefined && value > maxValue;

			if (minLimitDefined && maxLimitDefined && (belowMin || aboveMax)) {
				failures.push({
					property,
					reason: "validation.beNumberMinMax",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						minValue,
						maxValue
					}
				});
			} else if (minLimitDefined && belowMin) {
				failures.push({
					property,
					reason: "validation.beNumberMin",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						minValue
					}
				});
			} else if (maxLimitDefined && aboveMax) {
				failures.push({
					property,
					reason: "validation.beNumberMax",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						maxValue
					}
				});
			}
		}
		return failures.length === 0;
	}

	/**
	 * Is the property an integer.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @param options Additional options for the validation.
	 * @param options.minValue The minimum value of the integer.
	 * @param options.maxValue The maximum value of the integer.
	 * @returns True if the value is a valid integer.
	 */
	public static integer(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string,
		options?: {
			minValue?: number;
			maxValue?: number;
		}
	): value is number {
		const is = Is.integer(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beWholeNumber",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		} else {
			const minValue = options?.minValue;
			const maxValue = options?.maxValue;
			const minLimitDefined = Is.integer(minValue);
			const maxLimitDefined = Is.integer(maxValue);
			const belowMin = minLimitDefined && value < minValue;
			const aboveMax = maxLimitDefined && value > maxValue;

			if (minLimitDefined && maxLimitDefined && (belowMin || aboveMax)) {
				failures.push({
					property,
					reason: "validation.beWholeNumberMinMax",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						minValue,
						maxValue
					}
				});
			} else if (minLimitDefined && belowMin) {
				failures.push({
					property,
					reason: "validation.beWholeNumberMin",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						minValue
					}
				});
			} else if (maxLimitDefined && aboveMax) {
				failures.push({
					property,
					reason: "validation.beWholeNumberMax",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						maxValue
					}
				});
			}
		}
		return failures.length === 0;
	}

	/**
	 * Is the property a bigint.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @param options Additional options for the validation.
	 * @param options.minValue The minimum value of the bigint.
	 * @param options.maxValue The maximum value of the bigint.
	 * @returns True if the value is a valid bigint.
	 */
	public static bigint(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string,
		options?: {
			minValue?: bigint;
			maxValue?: bigint;
		}
	): value is bigint {
		const is = Is.bigint(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beBigInteger",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		} else {
			const minValue = options?.minValue;
			const maxValue = options?.maxValue;
			const minLimitDefined = Is.bigint(minValue);
			const maxLimitDefined = Is.bigint(maxValue);
			const belowMin = minLimitDefined && value < minValue;
			const aboveMax = maxLimitDefined && value > maxValue;

			if (minLimitDefined && maxLimitDefined && (belowMin || aboveMax)) {
				failures.push({
					property,
					reason: "validation.beBigIntegerMinMax",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						minValue,
						maxValue
					}
				});
			} else if (minLimitDefined && belowMin) {
				failures.push({
					property,
					reason: "validation.beBigIntegerMin",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						minValue
					}
				});
			} else if (maxLimitDefined && aboveMax) {
				failures.push({
					property,
					reason: "validation.beBigIntegerMax",
					properties: {
						fieldName: fieldNameResource ?? "validation.defaultFieldName",
						value,
						maxValue
					}
				});
			}
		}
		return failures.length === 0;
	}

	/**
	 * Is the property a boolean.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a boolean.
	 */
	public static boolean(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is boolean {
		const is = Is.boolean(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beBoolean",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property a date.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a date.
	 */
	public static date(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is Date {
		if (Is.dateEmpty(value)) {
			failures.push({
				property,
				reason: "validation.beDate",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
			return false;
		}

		const is = Is.date(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beDate",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property a date in ISO 8601 format.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a date.
	 */
	public static dateString(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is string {
		if (!Is.stringValue(value)) {
			failures.push({
				property,
				reason: "validation.beDate",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
			return false;
		}

		const is = Is.dateString(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beDate",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property a date/time in ISO 8601 format.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a date/time.
	 */
	public static dateTimeString(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is string {
		if (!Is.stringValue(value)) {
			failures.push({
				property,
				reason: "validation.beDateTime",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
			return false;
		}

		const is = Is.dateTimeString(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beDateTime",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property a time in ISO 8601 format.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a time.
	 */
	public static timeString(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is string {
		if (!Is.stringValue(value)) {
			failures.push({
				property,
				reason: "validation.beTime",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
			return false;
		}

		const is = Is.timeString(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beTime",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property a timestamp in milliseconds.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a timestamp in milliseconds.
	 */
	public static timestampMilliseconds(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is number {
		if (!Is.integer(value)) {
			failures.push({
				property,
				reason: "validation.beTimestampMilliseconds",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
			return false;
		}

		const is = Is.timestampMilliseconds(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beTimestampMilliseconds",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property a timestamp in seconds.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a timestamp in seconds.
	 */
	public static timestampSeconds(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is number {
		if (!Is.integer(value)) {
			failures.push({
				property,
				reason: "validation.beTimestampSeconds",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
			return false;
		}

		const is = Is.timestampSeconds(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beTimestampSeconds",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property an object.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a object.
	 */
	public static object<T = { [id: string]: unknown }>(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is T {
		const is = Is.object<T>(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beObject",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property an array.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is an array.
	 */
	public static array<T>(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is T[] {
		const is = Is.array<T>(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beArray",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property an array with at least one item.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is an array with at least one element.
	 */
	public static arrayValue<T>(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is T[] {
		const is = Is.array(value) && value.length > 0;
		if (!is) {
			failures.push({
				property,
				reason: "validation.beArrayValue",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
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
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is one of the items in the options.
	 */
	public static arrayOneOf<T>(
		property: string,
		value: T,
		options: T[],
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is T {
		if (Is.empty(value)) {
			failures.push({
				property,
				reason: "validation.beIncluded",
				properties: {
					fieldName: fieldNameResource ?? "validation.defaultFieldName",
					value,
					options
				}
			});
			return false;
		}

		const is = Is.arrayOneOf(value, options);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beIncluded",
				properties: {
					fieldName: fieldNameResource ?? "validation.defaultFieldName",
					value,
					options
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
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a Uint8Array.
	 */
	public static uint8Array(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is Uint8Array {
		const is = Is.uint8Array(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beByteArray",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property valid JSON.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is valid JSON.
	 */
	public static json(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is string {
		const is = Is.json(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beJSON",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
			});
		}
		return is;
	}

	/**
	 * Is the property a string in e-mail format.
	 * @param property The name of the property.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param fieldNameResource Optional i18n resource of the field name to display in the message.
	 * @returns True if the value is a valid looking e-mail.
	 */
	public static email(
		property: string,
		value: unknown,
		failures: IValidationFailure[],
		fieldNameResource?: string
	): value is string {
		const is = Is.email(value);
		if (!is) {
			failures.push({
				property,
				reason: "validation.beEmail",
				properties: { fieldName: fieldNameResource ?? "validation.defaultFieldName", value }
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
	 * Map a list of failures to their properties in a map.
	 * @param failures The validation failures to combine into the map for the properties.
	 * @param propertyMap The map to add the failures to.
	 * @param clearMap Should the map be cleared before adding the failures.
	 */
	public static toPropertyMap(
		failures: IValidationFailure[],
		propertyMap: { [property: string]: IValidationFailure[] },
		clearMap: boolean = true
	): void {
		if (clearMap) {
			for (const prop in propertyMap) {
				delete propertyMap[prop];
			}
		}

		for (const validationFailure of failures) {
			if (Is.array(propertyMap[validationFailure.property])) {
				propertyMap[validationFailure.property].push(validationFailure);
			} else {
				propertyMap[validationFailure.property] = [validationFailure];
			}
		}
	}
}
