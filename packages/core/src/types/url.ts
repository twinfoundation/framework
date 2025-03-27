// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { GuardError } from "../errors/guardError";
import type { IUrlParts } from "../models/IUrlParts";
import type { IValidationFailure } from "../models/IValidationFailure";
import { Coerce } from "../utils/coerce";
import { Guards } from "../utils/guards";
import { Is } from "../utils/is";

/**
 * Class to help with urls.
 */
export class Url {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Url>();

	/**
	 * The internal representation of the url.
	 * @internal
	 */
	private _urlParts: IUrlParts;

	/**
	 * Create a new instance of Url.
	 * @param url The url string.
	 */
	constructor(url: string) {
		Guards.stringValue(Url._CLASS_NAME, nameof(url), url);

		try {
			const u = new URL(url);
			this._urlParts = Url.fromURLToParts(u);
		} catch {
			throw new GuardError(Url._CLASS_NAME, "guard.url", "url", url);
		}
	}

	/**
	 * Try and parse a string into the url parts.
	 * @param url The url to parse.
	 * @returns The formatted url or undefined if the value is not a url.
	 */
	public static tryParseExact(url: unknown): Url | undefined {
		if (!Is.stringValue(url)) {
			return;
		}

		try {
			// By constructing a new standard URL class this will
			// validate the format
			const u = new URL(url);
			return Url.fromParts(Url.fromURLToParts(u));
		} catch {}
	}

	/**
	 * Parse a string into the url parts.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The url to parse.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static guard(source: string, property: string, value: unknown): asserts value is string {
		Guards.stringValue(source, property, value);

		const result = Url.tryParseExact(value);

		if (!result) {
			throw new GuardError(source, "guard.url", property, value);
		}
	}

	/**
	 * Validate a string as a Url.
	 * @param property Throw an exception if the url property is invalid.
	 * @param value The url to parse.
	 * @param failures The list of failures to add to.
	 * @returns The formatted url.
	 */
	public static validate(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is Url {
		if (!Is.stringValue(value)) {
			failures.push({
				property,
				reason: "validation.notEmpty"
			});

			return false;
		}

		const result = Url.tryParseExact(value);

		if (Is.undefined(result)) {
			failures.push({
				property,
				reason: "validation.beUrl"
			});

			return false;
		}

		return true;
	}

	/**
	 * Construct a url from a URL.
	 * @param url The url to construct from.
	 * @returns The formatted url.
	 */
	public static fromURLToParts(url: URL): IUrlParts {
		return {
			schema: url.protocol.replace(/:$/, ""),
			host: url.hostname,
			port: Coerce.number(url.port),
			path: url.pathname,
			params: Is.stringValue(url.search) ? url.search.replace(/^\?/, "") : undefined,
			hash: Is.stringValue(url.hash) ? url.hash.replace(/^#/, "") : undefined
		};
	}

	/**
	 * Construct a url from valid parts.
	 * @param urlParts The url to create the parts from.
	 * @returns The formatted url.
	 */
	public static fromParts(urlParts: IUrlParts): Url {
		const u = new Url("http://dummy");
		u._urlParts = urlParts;
		return u;
	}

	/**
	 * Get the parts of the url.
	 * @returns The parts of the url.
	 */
	public parts(): IUrlParts {
		return this._urlParts;
	}

	/**
	 * Convert the parts in to a full string.
	 * @returns The formatted url.
	 */
	public toString(): string {
		const parts: string[] = [this._urlParts.schema, "://", this._urlParts.host];
		if (Is.number(this._urlParts.port)) {
			parts.push(`:${this._urlParts.port}`);
		}
		if (Is.stringValue(this._urlParts.path)) {
			parts.push(this._urlParts.path);
		}
		if (Is.stringValue(this._urlParts.params)) {
			parts.push(`?${this._urlParts.params}`);
		}
		if (Is.stringValue(this._urlParts.hash)) {
			parts.push(`#${this._urlParts.hash}`);
		}
		return parts.join("");
	}
}
