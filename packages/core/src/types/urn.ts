// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@gtsc/nameof";
import { GuardError } from "../errors/guardError";
import type { IValidationFailure } from "../models/IValidationFailure";
import { Converter } from "../utils/converter";
import { Guards } from "../utils/guards";
import { Is } from "../utils/is";
import { RandomHelper } from "../utils/randomHelper";

/**
 * Class to help with urns.
 */
export class Urn {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<Urn>();

	/**
	 * The identifier for the namespace.
	 * @internal
	 */
	private readonly _namespaceIdentifier: string;

	/**
	 * The specific part of the namespace.
	 * @internal
	 */
	private readonly _namespaceSpecific: string;

	/**
	 * Create a new instance of Urn.
	 * @param namespaceIdentifier The identifier for the namespace.
	 * @param namespaceSpecific The specific part of the namespace.
	 */
	constructor(namespaceIdentifier: string, namespaceSpecific: string) {
		Guards.stringValue(Urn._CLASS_NAME, nameof(namespaceIdentifier), namespaceIdentifier);
		Guards.stringValue(Urn._CLASS_NAME, nameof(namespaceSpecific), namespaceSpecific);
		// Strip leading and trailing colons
		this._namespaceIdentifier = this.stripColons(namespaceIdentifier);
		this._namespaceSpecific = this.stripColons(namespaceSpecific);
	}

	/**
	 * Generate a random identifier with 32 byte id.
	 * @param namespace The prefix for the urn.
	 * @returns A new Id in URN format.
	 */
	public static generateRandom(namespace: string): Urn {
		return new Urn(namespace, Converter.bytesToHex(RandomHelper.generate(32)));
	}

	/**
	 * Does the provided urn match the namespace.
	 * @param urn The urn to check.
	 * @param namespace The namespace to match.
	 * @returns True if the namespace matches.
	 */
	public static hasNamespace(urn: string, namespace: string): boolean {
		if (!Is.stringValue(urn)) {
			return false;
		}
		if (urn.startsWith("urn:")) {
			urn = urn.slice(4);
		}

		if (urn.length === namespace.length) {
			return urn === namespace;
		}

		return urn.startsWith(`${namespace}:`);
	}

	/**
	 * Try and parse a string into the urn parts it must start with urn:.
	 * @param urn The urn to parse.
	 * @returns The formatted urn or undefined if the value is not a urn.
	 */
	public static tryParseExact(urn: unknown): Urn | undefined {
		if (!Is.stringValue(urn)) {
			return;
		}

		const parts = urn.split(":");

		if (parts.length < 3) {
			return;
		}

		if (parts[0] !== "urn") {
			return;
		}

		if (!/[\da-z][\da-z-]{0,31}/.test(parts[1])) {
			return;
		}

		for (let i = 2; i < parts.length; i++) {
			if (!/[\d!#$%'()*+,./:;=?@_a-z-]+/.test(parts[i])) {
				return;
			}
		}

		return new Urn(parts[1], parts.slice(2).join(":"));
	}

	/**
	 * Construct a urn from a string that has already been validated.
	 * @param urn The urn to parse.
	 * @returns The formatted urn.
	 */
	public static fromValidString(urn: string): Urn {
		if (urn.startsWith("urn:")) {
			urn = urn.slice(4);
		}

		const parts = urn.split(":");

		return new Urn(parts[0], parts.slice(1).join(":"));
	}

	/**
	 * Add a urn: prefix if there isn't one already.
	 * @param urn The urn string to add a prefix to.
	 * @returns The urn with a prefix.
	 */
	public static addPrefix(urn: unknown): string | undefined {
		if (Is.stringValue(urn)) {
			if (urn.startsWith("urn:")) {
				return urn;
			}
			return `urn:${urn}`;
		}
	}

	/**
	 * Parse a string into the urn parts.
	 * @param source The source of the error.
	 * @param property The name of the property.
	 * @param value The urn to parse.
	 * @throws GuardError If the value does not match the assertion.
	 */
	public static guard(source: string, property: string, value: unknown): asserts value is string {
		Guards.stringValue(source, property, value);

		const result = Urn.tryParseExact(value);

		if (!result) {
			throw new GuardError(source, "guard.urn", property, value);
		}
	}

	/**
	 * Validate a string as a Urn.
	 * @param property Throw an exception if the urn property is invalid.
	 * @param value The urn to parse.
	 * @param failures The list of failures to add to.
	 * @returns The formatted urn.
	 */
	public static validate(
		property: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		if (!Is.stringValue(value)) {
			failures.push({
				property,
				reason: "validation.notEmpty"
			});

			return false;
		}

		const result = Urn.tryParseExact(value);

		if (Is.undefined(result)) {
			failures.push({
				property,
				reason: "validation.beUrn"
			});

			return false;
		}

		return true;
	}

	/**
	 * Get the namespace identifier.
	 * @returns The namespace identifier.
	 */
	public namespaceIdentifier(): string {
		return this._namespaceIdentifier;
	}

	/**
	 * Get the namespace specific.
	 * @returns The namespace specific.
	 */
	public namespaceSpecific(): string {
		return this._namespaceSpecific;
	}

	/**
	 * Convert the parts in to a full string.
	 * @param omitPrefix Omit the urn: prefix from the string.
	 * @returns The formatted urn.
	 */
	public toString(omitPrefix?: boolean): string {
		return omitPrefix
			? `${this._namespaceIdentifier}:${this._namespaceSpecific}`
			: `urn:${this._namespaceIdentifier}:${this._namespaceSpecific}`;
	}

	/**
	 * Strip the leading and trailing colons from a string.
	 * @param val The value to strip.
	 * @returns The stripped string.
	 * @internal
	 */
	private stripColons(val: string): string {
		return val.replace(/^:?(.*?):?$/, "$1");
	}
}
