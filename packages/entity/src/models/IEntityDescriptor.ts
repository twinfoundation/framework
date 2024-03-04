// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityPropertyDescriptor } from "./IEntityPropertyDescriptor.js";
import type { IStructuredTypeDescriptor } from "./IStructuredTypeDescriptor.js";

/**
 * Definition of an entity field.
 */
export interface IEntityDescriptor<T> {
	/**
	 * The properties.
	 */
	properties: IEntityPropertyDescriptor<T>[];

	/**
	 * Does the entity contain dynamic unknown properties.
	 */
	hasDynamicProperties?: boolean;

	/**
	 * Structured types on which the entity depends on.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	structuredTypes?: IStructuredTypeDescriptor<any>[];
}
