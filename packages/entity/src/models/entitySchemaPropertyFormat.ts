// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Definition of the entity property format.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntitySchemaPropertyFormat = {
	/**
	 * UUID.
	 */
	Uuid: "uuid",

	/**
	 * URI.
	 */
	Uri: "uri",

	/**
	 * email.
	 */
	Email: "email",

	/**
	 * int8.
	 */
	Int8: "int8",

	/**
	 * uint8.
	 */
	Uint8: "uint8",

	/**
	 * int16.
	 */
	Int16: "int16",

	/**
	 * uint16.
	 */
	Uint16: "uint16",

	/**
	 * int32.
	 */
	Int32: "int32",

	/**
	 * uint32.
	 */
	Uint32: "uint32",

	/**
	 * float.
	 */
	Float: "float",

	/**
	 * double.
	 */
	Double: "double",

	/**
	 * int64.
	 */
	Int64: "int64",

	/**
	 * uint64.
	 */
	Uint64: "uint64",

	/**
	 * date.
	 */
	Date: "date",

	/**
	 * date-time.
	 */
	DateTime: "date-time"

} as const;

/**
 * Definition of the entity property type's format.
 */
export type EntitySchemaPropertyFormat =
	(typeof EntitySchemaPropertyFormat)[keyof typeof EntitySchemaPropertyFormat];
