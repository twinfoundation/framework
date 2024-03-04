// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * Interface describing the reason a validation failed.
 */
export interface IValidationFailure {
	/**
	 * The property that failed validation.
	 */
	property: string;

	/**
	 * The reason the validation failed.
	 */
	reason: string;

	/**
	 * Additional properties for the validation failure.
	 */
	properties?: { [id: string]: unknown };
}
