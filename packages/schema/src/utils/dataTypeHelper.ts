// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, type IValidationFailure } from "@gtsc/core";
import { JsonSchemaHelper } from "./jsonSchemaHelper";
import { DataTypeHandlerFactory } from "../factories/dataTypeHandlerFactory";

/**
 * Class to help with data types.
 */
export class DataTypeHelper {
	/**
	 * Validate a data type.
	 * @param propertyName The property name to validate.
	 * @param dataType The data type to validate.
	 * @param data The data to validate.
	 * @param validationFailures The list of validation failures to add to.
	 * @param validationMode The validation mode to use, defaults to either.
	 * @returns True if the data was valid.
	 */
	public static async validate(
		propertyName: string,
		dataType: string | undefined,
		data: unknown,
		validationFailures: IValidationFailure[],
		validationMode?: "validate" | "schema" | "either"
	): Promise<boolean> {
		if (Is.stringValue(dataType)) {
			const handler = DataTypeHandlerFactory.getIfExists(dataType);
			if (handler) {
				validationMode = validationMode ?? "either";

				// If we have a validate function use that as it is more specific
				// and will produce better error messages
				if (
					(validationMode === "validate" || validationMode === "either") &&
					Is.function(handler.validate)
				) {
					return handler.validate(propertyName, data, validationFailures);
				} else if (
					(validationMode === "schema" || validationMode === "either") &&
					Is.object(handler.schema)
				) {
					// Otherwise use the JSON schema if there is one
					const validationResult = await JsonSchemaHelper.validate(handler.schema, data);
					if (Is.arrayValue(validationResult.error)) {
						validationFailures.push({
							property: propertyName,
							reason: "validation.schema.failedValidation",
							properties: {
								value: data,
								schemaErrors: validationResult.error,
								message: validationResult.error.map(e => e.message).join(", ")
							}
						});
					}
					return validationResult.result;
				}
			}
		}
		return true;
	}
}
