// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@twin.org/nameof";
import { JsonHelper } from "./jsonHelper";
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
	 * @param strictPropertyOrder Should the properties be in the same order, defaults to true.
	 * @returns True is the objects are equal.
	 */
	public static equal<T>(obj1: T, obj2: T, strictPropertyOrder?: boolean): boolean {
		if (strictPropertyOrder ?? true) {
			return JSON.stringify(obj1) === JSON.stringify(obj2);
		}
		return JsonHelper.canonicalize(obj1) === JsonHelper.canonicalize(obj2);
	}

	/**
	 * Get the property of an unknown object.
	 * @param obj The object to get the property from.
	 * @param property The property to get, can be separated by dots for nested path.
	 * @returns The property.
	 */
	public static propertyGet<T = unknown>(obj: unknown, property: string): T | undefined {
		const pathParts = property.split(".");

		let pathValue: unknown = obj;
		for (const pathPart of pathParts) {
			// Is the path part numeric i.e. an array index.
			const arrayMatch = /^(\d+)$/.exec(pathPart);

			if (arrayMatch) {
				const arrayIndex = Number.parseInt(arrayMatch[1], 10);

				if (Is.arrayValue(pathValue) && arrayIndex < pathValue.length) {
					// There is no prop name so this is a direct array index on the current object
					pathValue = pathValue[arrayIndex];
				} else {
					// Array index for non array object so return
					return undefined;
				}
			} else if (Is.object(pathValue)) {
				// No array part in path so assume object sub property
				pathValue = pathValue[pathPart];
			} else {
				return undefined;
			}
		}

		return pathValue as T;
	}

	/**
	 * Set the property of an unknown object.
	 * @param obj The object to set the property from.
	 * @param property The property to set.
	 * @param value The value to set.
	 * @throws GeneralError if the property target is not an object.
	 */
	public static propertySet(obj: unknown, property: string, value: unknown): void {
		const pathParts = property.split(".");

		let pathValue: unknown = obj;
		let parentObj: unknown;
		for (let i = 0; i < pathParts.length; i++) {
			const pathPart = pathParts[i];

			// Is the path part numeric i.e. an array index.
			const arrayMatch = /^(\d+)$/.exec(pathPart);
			const arrayIndex = arrayMatch ? Number.parseInt(arrayMatch[1], 10) : -1;

			if (i === pathParts.length - 1) {
				// Last part of path so set the value
				if (arrayIndex >= 0) {
					if (Is.array(pathValue)) {
						pathValue[arrayIndex] = value;
					} else if (Is.object(pathValue)) {
						pathValue[arrayIndex] = value;
					} else {
						throw new GeneralError(ObjectHelper._CLASS_NAME, "cannotSetArrayIndex", {
							property,
							index: arrayIndex
						});
					}
				} else if (Is.object(pathValue)) {
					pathValue[pathPart] = value;
				} else {
					throw new GeneralError(ObjectHelper._CLASS_NAME, "cannotSetProperty", { property });
				}
			} else {
				parentObj = pathValue;
				if (Is.object(pathValue)) {
					pathValue = pathValue[pathPart];
				} else if (Is.array(pathValue)) {
					pathValue = pathValue[arrayIndex];
				}

				if (Is.empty(pathValue)) {
					const nextArrayMatch = /^(\d+)$/.exec(pathParts[i + 1]);
					const nextArrayIndex = nextArrayMatch ? Number.parseInt(nextArrayMatch[1], 10) : -1;

					if (nextArrayIndex >= 0) {
						pathValue = [];
					} else {
						pathValue = {};
					}

					if (Is.object(parentObj)) {
						parentObj[pathPart] = pathValue;
					} else if (Is.array(parentObj)) {
						parentObj[arrayIndex] = pathValue;
					}
				}
			}
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
	 * Extract a property from the object, providing alternative names.
	 * @param obj The object to extract from.
	 * @param propertyNames The possible names for the property.
	 * @param removeProperties Remove the properties from the object, defaults to true.
	 * @returns The property if available.
	 */
	public static extractProperty<T>(
		obj: unknown,
		propertyNames: string | string[],
		removeProperties: boolean = true
	): T | undefined {
		let retVal: T | undefined;

		if (Is.object(obj)) {
			const names = Is.string(propertyNames) ? [propertyNames] : propertyNames;

			for (const prop of names) {
				retVal ??= ObjectHelper.propertyGet<T>(obj, prop);
				if (removeProperties) {
					ObjectHelper.propertyDelete(obj, prop);
				}
			}
		}

		return retVal;
	}

	/**
	 * Pick a subset of properties from an object.
	 * @param obj The object to pick the properties from.
	 * @param keys The property keys to pick.
	 * @returns The partial object.
	 */
	public static pick<T>(obj: T | undefined, keys?: (keyof T)[]): Partial<T> {
		if (Is.object(obj) && Is.arrayValue(keys)) {
			const result: Partial<T> = {};
			for (const key of keys) {
				result[key] = obj[key];
			}
			return result;
		}

		return obj as Partial<T>;
	}

	/**
	 * Omit a subset of properties from an object.
	 * @param obj The object to omit the properties from.
	 * @param keys The property keys to omit.
	 * @returns The partial object.
	 */
	public static omit<T>(obj: T | undefined, keys?: (keyof T)[]): Partial<T> {
		if (Is.object(obj) && Is.arrayValue(keys)) {
			const result = { ...obj };
			for (const key of keys) {
				delete result[key];
			}
			return result;
		}

		return obj as Partial<T>;
	}

	/**
	 * Converter the non JSON primitives to extended types.
	 * @param obj The object to convert.
	 * @returns The object with extended properties.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static toExtended(obj: any): any {
		const jsonExtended = JsonHelper.stringifyEx(obj);
		return JSON.parse(jsonExtended);
	}

	/**
	 * Converter the extended types to non JSON primitives.
	 * @param obj The object to convert.
	 * @returns The object with regular properties.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static fromExtended(obj: any): any {
		const jsonExtended = JsonHelper.stringifyEx(obj);
		return JsonHelper.parseEx(jsonExtended);
	}

	/**
	 * Remove empty properties from an object.
	 * @param obj The object to remove the empty properties from.
	 * @param options The options for the removal.
	 * @param options.removeUndefined Remove undefined properties, defaults to true.
	 * @param options.removeNull Remove null properties, defaults to false.
	 * @returns The object with empty properties removed.
	 */
	public static removeEmptyProperties<T = unknown>(
		obj: T,
		options?: { removeUndefined?: boolean; removeNull?: boolean }
	): T {
		if (Is.object(obj)) {
			const removeUndefined = options?.removeUndefined ?? true;
			const removeNull = options?.removeNull ?? false;
			const newObj: { [id: string]: unknown } = {};
			const keys = Object.keys(obj);
			for (const key of keys) {
				if (!((removeUndefined && Is.undefined(obj[key])) || (removeNull && Is.null(obj[key])))) {
					newObj[key] = ObjectHelper.removeEmptyProperties(obj[key], options);
				}
			}
			return newObj as T;
		} else if (Is.array(obj)) {
			const arr = [];
			for (const element of obj) {
				arr.push(ObjectHelper.removeEmptyProperties(element, options));
			}
			return arr as T;
		}
		return obj;
	}
}
