// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "@gtsc/core";
import type { EntityPropertyDescriptorDataType } from "../models/entityPropertyDescriptorDataType";

/**
 * Class to perform sort operations.
 */
export class Sorter {
	/**
	 * Compare two properties.
	 * @param entity1 The first entity.
	 * @param entity2 The second entity.
	 * @param prop The property to compare.
	 * @param type The type of the property.
	 * @param direction The direction of the sort.
	 * @returns The result of the comparison.
	 */
	public static compare<T>(
		entity1: T,
		entity2: T,
		prop: keyof T,
		type: EntityPropertyDescriptorDataType,
		direction: "asc" | "desc" = "asc"
	): number {
		let res = 0;
		if (!Is.empty(entity1[prop]) && !Is.empty(entity2[prop])) {
			if (type === "float" || type === "integer" || type === "timestamp") {
				res = (entity1[prop] as unknown as number) - (entity2[prop] as unknown as number);
			} else if (type === "string") {
				res = (entity1[prop] as unknown as string).localeCompare(
					entity2[prop] as unknown as string
				);
			}
		}

		return direction === "asc" ? res : res * -1;
	}
}
