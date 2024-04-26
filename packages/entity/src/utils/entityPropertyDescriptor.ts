// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Guards, Is } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IEntityDescriptor } from "../models/IEntityDescriptor";
import type { IEntityPropertyDescriptor } from "../models/IEntityPropertyDescriptor";
import type { IEntitySortDescriptor } from "../models/IEntitySortDescriptor";
import type { SortDirection } from "../models/sortDirection";

/**
 * Class to perform sort operations.
 */
export class EntityPropertyDescriptor {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<EntityPropertyDescriptor>();

	/**
	 * Get the primary key from the descriptor.
	 * @param entityDescriptor The entity descriptor to find the primary key from.
	 * @returns The key if only one was found.
	 * @throws If no primary key was found, or more than one.
	 */
	public static getPrimaryKey<T>(
		entityDescriptor: IEntityDescriptor<T>
	): IEntityPropertyDescriptor<T> {
		Guards.object(EntityPropertyDescriptor._CLASS_NAME, nameof(entityDescriptor), entityDescriptor);

		const primaryKeys = entityDescriptor.properties.filter(p => p.isPrimary);
		if (primaryKeys.length === 0) {
			throw new GeneralError(EntityPropertyDescriptor._CLASS_NAME, "noIsPrimary");
		}
		if (primaryKeys.length > 1) {
			throw new GeneralError(EntityPropertyDescriptor._CLASS_NAME, "multipleIsPrimary");
		}
		return primaryKeys[0];
	}

	/**
	 * Get the sort properties from the descriptor.
	 * @param entityDescriptor The entity descriptor to find the primary key from.
	 * @returns The sort keys from the descriptor or undefined if there are none.
	 */
	public static getSortProperties<T>(
		entityDescriptor: IEntityDescriptor<T>
	): IEntitySortDescriptor<T>[] | undefined {
		Guards.object(EntityPropertyDescriptor._CLASS_NAME, nameof(entityDescriptor), entityDescriptor);

		const sortFields = entityDescriptor.properties.filter(p => !Is.undefined(p.sortDirection));

		return sortFields.length > 0
			? sortFields.map(
					p =>
						({
							property: p.property,
							type: p.type,
							sortDirection: p.sortDirection
						}) as IEntitySortDescriptor<T>
				)
			: undefined;
	}

	/**
	 * Build sort properties from the descriptor and override if necessary.
	 * @param entityDescriptor The entity descriptor to retrieve the default sort keys.
	 * @param overrideSortKeys The override sort keys.
	 * @returns The finalised sort keys.
	 */
	public static buildSortProperties<T>(
		entityDescriptor: IEntityDescriptor<T>,
		overrideSortKeys?: {
			property: keyof T;
			sortDirection: SortDirection;
		}[]
	): IEntitySortDescriptor<T>[] | undefined {
		Guards.object(EntityPropertyDescriptor._CLASS_NAME, nameof(entityDescriptor), entityDescriptor);

		let finalSortKeys: IEntitySortDescriptor<T>[] | undefined;

		if (Is.arrayValue(overrideSortKeys)) {
			finalSortKeys = [];

			for (const sortKey of overrideSortKeys) {
				const property = entityDescriptor.properties.find(p => p.property === sortKey.property);
				if (property) {
					finalSortKeys.push({
						property: sortKey.property,
						sortDirection: sortKey.sortDirection,
						type: property.type
					});
				}
			}
		} else {
			finalSortKeys = EntityPropertyDescriptor.getSortProperties(entityDescriptor);
		}

		return finalSortKeys;
	}
}
