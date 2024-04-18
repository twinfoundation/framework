// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EntityPropertyDescriptorDataType } from "./entityPropertyDescriptorDataType";
import type { SortDirection } from "./sortDirection";

/**
 * Definition of an entity property sort details.
 */
export interface IEntitySortDescriptor<T> {
	/**
	 * The name of the property.
	 */
	name: keyof T;

	/**
	 * The type of the property.
	 */
	type: EntityPropertyDescriptorDataType;

	/**
	 * Default sort direction for this column, leave empty if not sortable.
	 */
	sortDirection: SortDirection;
}
