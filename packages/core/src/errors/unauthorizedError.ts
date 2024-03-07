// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@gtsc/nameof";
import { BaseError } from "./baseError";

/**
 * Class to handle errors which are triggered by access not being unauthorized.
 */
export class UnauthorizedError extends BaseError {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<UnauthorizedError>();

	/**
	 * Create a new instance of UnauthorizedError.
	 * @param source The source of the error.
	 * @param message The message as a code.
	 * @param inner The inner error if we have wrapped another error.
	 */
	constructor(source: string, message: string, inner?: unknown) {
		super(UnauthorizedError.CLASS_NAME, source, message, undefined, inner);
	}
}
