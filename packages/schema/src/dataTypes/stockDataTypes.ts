// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, Url, Urn, Validation, type IValidationFailure } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { DataTypeHandlerFactory } from "../factories/dataTypeHandlerFactory";
import type { IProperty } from "../models/IProperty";

/**
 * Handle all the stock data types.
 */
export class StockDataTypes {
	/**
	 * Represents a urn.
	 */
	public static TYPE_URN = "URN";

	/**
	 * Represents a timestamp as an integer, milliseconds since 1 Jan 1970.
	 */
	public static TYPE_TIMESTAMP_MILLISECONDS = "TimestampMilliseconds";

	/**
	 * Represents a timestamp as an integer, seconds since 1 Jan 1970.
	 */
	public static TYPE_TIMESTAMP_SECONDS = "TimestampSeconds";

	/**
	 * Represents a property.
	 */
	public static TYPE_PROPERTY = "Property";

	/**
	 * Represents a property list.
	 */
	public static TYPE_PROPERTY_LIST = "PropertyList";

	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		DataTypeHandlerFactory.register(StockDataTypes.TYPE_URN, () => ({
			isInternal: false,
			type: StockDataTypes.TYPE_URN,
			defaultValue: "",
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Urn.validate(propertyName, value, failures)
		}));
		DataTypeHandlerFactory.register(StockDataTypes.TYPE_TIMESTAMP_MILLISECONDS, () => ({
			isInternal: false,
			type: StockDataTypes.TYPE_TIMESTAMP_MILLISECONDS,
			defaultValue: Date.now(),
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Validation.timestampMilliseconds(propertyName, value, failures)
		}));
		DataTypeHandlerFactory.register(StockDataTypes.TYPE_TIMESTAMP_SECONDS, () => ({
			isInternal: false,
			type: StockDataTypes.TYPE_TIMESTAMP_SECONDS,
			defaultValue: Math.floor(Date.now() / 1000),
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				Validation.timestampSeconds(propertyName, value, failures)
		}));
		DataTypeHandlerFactory.register(StockDataTypes.TYPE_PROPERTY_LIST, () => ({
			isInternal: true,
			type: StockDataTypes.TYPE_PROPERTY_LIST,
			defaultValue: {},
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				StockDataTypes.validateIPropertyList(
					propertyName,
					value as IProperty[],
					failures,
					container,
					previousValue as IProperty[]
				)
		}));
		DataTypeHandlerFactory.register(StockDataTypes.TYPE_PROPERTY, () => ({
			isInternal: true,
			type: StockDataTypes.TYPE_PROPERTY,
			defaultValue: {},
			validate: (propertyName, value, failures, container, previousValue): boolean =>
				StockDataTypes.validateIProperty(
					propertyName,
					value as IProperty,
					failures,
					container,
					previousValue as IProperty
				)
		}));
	}

	/**
	 * Validator for an IProperty list.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param container The object which contains this one.
	 * @param previousValue The previous value of the object.
	 * @returns True if the value is a valid property list.
	 */
	public static validateIPropertyList(
		propertyName: string,
		value: IProperty[],
		failures: IValidationFailure[],
		container?: unknown,
		previousValue?: IProperty[]
	): boolean {
		if (Is.empty(value)) {
			return true;
		}

		const is = Is.array<IProperty>(value);

		if (is) {
			const keys: string[] = [];
			for (let i = 0; i < value.length; i++) {
				if (keys.includes(value[i].key)) {
					failures.push({
						property: `${propertyName}[${i}].key`,
						reason: "validation.properties.keyAlreadyExists"
					});
				}
				keys.push(value[i].key);

				StockDataTypes.validateIProperty(
					`${propertyName}[${i}]`,
					value[i],
					failures,
					container,
					Is.array<IProperty>(previousValue) ? previousValue[i] : undefined
				);
			}
		}

		return is;
	}

	/**
	 * Validator for an IProperty.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param container The object which contains this one.
	 * @param previousValue The previous value of the object.
	 * @returns True if the value is a valid property.
	 */
	public static validateIProperty(
		propertyName: string,
		value: IProperty,
		failures: IValidationFailure[],
		container?: unknown,
		previousValue?: IProperty
	): boolean {
		const is = Validation.object<IProperty>(propertyName, value, failures);

		if (is) {
			Validation.stringValue(nameof(value.key, propertyName), value.key, failures);
			const isValidTypeUrl = Url.validate(nameof(value.type, propertyName), value.type, failures);
			Validation.notEmpty(nameof(value.value, propertyName), value.value, failures);

			if (isValidTypeUrl) {
				const dataTypeHandler = DataTypeHandlerFactory.get(value.type);
				if (dataTypeHandler?.validate) {
					dataTypeHandler.validate(propertyName, value.value, failures, container, previousValue);
				}
			}
		}
		return is;
	}
}
