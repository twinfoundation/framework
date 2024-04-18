// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Guards, Is } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IEntityDescriptor } from "../models/IEntityDescriptor";
import type { IEntityPropertyDescriptor } from "../models/IEntityPropertyDescriptor";
import type { IEntitySortDescriptor } from "../models/IEntitySortDescriptor";

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
	 * Get the sort keys from the descriptor.
	 * @param entityDescriptor The entity descriptor to find the primary key from.
	 * @returns The sort keys from the descriptor.
	 */
	public static getSortKeys<T>(entityDescriptor: IEntityDescriptor<T>): IEntitySortDescriptor<T>[] {
		Guards.object(EntityPropertyDescriptor._CLASS_NAME, nameof(entityDescriptor), entityDescriptor);

		const sortFields = entityDescriptor.properties.filter(p => !Is.undefined(p.sortDirection));

		return sortFields.map(
			p =>
				({
					name: p.name,
					type: p.type,
					sortDirection: p.sortDirection
				}) as IEntitySortDescriptor<T>
		);
	}
}
