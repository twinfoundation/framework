// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Helpers methods for JSON objects.
 * Based on https://www.rfc-editor.org/rfc/rfc8785
 */
export class JsonHelper {
	/**
	 * Serializes in canonical format.
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
}
