// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import type { IEntitySchemaProperty } from "../models/IEntitySchemaProperty";
import { DecoratorHelper } from "../utils/decoratorHelper";

/**
 * Decorator to produce schema property data for entities.
 * @param options The options for the property.
 * @returns The property decorator.
 */
export function property(options: Omit<IEntitySchemaProperty, "property">): any {
	return (target: any, propertyKey: string) => {
		const entitySchema = DecoratorHelper.getSchema<any>(target);
		entitySchema.properties ??= [];
		const idx = entitySchema.properties.findIndex(p => p.property === propertyKey);
		if (idx >= 0) {
			entitySchema.properties[idx] = {
				...options,
				property: propertyKey
			};
		} else {
			entitySchema.properties.push({
				...options,
				property: propertyKey
			});
		}
		DecoratorHelper.setSchema(target, entitySchema);
	};
}
