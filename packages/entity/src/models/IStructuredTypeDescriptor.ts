// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IStructuredTypeFieldDescriptor } from "./IStructuredTypeFieldDescriptor";

/**
 * Definition of an entity field.
 */
export interface IStructuredTypeDescriptor<T> {
	/**
	 * The name of the type.
	 */
	name: string;

	/**
	 * Fields of the structured type.
	 */
	fields: IStructuredTypeFieldDescriptor<T>[];
}
