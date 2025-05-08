// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ObjectOrArray } from "../models/objectOrArray";
import { Is } from "../utils/is";

/**
 * Class to help with arrays.
 */
export class ArrayHelper {
	/**
	 * Do the two arrays match.
	 * @param arr1 The first array.
	 * @param arr2 The second array.
	 * @returns True if both arrays are empty of have the same values.
	 */
	public static matches(arr1: unknown, arr2: unknown): boolean {
		if (Is.empty(arr1) && Is.empty(arr2)) {
			return true;
		}
		if (!((Is.array(arr1) && Is.array(arr2)) || (Is.typedArray(arr1) && Is.typedArray(arr2)))) {
			return false;
		}
		if (arr1.length !== arr2.length) {
			return false;
		}
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Convert an object or array to an array.
	 * @param value The object or array to convert.
	 * @returns The array.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static fromObjectOrArray<T = unknown>(value: undefined): undefined;
	/**
	 * Convert an object or array to an array.
	 * @param value The object or array to convert.
	 * @returns The array.
	 */
	public static fromObjectOrArray<T = unknown>(value: ObjectOrArray<T>): T[];
	/**
	 * Convert an object or array to an array.
	 * @param value The object or array to convert.
	 * @returns The array.
	 */
	public static fromObjectOrArray<T = unknown>(
		value: ObjectOrArray<T> | undefined
	): T[] | undefined {
		if (Is.empty(value)) {
			return undefined;
		}
		if (Is.array<T>(value)) {
			return value;
		}
		return [value];
	}
}
