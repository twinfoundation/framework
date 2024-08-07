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
	 * The reason the validation failed as an i18 resource error.
	 */
	reason: string;

	/**
	 * The optional human readable name for the field as an i18 resource.
	 */
	fieldName?: string;

	/**
	 * Additional properties for the validation failure.
	 */
	properties?: { [id: string]: unknown };
}
