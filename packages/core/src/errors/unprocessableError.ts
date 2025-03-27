// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { BaseError } from "./baseError";

/**
 * Class to handle errors when some data can not be processed.
 */
export class UnprocessableError extends BaseError {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<UnprocessableError>();

	/**
	 * Create a new instance of UnprocessableError.
	 * @param source The source of the error.
	 * @param message The message as a code.
	 * @param properties Any additional information for the error.
	 * @param inner The inner error if we have wrapped another error.
	 */
	constructor(
		source: string,
		message: string,
		properties?: { [id: string]: unknown },
		inner?: unknown
	) {
		super(UnprocessableError.CLASS_NAME, source, message, properties, inner);
	}
}
