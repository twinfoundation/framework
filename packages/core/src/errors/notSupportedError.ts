// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { BaseError } from "./baseError";

/**
 * Class to handle errors when a feature is unsupported.
 */
export class NotSupportedError extends BaseError {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<NotSupportedError>();

	/**
	 * Create a new instance of NotSupportedError.
	 * @param source The source of the error.
	 * @param message The message as a code.
	 * @param inner The inner error if we have wrapped another error.
	 */
	constructor(source: string, message: string, inner?: unknown) {
		super(NotSupportedError.CLASS_NAME, source, message, undefined, inner);
	}
}
