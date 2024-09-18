// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { BaseError } from "./baseError";
import type { IValidationFailure } from "../models/IValidationFailure";

/**
 * Class to handle errors which are triggered by entity validation.
 */
export class ValidationError extends BaseError {
	/**
	 * Runtime name for the class.s
	 */
	public static readonly CLASS_NAME: string = nameof<ValidationError>();

	/**
	 * Create a new instance of ValidationError.
	 * @param source The source of the error.
	 * @param validationObject The object that failed validation.
	 * @param validationFailures The validation failures.
	 */
	constructor(source: string, validationObject: string, validationFailures: IValidationFailure[]) {
		super(ValidationError.CLASS_NAME, source, "common.validation", {
			validationObject,
			validationFailures
		});
	}
}
