// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { BaseError } from "./baseError";

/**
 * Class to handle errors.
 */
export class NotImplementedError extends BaseError {
	/**
	 * Runtime name for the class.
	 */
	public static readonly CLASS_NAME: string = nameof<NotImplementedError>();

	/**
	 * Create a new instance of NotImplementedError.
	 * @param source The source of the error.
	 * @param method The method for the error.
	 */
	constructor(source: string, method: string) {
		super(NotImplementedError.CLASS_NAME, source, "common.notImplementedMethod", {
			method
		});
	}
}
