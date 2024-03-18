// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { ISchemaValidationError } from "../models/ISchemaValidationError";
import type { ISchemaValidationResult } from "../models/ISchemaValidationResult";
import type { ISchemaValidator } from "../models/ISchemaValidator";

/**
 * A service for validating Schemas. Takes the schemas from the configuration.
 */
export class SchemaValidationService implements ISchemaValidator {
	/** The schemas we are operating on.
	 *  @internal
	 */
	private readonly _schemas: { [schemaName: string]: object };

	/** The validator.
	 *  @internal
	 */
	private readonly _validator: Ajv;

	/**
	 * The constructor.
	 * @param schemas The schemas to be loaded (defined at configuration).
	 */
	constructor(schemas: { [schemaName: string]: object }) {
		this._validator = new Ajv();
		addFormats(this._validator);
		this._schemas = schemas;
	}

	/**
	 * Validates data against the Schema passed as parameter.
	 * @param data The data to be validated.
	 * @param schemaName The name of the Schema.
	 * @returns True if validated false otherwise.
	 */
	public async validate(data: unknown, schemaName: string): Promise<ISchemaValidationResult> {
		const output: ISchemaValidationResult = { result: false };
		output.result = this._validator.validate(this._schemas[schemaName], data) as boolean;
		if (!output.result) {
			output.error = this._validator.errors as unknown as ISchemaValidationError;
		}

		return output;
	}
}
