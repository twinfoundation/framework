// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { JSONSchema7 } from "json-schema";
import type { ISchemaValidationError } from "../models/ISchemaValidationError";
import type { ISchemaValidationResult } from "../models/ISchemaValidationResult";

/**
 * A validator for JSON schemas.
 */
export class JsonSchemaValidator {
	/**
	 * Validates data against the schema.
	 * @param schema The schema to validate the data with.
	 * @param data The data to be validated.
	 * @returns Result containing errors if there are any.
	 */
	public static async validate<T = unknown>(
		schema: JSONSchema7,
		data: T
	): Promise<ISchemaValidationResult> {
		const validator = new Ajv();
		addFormats(validator);

		const output: ISchemaValidationResult = {
			result: validator.validate(schema, data) as boolean
		};
		if (!output.result) {
			output.error = validator.errors as ISchemaValidationError;
		}

		return output;
	}
}
