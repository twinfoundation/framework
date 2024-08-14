// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IValidationFailure } from "@gtsc/core";

/**
 * Interface describing a type which can handle a specific data type.
 */
export interface IDataTypeHandler {
	/**
	 * Is internal data type.
	 */
	isInternal: boolean;

	/**
	 * The type for the item.
	 */
	type: string;

	/**
	 * The default value for the item.
	 */
	defaultValue: unknown;

	/**
	 * Define the types of any children.
	 */
	childTypes?: { [prop: string]: string };

	/**
	 * A method for validating the data type.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to validate.
	 * @param failures List of failures to add to.
	 * @param container The object which contains this one.
	 * @param previousValue The previous value of the object.
	 * @returns True if the item is valid.
	 */
	validate?(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[],
		container?: unknown,
		previousValue?: unknown
	): boolean;
}
