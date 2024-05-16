// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Is, StringHelper } from "@gtsc/core";
import type { IEntitySchema } from "@gtsc/entity";
import type { JSONSchema7, JSONSchema7Definition } from "json-schema";

/**
 * Class to help with schemas.
 */
export class SchemaHelper {
	/**
	 * Convert an entity schema to JSON schema e.g https://example.com/schemas/.
	 * @param baseId The base Id for the schema.
	 * @param entitySchema The entity schema to convert.
	 * @returns The JSON schema for the entity.
	 */
	public static entityToJSON(baseId: string, entitySchema: IEntitySchema | undefined): JSONSchema7 {
		baseId = StringHelper.trimTrailingSlashes(baseId);

		const properties: {
			[key: string]: JSONSchema7Definition;
		} = {};

		const required: string[] = [];

		if (Is.arrayValue(entitySchema?.properties)) {
			for (const propertySchema of entitySchema.properties) {
				const jsonPropertySchema: JSONSchema7 = {
					type: propertySchema.type,
					description: propertySchema.description,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					examples: propertySchema.examples as unknown as any
				};

				if (Is.stringValue(propertySchema.itemType) && propertySchema.type === "array") {
					if (propertySchema.itemType === "object") {
						jsonPropertySchema.items = {
							$ref: propertySchema.itemTypeRef?.startsWith("http")
								? propertySchema.itemTypeRef
								: `${baseId}/${propertySchema.itemTypeRef}`
						};
					} else {
						jsonPropertySchema.items = {
							type: propertySchema.itemType
						};
					}
				} else if (propertySchema.type === "object") {
					delete jsonPropertySchema.type;
					jsonPropertySchema.$ref = propertySchema.itemTypeRef?.startsWith("http")
						? propertySchema.itemTypeRef
						: `${baseId}/${propertySchema.itemTypeRef}`;
				}

				properties[propertySchema.property] = jsonPropertySchema;

				if (!propertySchema.optional) {
					required.push(propertySchema.property);
				}
			}
		}

		return {
			$schema: "https://json-schema.org/draft/2020-12/schema",
			$id: `${baseId}/${entitySchema?.type}`,
			title: entitySchema?.type,
			type: entitySchema ? "object" : "null",
			description: entitySchema?.options?.description,
			required,
			properties,
			additionalProperties: false
		};
	}
}
