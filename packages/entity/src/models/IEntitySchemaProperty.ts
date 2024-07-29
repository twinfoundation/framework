// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EntitySchemaPropertyFormat } from "./entitySchemaPropertyFormat";
import type { EntitySchemaPropertyType } from "./entitySchemaPropertyType";
import type { SortDirection } from "./sortDirection";

/**
 * Definition for an entity schema property.
 */
export interface IEntitySchemaProperty<T = unknown> {
	/**
	 * The property name from the entity.
	 */
	property: keyof T;

	/**
	 * The type of the property.
	 */
	type: EntitySchemaPropertyType;

	/**
	 * The format of the property.
	 */
	format?: EntitySchemaPropertyFormat;

	/**
	 * Is this the primary index property.
	 */
	isPrimary?: boolean;

	/**
	 * Is this a secondary index property.
	 */
	isSecondary?: boolean;

	/**
	 * Default sort direction for this field, leave empty if not sortable.
	 */
	sortDirection?: SortDirection;

	/**
	 * Is the property optional.
	 */
	optional?: boolean;

	/**
	 * The type of the item (only applies when type is `array`).
	 */
	itemType?: EntitySchemaPropertyType;

	/**
	 * The type ref of the item (only applies when type is either `array` or `object`).
	 */
	itemTypeRef?: string;

	/**
	 * Description of the object.
	 */
	description?: string;

	/**
	 * Examples of the property values.
	 */
	examples?: unknown[];
}
