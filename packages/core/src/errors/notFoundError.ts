// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@gtsc/nameof";
import { BaseError } from "./baseError";

/**
 * Class to handle errors which are triggered by data not being found.
 */
export class NotFoundError extends BaseError {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<NotFoundError>();

	/**
	 * Create a new instance of NotFoundError.
	 * @param source The source of the error.
	 * @param message The message as a code.
	 * @param notFoundId The id for the item.
	 * @param inner The inner error if we have wrapped another error.
	 */
	constructor(source: string, message: string, notFoundId?: string, inner?: unknown) {
		super(NotFoundError.CLASS_NAME, source, message, { notFoundId }, inner);
	}
}
