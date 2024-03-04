// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Model to describe serialized error.
 */
export interface IError {
	/**
	 * The name for the error.
	 */
	name: string;

	/**
	 * The message for the error.
	 */
	message: string;

	/**
	 * The source of the error.
	 */
	source?: string;

	/**
	 * Any additional information for the error.
	 */
	properties?: { [id: string]: unknown };

	/**
	 * The stack trace for the error.
	 */
	stack?: string;

	/**
	 * The inner error if there was one.
	 */
	inner?: IError;
}
