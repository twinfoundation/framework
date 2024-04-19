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
		return JSON.parse(JSON.stringify(obj)) as T;
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
	 * @param property The property to get.
	 * @returns The property.
	 */
	public static propertyGet(obj: unknown, property: string): unknown | undefined {
		return Is.object(obj) && obj[property];
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
}
