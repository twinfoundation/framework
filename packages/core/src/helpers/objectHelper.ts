// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@gtsc/nameof";
import { GeneralError } from "../errors/generalError";
import { Converter } from "../utils/converter";
import { Is } from "../utils/is";

/**
 * Class to help with objects.
 */
export class ObjectHelper {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<ObjectHelper>();

	/**
	 * Convert an object to bytes.
	 * @param obj The object to convert.
	 * @param format Format the JSON content.
	 * @returns The object as bytes.
	 */
	public static toBytes<T>(obj: T | undefined, format: boolean = false): Uint8Array {
		if (obj === undefined) {
			return new Uint8Array();
		}
		const json = format ? JSON.stringify(obj, undefined, "\t") : JSON.stringify(obj);

		return Converter.utf8ToBytes(json);
	}

	/**
	 * Convert a bytes to an object.
	 * @param bytes The bytes to convert to an object.
	 * @returns The object.
	 * @throws GeneralError if there was an error parsing the JSON.
	 */
	public static fromBytes<T>(bytes: Uint8Array | undefined | null): T {
		if (Is.empty(bytes) || bytes.length === 0) {
			return undefined as unknown as T;
		}
		try {
			const utf8 = Converter.bytesToUtf8(bytes);
			return JSON.parse(utf8) as T;
		} catch (err) {
			throw new GeneralError(ObjectHelper._CLASS_NAME, "failedBytesToJSON", undefined, err);
		}
	}

	/**
	 * Make a deep clone of an object.
	 * @param obj The object to clone.
	 * @returns The objects clone.
	 */
	public static clone<T>(obj: T): T {
		if (Is.undefined(obj)) {
			return undefined as T;
		}
		return structuredClone(obj);
	}

	/**
	 * Deep merge objects.
	 * @param obj1 The first object to merge.
	 * @param obj2 The second object to merge.
	 * @returns The combined deep merge of the objects.
	 */
	public static merge<T = unknown, U = unknown>(obj1: T, obj2: U): T & U {
		if (Is.empty(obj1)) {
			return ObjectHelper.clone(obj2) as T & U;
		}
		if (Is.empty(obj2)) {
			return ObjectHelper.clone(obj1) as T & U;
		}

		const obj1Clone = ObjectHelper.clone(obj1);

		if (Is.object(obj1Clone) && Is.object(obj2)) {
			const keys = Object.keys(obj2);
			for (const key of keys) {
				if (Is.object(obj1Clone[key]) && Is.object(obj2[key])) {
					ObjectHelper.propertySet(obj1Clone, key, ObjectHelper.merge(obj1Clone[key], obj2[key]));
				} else {
					ObjectHelper.propertySet(obj1Clone, key, obj2[key]);
				}
			}
		}

		return obj1Clone as T & U;
	}

	/**
	 * Does one object equal another.
	 * @param obj1 The first object to compare.
	 * @param obj2 The second object to compare.
	 * @returns True is the objects are equal.
	 */
	public static equal<T>(obj1: T, obj2: T): boolean {
		return JSON.stringify(obj1) === JSON.stringify(obj2);
	}

	/**
	 * Get the property of an unknown object.
	 * @param obj The object to get the property from.
	 * @param property The property to get, can be separated by dots for nested path.
	 * @returns The property.
	 */
	public static propertyGet<T = unknown>(obj: unknown, property: string): T | undefined {
		if (property.includes(".")) {
			const parts = property.split(".");

			let value: unknown = obj;
			for (const part of parts) {
				if (Is.object(value)) {
					value = value[part];
				} else {
					return undefined;
				}
			}
			return value as T;
		}

		return Is.object(obj) ? (obj[property] as T) : undefined;
	}

	/**
	 * Set the property of an unknown object.
	 * @param obj The object to set the property from.
	 * @param property The property to set.
	 * @param value The value to set.
	 */
	public static propertySet(obj: unknown, property: string, value: unknown): void {
		if (Is.object(obj)) {
			obj[property] = value;
		}
	}

	/**
	 * Delete the property of an unknown object.
	 * @param obj The object to set the property from.
	 * @param property The property to set
	 */
	public static propertyDelete(obj: unknown, property: string): void {
		if (Is.object(obj)) {
			delete obj[property];
		}
	}

	/**
	 * Pick a subset of properties from an object.
	 * @param obj The object to pick the properties from.
	 * @param keys The property keys to pick.
	 * @returns The partial object.
	 */
	public static pick<T>(obj: T, keys?: (keyof T)[]): Partial<T> {
		if (Is.object(obj) && Is.arrayValue(keys)) {
			return Object.fromEntries(
				keys.filter(key => key in obj).map(key => [key, obj[key]])
			) as Partial<T>;
		}

		return obj;
	}
}
