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
	Email: "email"

} as const;

/**
 * Definition of the entity property type's format.
 */
export type EntitySchemaPropertyFormat =
	(typeof EntitySchemaPropertyFormat)[keyof typeof EntitySchemaPropertyFormat];
