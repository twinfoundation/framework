// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IService } from "@gtsc/services";
import type { ISchemaValidationResult } from "./ISchemaValidationResult";

/**
 * Schema Validator interface.
 */
export interface ISchemaValidator extends IService {
	/**
	 * Validates data against a schema.
	 * @param data Data to be validated.
	 * @param schemaName Schema.
	 * @returns The validation result.
	 */
	validate(data: unknown, schemaName: string): Promise<ISchemaValidationResult>;
}
