// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { applyPatch, createPatch, type Operation } from "rfc6902";
import { ObjectHelper } from "./objectHelper";
import { GeneralError } from "../errors/generalError";
import type { IPatchOperation } from "../models/IPatchOperation";
import { Converter } from "../utils/converter";
import { Is } from "../utils/is";

/**
 * Helpers methods for JSON objects.
 */
export class JsonHelper {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<JsonHelper>();

	/**
	 * Serializes in canonical format.
	 * Based on https://www.rfc-editor.org/rfc/rfc8785.
	 * @param object The object to be serialized.
	 * @returns The serialized object.
	 */
	public static canonicalize(object: unknown): string {
		const buffer: string[] = [];

		if (
			object === null ||
			typeof object !== "object" ||
			("toJSON" in object && object.toJSON instanceof Function)
		) {
			// Primitive data type
			buffer.push(JSON.stringify(object));
		} else if (Array.isArray(object)) {
			// Array maintain element order
			const parts: string[] = [];
			for (const element of object) {
				if (element === undefined) {
					parts.push("null");
				} else {
					parts.push(JsonHelper.canonicalize(element));
				}
			}
			buffer.push(`[${parts.join(",")}]`);
		} else {
			// Object sort properties
			const props: string[] = [];
			const keys = Object.keys(object).sort();
			const o = object as { [id: string]: unknown };
			for (const key of keys) {
				if (o[key] !== undefined) {
					props.push(`${JSON.stringify(key)}:${JsonHelper.canonicalize(o[key])}`);
				}
			}
			buffer.push(`{${props.join(",")}}`);
		}

		return buffer.join("");
	}

	/**
	 * Creates a RFC 6902 diff set.
	 * Based on https://www.rfc-editor.org/rfc/rfc6902.
	 * @param object1 The first object.
	 * @param object2 The second object.
	 * @returns The list of patches.
	 */
	public static diff<T = unknown>(object1: T, object2: T): IPatchOperation[] {
		const operations = createPatch(object1, object2);
		return operations as IPatchOperation[];
	}

	/**
	 * Applies a RFC 6902 diff set to an object.
	 * Based on https://www.rfc-editor.org/rfc/rfc6902.
	 * @param object The object to patch.
	 * @param patches The second object.
	 * @returns The updated object.
	 * @throws GeneralError if the patch fails.
	 */
	public static patch<T = unknown>(object: T, patches: IPatchOperation[]): T {
		const clone = ObjectHelper.clone(object);
		const result = applyPatch(clone, patches as Operation[]);

		for (let i = 0; i < result.length; i++) {
			if (!Is.empty(result[i])) {
				throw new GeneralError(JsonHelper._CLASS_NAME, "failedPatch", { index: i }, result[i]);
			}
		}

		return clone;
	}

	/**
	 * Stringify the JSON with support for extended data types date/bigint/uint8array.
	 * @param object The object to stringify.
	 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
	 * @returns The stringified object.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static stringifyEx(object: any, space?: string | number): string {
		// We want to keep the 'this' intact for the replacer
		// eslint-disable-next-line @typescript-eslint/unbound-method
		return JSON.stringify(object, JsonHelper.stringifyExReplacer, space);
	}

	/**
	 * Parse the JSON string with support for extended data types date/bigint/uint8array.
	 * @param json The object to pause.
	 * @returns The object.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static parseEx(json: string): any {
		// We want to keep the 'this' intact for the reviver
		// eslint-disable-next-line @typescript-eslint/unbound-method
		return JSON.parse(json, JsonHelper.parseExReviver);
	}

	/**
	 * Replacer function to handle extended data types.
	 * @param this The object.
	 * @param key The key.
	 * @param value The value.
	 * @returns The value.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static stringifyExReplacer(this: any, key: string, value: unknown): unknown {
		const rawValue = this[key];

		if (Is.bigint(rawValue)) {
			return {
				"@ext": "bigint",
				value: rawValue.toString()
			};
		} else if (Is.date(rawValue)) {
			return {
				"@ext": "date",
				value: rawValue.getTime()
			};
		} else if (Is.uint8Array(rawValue)) {
			return {
				"@ext": "uint8array",
				value: Converter.bytesToBase64(rawValue)
			};
		}
		return value;
	}

	/**
	 * Reviver function to handle extended data types.
	 * @param this The object.
	 * @param key The key.
	 * @param value The value.
	 * @returns The value.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static parseExReviver(this: any, key: string, value: unknown): unknown {
		if (Is.object<{ "@ext": string; value: string }>(value)) {
			if (value["@ext"] === "bigint") {
				return BigInt(value.value);
			} else if (value["@ext"] === "date") {
				return new Date(value.value);
			} else if (value["@ext"] === "uint8array") {
				return Converter.base64ToBytes(value.value);
			}
		}

		return value;
	}
}
