// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { StringHelper } from "../helpers/stringHelper";
import type { IError } from "../models/IError";
import { Is } from "../utils/is";

/**
 * Class to handle errors.
 */
export class BaseError extends Error implements IError {
	/**
	 * The source of the error.
	 */
	public source?: string;

	/**
	 * Any additional information for the error.
	 */
	public properties?: { [id: string]: unknown };

	/**
	 * The inner error if there was one.
	 */
	public inner?: IError;

	/**
	 * Create a new instance of BaseError.
	 * @param name The name of the error.
	 * @param source The source of the error.
	 * @param message The message as a code.
	 * @param properties Any additional information for the error.
	 * @param inner The inner error if we have wrapped another error.
	 */
	constructor(
		name: string,
		source: string,
		message: string,
		properties?: { [id: string]: unknown },
		inner?: unknown
	) {
		super(message);
		this.name = name;
		this.source = source;

		// If the message is camel case but has no namespace then prefix it
		// with the source name in camel case
		if (
			Is.stringValue(source) &&
			Is.stringValue(message) &&
			!message.includes(".") &&
			StringHelper.camelCase(message) === message
		) {
			this.message = `${StringHelper.camelCase(source)}.${message}`;
		}

		this.properties = properties;
		this.inner = inner ? BaseError.fromError(inner).toJsonObject() : undefined;
	}

	/**
	 * Construct an error from an existing one.
	 * @param err The existing error.
	 * @returns The new instance.
	 */
	public static fromError(err: unknown): BaseError {
		let name = "Base";
		let message;
		let source;
		let properties;
		let inner;
		let stack;

		if (Is.object<BaseError>(err)) {
			if (Is.stringValue(err.name)) {
				name = err.name;
			}
			if (Is.stringValue(err.source)) {
				source = err.source;
			}
			if (Is.stringValue(err.message)) {
				message = err.message;
			}
			if (Is.notEmpty(err.properties)) {
				properties = err.properties;
			}
			if (Is.notEmpty(err.inner)) {
				inner = err.inner;
			}
			if (Is.notEmpty(err.stack)) {
				stack = err.stack;
			}
		} else if (Is.object<{ error: string }>(err) && Is.stringValue(err.error)) {
			message = err.error;
		} else if (Is.stringValue(err)) {
			message = err;
		} else {
			message = JSON.stringify(err);
		}

		const baseError = new BaseError(name, source ?? "", message ?? "", properties, inner);

		baseError.stack = stack;

		return baseError;
	}

	/**
	 * Flatten an error tree.
	 * @param err The starting error.
	 * @returns The list of all internal errors.
	 */
	public static flatten(err: unknown): IError[] {
		const flattened: IError[] = [];

		let e: IError | undefined = BaseError.fromError(err).toJsonObject();

		while (e) {
			const inner: IError | undefined = e.inner;
			e.inner = undefined;
			flattened.push(e);
			e = inner;
		}

		return flattened;
	}

	/**
	 * Expand an error tree.
	 * @param errors The list of errors to expand.
	 * @returns The first level error.
	 */
	public static expand(errors: IError[] | undefined): IError | undefined {
		let first: IError | undefined;

		if (Is.arrayValue(errors)) {
			first = errors[0];
			let current = first;
			for (let i = 1; i < errors.length; i++) {
				current.inner = errors[i];
				current = current.inner;
			}
		}

		return first;
	}

	/**
	 * Test to see if the error has the specified error name.
	 * @param error The error to test.
	 * @param name The name to check for.
	 * @returns True if the error has the name.
	 */
	public static isErrorName(error: unknown, name: string | RegExp): error is BaseError {
		return (
			Is.object<{ name: string }>(error) &&
			(Is.string(name) ? error.name === name : name.test(error.name))
		);
	}

	/**
	 * Test to see if the error has the specified error message.
	 * @param error The error to test.
	 * @param message The message to check for.
	 * @returns True if the error has the name.
	 */
	public static isErrorMessage(error: unknown, message: string | RegExp): error is BaseError {
		return (
			Is.object<{ message: string }>(error) &&
			(Is.string(message) ? error.message === message : message.test(error.message))
		);
	}

	/**
	 * Test to see if the error has the specified error code.
	 * @param error The error to test.
	 * @param code The code to check for.
	 * @returns True if the error has the code.
	 */
	public static isErrorCode(error: unknown, code: string | RegExp): boolean {
		return (
			Is.object<{ code: string }>(error) &&
			(Is.string(code) ? error.code === code : code.test(error.code))
		);
	}

	/**
	 * Test to see if any of the errors or children have the given error name.
	 * @param error The error to test.
	 * @param name The name to check for.
	 * @returns True if the error has the name.
	 */
	public static someErrorName(error: unknown, name: string | RegExp): error is BaseError {
		return BaseError.flatten(error).some(e => BaseError.isErrorName(e, name));
	}

	/**
	 * Test to see if any of the errors or children have the given error message.
	 * @param error The error to test.
	 * @param message The message to check for.
	 * @returns True if the error has the name.
	 */
	public static someErrorMessage(error: unknown, message: string | RegExp): error is BaseError {
		return BaseError.flatten(error).some(e => BaseError.isErrorMessage(e, message));
	}

	/**
	 * Test to see if any of the errors or children are from a specific class.
	 * @param error The error to test.
	 * @param cls The class to check for.
	 * @returns True if the error has the specific class.
	 */
	public static someErrorClass(error: unknown, cls: string): error is BaseError {
		const errorClass = StringHelper.camelCase(cls);
		const regExp = new RegExp(`^${errorClass}\\.`);
		return BaseError.flatten(error).some(e => BaseError.isErrorMessage(e, regExp));
	}

	/**
	 * Test to see if any of the errors or children have the given error code.
	 * @param error The error to test.
	 * @param code The code to check for.
	 * @returns True if the error has the name.
	 */
	public static someErrorCode(error: unknown, code: string | RegExp): error is BaseError {
		return BaseError.flatten(error).some(e => BaseError.isErrorCode(e, code));
	}

	/**
	 * Serialize the error to the error model.
	 * @returns The error model.
	 */
	public toJsonObject(): IError {
		const err: Partial<IError> = {};
		if (Is.stringValue(this.name)) {
			err.name = this.name;
		}
		if (Is.stringValue(this.source)) {
			err.source = this.source;
		}
		if (Is.stringValue(this.message)) {
			err.message = this.message;
		}
		if (Is.object(this.properties)) {
			err.properties = this.properties;
		}
		if (Is.stringValue(this.stack)) {
			err.stack = this.stack;
		}
		if (Is.notEmpty(this.inner)) {
			err.inner = BaseError.fromError(this.inner).toJsonObject();
		}
		return err as IError;
	}
}
