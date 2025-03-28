// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { GuardError } from "../errors/guardError";
import { RandomHelper } from "../helpers/randomHelper";
import type { IValidationFailure } from "../models/IValidationFailure";
import { Converter } from "../utils/converter";
import { Guards } from "../utils/guards";
import { Is } from "../utils/is";

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
	 * The specific part of the namespace.
	 * @internal
	 */
	private readonly _urnParts: string[];

	/**
	 * Create a new instance of Urn.
	 * @param namespaceIdentifier The identifier for the namespace.
	 * @param namespaceSpecific The specific part of the namespace.
	 */
	constructor(namespaceIdentifier: string, namespaceSpecific: string | string[]) {
		Guards.stringValue(Urn._CLASS_NAME, nameof(namespaceIdentifier), namespaceIdentifier);

		// Strip leading and trailing colons
		this._urnParts = [this.stripColons(namespaceIdentifier)];

		if (Is.array(namespaceSpecific)) {
			Guards.arrayValue(Urn._CLASS_NAME, nameof(namespaceSpecific), namespaceSpecific);
			this._urnParts.push(...namespaceSpecific);
		} else {
			Guards.stringValue(Urn._CLASS_NAME, nameof(namespaceSpecific), namespaceSpecific);
			this._urnParts.push(...this.stripColons(namespaceSpecific).split(":"));
		}
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
	 * Try and parse a string into the urn parts.
	 * @param urn The urn to parse.
	 * @returns The formatted urn or undefined if the value is not a urn.
	 */
	public static tryParseExact(urn: unknown): Urn | undefined {
		if (!Is.stringValue(urn)) {
			return;
		}

		const parts = urn.split(":");

		if (parts[0] === "urn") {
			parts.shift();
		}

		if (parts.length < 2) {
			return;
		}

		if (!/[\da-z][\da-z-]{0,31}/.test(parts[0])) {
			return;
		}

		for (let i = 1; i < parts.length; i++) {
			if (!/[\d!#$%'()*+,./:;=?@_a-z-]+/.test(parts[i])) {
				return;
			}
		}

		return new Urn(parts[0], parts.slice(1));
	}

	/**
	 * Construct a urn from a string that has already been validated.
	 * @param urn The urn to parse.
	 * @returns The formatted urn.
	 */
	public static fromValidString(urn: string): Urn {
		const parts = urn.split(":");

		if (parts[0] === "urn") {
			parts.shift();
		}

		return new Urn(parts[0], parts.slice(1));
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
	 * Get the parts.
	 * @param startIndex The index to start from, defaults to 0.
	 * @returns The parts.
	 */
	public parts(startIndex: number = 0): string[] {
		return this._urnParts.slice(startIndex);
	}

	/**
	 * Get the namespace identifier.
	 * @returns The namespace identifier.
	 */
	public namespaceIdentifier(): string {
		return this._urnParts[0];
	}

	/**
	 * Get the namespace method, the first component after the identifier.
	 * @returns The namespace method.
	 */
	public namespaceMethod(): string {
		return this._urnParts.length > 1 ? this._urnParts[1] : "";
	}

	/**
	 * Get the namespace specific parts.
	 * @param startIndex The index to start from, defaults to 0.
	 * @returns The namespace specific parts.
	 */
	public namespaceSpecificParts(startIndex: number = 0): string[] {
		return this._urnParts.length > 1 ? this._urnParts.slice(startIndex + 1) : [];
	}

	/**
	 * Get the namespace specific.
	 * @param startIndex The index to start from, defaults to 0.
	 * @returns The namespace specific.
	 */
	public namespaceSpecific(startIndex: number = 0): string {
		return this._urnParts.length > 1 ? this._urnParts.slice(startIndex + 1).join(":") : "";
	}

	/**
	 * Convert the parts in to a full string.
	 * @param omitPrefix Omit the urn: prefix from the string.
	 * @returns The formatted urn.
	 */
	public toString(omitPrefix: boolean = true): string {
		return omitPrefix ? this._urnParts.join(":") : `urn:${this._urnParts.join(":")}`;
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
