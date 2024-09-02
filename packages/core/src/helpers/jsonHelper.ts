// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { applyPatch, createPatch, type Operation } from "rfc6902";
import type { IPatchOperation } from "../models/IPatchOperation";

/**
 * Helpers methods for JSON objects.
 */
export class JsonHelper {
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
	 */
	public static patch<T = unknown>(object: T, patches: IPatchOperation[]): T {
		return applyPatch(object, patches as Operation[]) as T;
	}
}
