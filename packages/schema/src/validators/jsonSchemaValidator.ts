// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import Ajv, { type AnySchema } from "ajv";
import addFormats from "ajv-formats";
import type { ISchemaValidationError } from "../models/ISchemaValidationError";
import type { ISchemaValidationResult } from "../models/ISchemaValidationResult";
import type { ISchemaValidator } from "../models/ISchemaValidator";

/**
 * A validator for JSON schemas.
 */
export class JsonSchemaValidator implements ISchemaValidator {
	/**
	 * The schemas we are operating on.
	 * @internal
	 */
	private readonly _schemas: { [schemaName: string]: AnySchema | string };

	/**
	 * The validator.
	 * @internal
	 */
	private readonly _validator: Ajv;

	/**
	 * The constructor.
	 * @param schemas The schemas to be loaded.
	 */
	constructor(schemas: { [schemaName: string]: AnySchema | string }) {
		this._validator = new Ajv();
		addFormats(this._validator);
		this._schemas = schemas;
	}

	/**
	 * Validates data against the Schema passed as parameter.
	 * @param schemaName The name of the Schema.
	 * @param data The data to be validated.
	 * @returns True if validated false otherwise.
	 */
	public async validate(schemaName: string, data: unknown): Promise<ISchemaValidationResult> {
		const output: ISchemaValidationResult = { result: false };
		output.result = this._validator.validate(this._schemas[schemaName], data) as boolean;
		if (!output.result) {
			output.error = this._validator.errors as unknown as ISchemaValidationError;
		}

		return output;
	}
}
