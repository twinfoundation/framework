// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { HttpStatusCode } from "../models/httpStatusCode";

/**
 * Class to represent errors from fetch.
 */
export class FetchError extends BaseError {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<FetchError>();

	/**
	 * Create a new instance of FetchError.
	 * @param source The source of the error.
	 * @param message The message as a code.
	 * @param httpStatus The http status code.
	 * @param properties Any additional information for the error.
	 * @param inner The inner error if we have wrapped another error.
	 */
	constructor(
		source: string,
		message: string,
		httpStatus: HttpStatusCode,
		properties?: {
			[id: string]: unknown;
		},
		inner?: unknown
	) {
		super(
			FetchError.CLASS_NAME,
			source,
			message,
			{
				httpStatus,
				...properties
			},
			inner
		);
	}
}
