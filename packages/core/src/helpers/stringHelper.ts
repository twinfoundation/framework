// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "../utils/is";

/**
 * Class to help with string.
 */
export class StringHelper {
	/**
	 * Trim trailing slashes from a string.
	 * @param value The value to trim.
	 * @returns The trimmed value.
	 */
	public static trimTrailingSlashes(value: string | undefined): string {
		if (Is.stringValue(value)) {
			return value.replace(/\/+$/, "");
		}
		return "";
	}

	/**
	 * Trim leading slashes from a string.
	 * @param value The value to trim.
	 * @returns The trimmed value.
	 */
	public static trimLeadingSlashes(value: string | undefined): string {
		if (Is.stringValue(value)) {
			return value.replace(/^\/+/, "");
		}
		return "";
	}

	/**
	 * Convert the input string to kebab case.
	 * @param input The input to convert.
	 * @param stripInterfacePrefix Strip interface prefixes.
	 * @returns The kebab case version of the input.
	 */
	public static kebabCase(input: string, stripInterfacePrefix: boolean = true): string {
		if (Is.stringValue(input)) {
			let output = input;
			if (stripInterfacePrefix && /I[A-Z]/.test(output)) {
				output = output.slice(1);
			}
			return StringHelper.words(output).join("-").toLowerCase();
		}
		return "";
	}

	/**
	 * Title case all the words.
	 * @param input The input to convert.
	 * @param stripInterfacePrefix Strip interface prefixes.
	 * @returns The title case version of the input.
	 */
	public static titleCase(input: string, stripInterfacePrefix: boolean = true): string {
		if (Is.stringValue(input)) {
			let output = input;
			if (stripInterfacePrefix && /I[A-Z]/.test(output)) {
				output = output.slice(1);
			}
			return StringHelper.words(output)
				.map(w => `${w[0].toUpperCase()}${w.slice(1).toLowerCase()}`)
				.join(" ");
		}
		return "";
	}

	/**
	 * Pascal case all the words.
	 * @param input The input to convert.
	 * @param stripInterfacePrefix Strip interface prefixes.
	 * @returns The pascal case version of the input.
	 */
	public static pascalCase(input: string, stripInterfacePrefix: boolean = true): string {
		if (Is.stringValue(input)) {
			let output = input;
			if (stripInterfacePrefix && /I[A-Z]/.test(output)) {
				output = output.slice(1);
			}
			return StringHelper.words(output)
				.map(w => `${w[0].toUpperCase()}${w.slice(1).toLowerCase()}`)
				.join("");
		}
		return "";
	}

	/**
	 * Camel case all the words.
	 * @param input The input to convert.
	 * @param stripInterfacePrefix Strip interface prefixes.
	 * @returns The camel case version of the input.
	 */
	public static camelCase(input: string, stripInterfacePrefix: boolean = true): string {
		if (Is.stringValue(input)) {
			let output = input;
			if (stripInterfacePrefix && /I[A-Z]/.test(output)) {
				output = output.slice(1);
			}
			const words = StringHelper.words(output);
			return words.length === 0
				? ""
				: `${words[0].toLowerCase()}${words
						.slice(1)
						.map(w => `${w[0].toUpperCase()}${w.slice(1).toLowerCase()}`)
						.join("")}`;
		}
		return "";
	}

	/**
	 * Convert the words to a path.
	 * @param input The input to convert.
	 * @param stripInterfacePrefix Strip interface prefixes.
	 * @returns The path version of the input.
	 */
	public static wordPath(input: string, stripInterfacePrefix: boolean = true): string {
		if (Is.stringValue(input)) {
			let output = input;
			if (stripInterfacePrefix && /I[A-Z]/.test(output)) {
				output = output.slice(1);
			}
			const words = StringHelper.words(output);
			return words.join("/").toLowerCase();
		}
		return "";
	}

	/**
	 * Strip interface prefix if there is one.
	 * @param input The input to strip.
	 * @returns The input with any interface prefix stripped.
	 */
	public static stripPrefix(input: string): string {
		if (Is.stringValue(input)) {
			let output = input;
			if (/I[A-Z]/.test(output)) {
				output = output.slice(1);
			}
			return output;
		}
		return "";
	}

	/**
	 * Split a string into words.
	 * @param input The input to split.
	 * @returns The string split into words.
	 */
	public static words(input: string): string[] {
		if (!Is.stringValue(input)) {
			return [];
		}
		return (
			input
				.replace(/([A-Z])/g, " $1")
				.trim()
				.match(/[^\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007F]+/g) ?? []
		);
	}
}
