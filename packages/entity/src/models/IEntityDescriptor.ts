// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityPropertyDescriptor } from "./IEntityPropertyDescriptor";

/**
 * Definition of an entity field.
 */
export interface IEntityDescriptor<T> {
	/**
	 * The name of the entity type that the descriptor is for.
	 */
	name: string;

	/**
	 * The properties.
	 */
	properties: IEntityPropertyDescriptor<T>[];

	/**
	 * Does the entity contain dynamic unknown properties.
	 */
	hasDynamicProperties?: boolean;
}
