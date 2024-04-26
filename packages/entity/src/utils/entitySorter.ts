// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "@gtsc/core";
import type { EntityPropertyDescriptorDataType } from "../models/entityPropertyDescriptorDataType";
import type { IEntitySortDescriptor } from "../models/IEntitySortDescriptor";
import { SortDirection } from "../models/sortDirection";

/**
 * Class to perform sort operations on entities.
 */
export class EntitySorter {
	/**
	 * Sort a list of entities using multiple keys and direction.
	 * @param entities The list of entities.
	 * @param sortDescriptors The sort keys to use.
	 * @returns The sorted list.
	 */
	public static sort<T>(entities: T[], sortDescriptors?: IEntitySortDescriptor<T>[]): T[] {
		if (!Is.arrayValue(entities) || Is.empty(sortDescriptors)) {
			return entities;
		}

		return entities.sort((a, b) => {
			for (const soreDescriptor of sortDescriptors) {
				const compareResult = EntitySorter.compare(
					a,
					b,
					soreDescriptor.property,
					soreDescriptor.type,
					soreDescriptor.sortDirection
				);
				if (compareResult !== 0) {
					return compareResult;
				}
			}
			return 0;
		});
	}

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
		direction: SortDirection = SortDirection.Ascending
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

		return direction === SortDirection.Ascending ? res : res * -1;
	}
}
