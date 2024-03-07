// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EntityPropertyDescriptorDataType } from "./entityPropertyDescriptorDataType";

/**
 * Definition of an entity field.
 */
export interface IStructuredTypeFieldDescriptor<T> {
	/**
	 * The name of the field it has to correspond to one of the properties of the bound type T.
	 */
	name: keyof T;

	/**
	 * The type of the field.
	 */
	type: EntityPropertyDescriptorDataType;

	/**
	 * The type of the item (only applies when type is either `list` or `structure`).
	 */
	itemType?: string;

	/**
	 * The length of the property if applicable.
	 */
	size?: number;
}
