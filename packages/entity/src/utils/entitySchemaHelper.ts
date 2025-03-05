// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Guards, Is } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { DecoratorHelper } from "./decoratorHelper";
import type { IEntitySchema } from "../models/IEntitySchema";
import type { IEntitySchemaProperty } from "../models/IEntitySchemaProperty";
import type { IEntitySort } from "../models/IEntitySort";
import type { SortDirection } from "../models/sortDirection";

/**
 * Class to help with entity schema operations.
 */
export class EntitySchemaHelper {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<EntitySchemaHelper>();

	/**
	 * Get the schema for the specified object.
	 * @param target The object to get the schema data for.
	 * @returns The schema for the object if it can be found.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static getSchema<T = unknown>(target: any): IEntitySchema<T> {
		return DecoratorHelper.getSchema<T>(target);
	}

	/**
	 * Get the primary key from the entity schema.
	 * @param entitySchema The entity schema to find the primary key from.
	 * @returns The key if only one was found.
	 * @throws If no primary key was found, or more than one.
	 */
	public static getPrimaryKey<T>(entitySchema: IEntitySchema<T>): IEntitySchemaProperty<T> {
		Guards.object<IEntitySchema<T>>(
			EntitySchemaHelper._CLASS_NAME,
			nameof(entitySchema),
			entitySchema
		);

		const primaryKeys = (entitySchema.properties ?? [])?.filter(p => p.isPrimary);
		if (primaryKeys.length === 0) {
			throw new GeneralError(EntitySchemaHelper._CLASS_NAME, "noIsPrimary");
		}
		if (primaryKeys.length > 1) {
			throw new GeneralError(EntitySchemaHelper._CLASS_NAME, "multipleIsPrimary");
		}
		return primaryKeys[0];
	}

	/**
	 * Get the sort properties from the schema.
	 * @param entitySchema The entity schema to find the primary key from.
	 * @returns The sort keys from the schema or undefined if there are none.
	 */
	public static getSortProperties<T>(entitySchema: IEntitySchema<T>): IEntitySort<T>[] | undefined {
		Guards.object<IEntitySchema<T>>(
			EntitySchemaHelper._CLASS_NAME,
			nameof(entitySchema),
			entitySchema
		);

		const sortFields = (entitySchema.properties ?? []).filter(p => !Is.undefined(p.sortDirection));

		return sortFields.length > 0
			? sortFields.map(
					p =>
						({
							property: p.property,
							type: p.type,
							sortDirection: p.sortDirection
						}) as IEntitySort<T>
				)
			: undefined;
	}

	/**
	 * Build sort properties from the schema and override if necessary.
	 * @param entitySchema The entity schema to retrieve the default sort keys.
	 * @param overrideSortKeys The override sort keys.
	 * @returns The finalised sort keys.
	 */
	public static buildSortProperties<T>(
		entitySchema: IEntitySchema<T>,
		overrideSortKeys?: {
			property: keyof T;
			sortDirection: SortDirection;
		}[]
	): IEntitySort<T>[] | undefined {
		Guards.object(EntitySchemaHelper._CLASS_NAME, nameof(entitySchema), entitySchema);

		let finalSortKeys: IEntitySort<T>[] | undefined;

		if (Is.arrayValue(overrideSortKeys)) {
			finalSortKeys = [];

			for (const sortKey of overrideSortKeys) {
				const property = (entitySchema.properties ?? []).find(p => p.property === sortKey.property);
				if (property) {
					finalSortKeys.push({
						property: sortKey.property,
						sortDirection: sortKey.sortDirection,
						type: property.type
					});
				}
			}
		} else {
			finalSortKeys = EntitySchemaHelper.getSortProperties(entitySchema);
		}

		return finalSortKeys;
	}

	/**
	 * Validate the entity against the schema.
	 * @param entity The entity to validate.
	 * @param entitySchema The schema to validate against.
	 * @throws If the entity is invalid.
	 */
	public static validateEntity<T>(entity: T, entitySchema: IEntitySchema<T>): void {
		Guards.object(EntitySchemaHelper._CLASS_NAME, nameof(entity), entity);
		Guards.object<IEntitySchema<T>>(
			EntitySchemaHelper._CLASS_NAME,
			nameof(entitySchema),
			entitySchema
		);

		const properties = entitySchema.properties ?? [];
		if (properties.length === 0 && Is.objectValue(entity)) {
			throw new GeneralError(EntitySchemaHelper._CLASS_NAME, "invalidEntityProperties");
		}

		const allKeys = Object.keys(entity);

		for (const prop of properties) {
			const idx = allKeys.indexOf(prop.property as string);
			if (idx !== -1) {
				allKeys.splice(idx, 1);
			}

			const value = entity[prop.property];
			if (Is.empty(value)) {
				// If the value is empty but the property is not optional, then it's invalid
				if (!prop.optional) {
					throw new GeneralError(EntitySchemaHelper._CLASS_NAME, "invalidOptional", {
						property: prop.property,
						type: prop.type
					});
				}
			} else if (prop.type === "integer" && Is.integer(value)) {
				// If the schema expects an integer and the value is an integer, then it's valid
			} else if (prop.type === "object" && Is.object(value)) {
				// If the schema expects an object and the value is an object, then it's valid
			} else if (prop.type === "array" && Is.array(value)) {
				// If the schema expects an array and the value is an array, then it's valid
			} else if (prop.type !== typeof value) {
				// The schema type does not match the value type
				throw new GeneralError(EntitySchemaHelper._CLASS_NAME, "invalidEntity", {
					value,
					property: prop.property,
					type: prop.type
				});
			}
		}

		if (allKeys.length > 0) {
			// There are keys in the entity that are not in the schema
			throw new GeneralError(EntitySchemaHelper._CLASS_NAME, "invalidEntityKeys", {
				keys: allKeys.join(", ")
			});
		}
	}
}
