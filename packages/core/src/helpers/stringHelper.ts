// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-continue */
/* eslint-disable no-bitwise */
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

	/**
	 * Check if a Node.js Buffer or Uint8Array is UTF-8.
	 * Url https://tools.ietf.org/html/rfc3629
	 * Source https://github.com/hcodes/isutf8
	 * UTF8-char = UTF8-1 / UTF8-2 / UTF8-3 / UTF8-4.
	 * UTF8-1    = %x00-7F.
	 * UTF8-2    = %xC2-DF UTF8-tail.
	 * UTF8-3    = %xE0 %xA0-BF UTF8-tail.
	 * -           %xE1-EC 2( UTF8-tail ).
	 * -           %xED %x80-9F UTF8-tail.
	 * -           %xEE-EF 2( UTF8-tail ).
	 * UTF8-4    = %xF0 %x90-BF 2( UTF8-tail ).
	 * -           %xF1-F3 3( UTF8-tail ).
	 * -           %xF4 %x80-8F 2( UTF8-tail ).
	 * UTF8-tail = %x80-BF.
	 * @param data The data to check.
	 * @returns True if the data is utf8.
	 */
	public static isUtf8(data: Uint8Array): boolean {
		if (!Is.uint8Array(data)) {
			return false;
		}

		let i = 0;
		const len = data.length;

		while (i < len) {
			// UTF8-1 = %x00-7F
			if (data[i] <= 0x7f) {
				i++;

				continue;
			}

			// UTF8-2 = %xC2-DF UTF8-tail
			if (data[i] >= 0xc2 && data[i] <= 0xdf) {
				// if(buf[i + 1] >= 0x80 && buf[i + 1] <= 0xBF) {
				if (data[i + 1] >> 6 === 2) {
					i += 2;

					continue;
				} else {
					return false;
				}
			}

			// UTF8-3 = %xE0 %xA0-BF UTF8-tail
			// UTF8-3 = %xED %x80-9F UTF8-tail
			if (
				((data[i] === 0xe0 && data[i + 1] >= 0xa0 && data[i + 1] <= 0xbf) ||
					(data[i] === 0xed && data[i + 1] >= 0x80 && data[i + 1] <= 0x9f)) &&
				data[i + 2] >> 6 === 2
			) {
				i += 3;

				continue;
			}

			// UTF8-3 = %xE1-EC 2( UTF8-tail )
			// UTF8-3 = %xEE-EF 2( UTF8-tail )
			if (
				((data[i] >= 0xe1 && data[i] <= 0xec) || (data[i] >= 0xee && data[i] <= 0xef)) &&
				data[i + 1] >> 6 === 2 &&
				data[i + 2] >> 6 === 2
			) {
				i += 3;

				continue;
			}

			// UTF8-4 = %xF0 %x90-BF 2( UTF8-tail )
			//          %xF1-F3 3( UTF8-tail )
			//          %xF4 %x80-8F 2( UTF8-tail )
			if (
				((data[i] === 0xf0 && data[i + 1] >= 0x90 && data[i + 1] <= 0xbf) ||
					(data[i] >= 0xf1 && data[i] <= 0xf3 && data[i + 1] >> 6 === 2) ||
					(data[i] === 0xf4 && data[i + 1] >= 0x80 && data[i + 1] <= 0x8f)) &&
				data[i + 2] >> 6 === 2 &&
				data[i + 3] >> 6 === 2
			) {
				i += 4;

				continue;
			}

			return false;
		}

		return true;
	}
}
