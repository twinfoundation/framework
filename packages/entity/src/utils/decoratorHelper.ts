// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import "reflect-metadata";
import type { IEntitySchema } from "../models/IEntitySchema";

const META_DATA_KEY = "EntitySchemaMetadata";

/**
 * Class to help with decorators.
 */
export class DecoratorHelper {
	/**
	 * Get the schema from the reflection metadata.
	 * @param target The object to get the schema data from.
	 * @returns The schema from the metadata if it can be found.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static getSchema<T = unknown>(target: any): IEntitySchema<T> | undefined {
		return Reflect.getMetadata(
			META_DATA_KEY,
			typeof target === "object" ? target : target.prototype
		);
	}

	/**
	 * Set the schema from the reflection metadata.
	 * @param target The object to get the schema data from.
	 * @param entitySchema The schema to set.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static setSchema<T = unknown>(target: any, entitySchema: IEntitySchema<T>): void {
		Reflect.defineMetadata(
			META_DATA_KEY,
			entitySchema,
			typeof target === "object" ? target : target.prototype
		);
	}
}
