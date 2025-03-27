// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { BaseError } from "./baseError";

/**
 * Class to handle errors which are triggered by data already existing.
 */
export class AlreadyExistsError extends BaseError {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<AlreadyExistsError>();

	/**
	 * Create a new instance of AlreadyExistsError.
	 * @param source The source of the error.
	 * @param message The message as a code.
	 * @param existingId The id for the item.
	 * @param inner The inner error if we have wrapped another error.
	 */
	constructor(source: string, message: string, existingId?: string, inner?: unknown) {
		super(AlreadyExistsError.CLASS_NAME, source, message, { existingId }, inner);
	}
}
