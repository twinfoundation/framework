// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IValidationFailure } from "@gtsc/core";

/**
 * Interface describing a type which can handle a specific urn namespace.
 */
export interface IIdentifierHandler {
	/**
	 * The namespace for the identifier.
	 */
	namespace: string;

	/**
	 * A method for validating the identifier.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to validate.
	 * @param failures List of failures to add to.
	 * @returns True if the item is valid.
	 */
	validate(propertyName: string, value: unknown, failures: IValidationFailure[]): boolean;
}
