// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ISchemaValidationError } from "./ISchemaValidationError";

/**
 * Validation result.
 */
export interface ISchemaValidationResult {
	/**
	 * The result.
	 */
	result: boolean;

	/**
	 * The error.
	 */
	error?: ISchemaValidationError;
}
