// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Definition of the entity property types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntitySchemaPropertyType = {
	/**
	 * String.
	 */
	String: "string",

	/**
	 * Number.
	 */
	Number: "number",

	/**
	 * Integer.
	 */
	Integer: "integer",

	/**
	 * Boolean.
	 */
	Boolean: "boolean",

	/**
	 * Array.
	 */
	Array: "array",

	/**
	 * Object.
	 */
	Object: "object"

} as const;

/**
 * Definition of the entity property types.
 */
export type EntitySchemaPropertyType =
	(typeof EntitySchemaPropertyType)[keyof typeof EntitySchemaPropertyType];
