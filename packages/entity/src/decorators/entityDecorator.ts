// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import type { IEntitySchemaOptions } from "../models/IEntitySchemaOptions";
import { DecoratorHelper } from "../utils/decoratorHelper";

/**
 * Decorator to produce schema data for entity.
 * @param options The options for the entity.
 * @returns The class decorator.
 */
export function entity(options?: IEntitySchemaOptions): any {
	return (target: any) => {
		let entitySchema = DecoratorHelper.getSchema(target);
		entitySchema ??= { type: undefined };
		entitySchema.type = target.name;
		entitySchema.options = options;
		DecoratorHelper.setSchema(target, entitySchema);
	};
}
