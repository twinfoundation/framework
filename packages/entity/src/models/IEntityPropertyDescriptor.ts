// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EntityPropertyDescriptorDataType } from "./entityPropertyDescriptorDataType";
import type { SortDirection } from "./sortDirection";

/**
 * Definition of an entity property.
 */
export interface IEntityPropertyDescriptor<T> {
	/**
	 * The name of the property.
	 */
	property: keyof T;

	/**
	 * The type of the property.
	 */
	type: EntityPropertyDescriptorDataType;

	/**
	 * The type of the item (only applies when type is either `list` or `object`).
	 */
	itemType?: string;

	/**
	 * An additional hint for the format of the data.
	 */
	format?: string;

	/**
	 * The length of the property if applicable.
	 */
	size?: number;

	/**
	 * Is this the primary index property.
	 */
	isPrimary?: boolean;

	/**
	 * Is this a secondary index property.
	 */
	isSecondary?: boolean;

	/**
	 * Default sort direction for this column, leave empty if not sortable.
	 */
	sortDirection?: SortDirection;

	/**
	 * Is the property optional.
	 */
	optional?: boolean;
}
