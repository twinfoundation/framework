// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EntitySchemaPropertyType } from "./entitySchemaPropertyType";
import type { SortDirection } from "./sortDirection";

/**
 * Definition of an entity property sort details.
 */
export interface IEntitySort<T> {
	/**
	 * The name of the property.
	 */
	property: keyof T;

	/**
	 * The type of the property.
	 */
	type: EntitySchemaPropertyType;

	/**
	 * Default sort direction for this column, leave empty if not sortable.
	 */
	sortDirection: SortDirection;
}
