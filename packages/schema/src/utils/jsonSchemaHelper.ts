// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, StringHelper } from "@gtsc/core";
import type { IEntitySchema } from "@gtsc/entity";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { JSONSchema7 } from "json-schema";
import { DataTypeHandlerFactory } from "../factories/dataTypeHandlerFactory";
import type { ISchemaValidationError } from "../models/ISchemaValidationError";
import type { ISchemaValidationResult } from "../models/ISchemaValidationResult";

/**
 * A helper for JSON schemas.
 */
export class JsonSchemaHelper {
	/**
	 * Validates data against the schema.
	 * @param schema The schema to validate the data with.
	 * @param data The data to be validated.
	 * @param additionalTypes Additional types to add for reference, not already in DataTypeHandlerFactory.
	 * @returns Result containing errors if there are any.
	 */
	public static async validate<T = unknown>(
		schema: JSONSchema7,
		data: T,
		additionalTypes?: { [id: string]: JSONSchema7 }
	): Promise<ISchemaValidationResult> {
		const validator = new Ajv();
		addFormats(validator);

		const subTypes: string[] = [];
		JsonSchemaHelper.extractTypes(schema, subTypes);

		for (const subType of subTypes) {
			const subTypeHandler = DataTypeHandlerFactory.getIfExists(subType);
			if (Is.object(subTypeHandler?.schema)) {
				validator.addSchema(subTypeHandler.schema, subType);
			}
		}

		if (Is.objectValue(additionalTypes)) {
			for (const key in additionalTypes) {
				validator.addSchema(additionalTypes[key], key);
			}
		}

		const output: ISchemaValidationResult = {
			result: validator.validate(schema, data) as boolean
		};
		if (!output.result) {
			output.error = validator.errors as ISchemaValidationError;
		}

		return output;
	}

	/**
	 * Extracts the types from the schema.
	 * @param schema The schema to extract the types from.
	 * @param types The types to add to.
	 */
	public static extractTypes(schema: JSONSchema7, types: string[]): void {
		if (Is.stringValue(schema.$ref)) {
			types.push(schema.$ref);
		} else if (schema.type === "array" && Is.object(schema.items)) {
			JsonSchemaHelper.extractTypes(schema.items, types);
		} else if (schema.type === "object" && Is.objectValue(schema.properties)) {
			for (const key in schema.properties) {
				const childSchema = schema.properties[key];
				if (Is.object<JSONSchema7>(childSchema)) {
					JsonSchemaHelper.extractTypes(childSchema, types);
				}
			}
		}
	}

	/**
	 * Get the property type from a schema.
	 * @param schema The schema to extract the types from.
	 * @param propertyName The name of the property to get the type for.
	 * @returns The types of the property.
	 */
	public static getPropertyType(schema: JSONSchema7, propertyName: string): string | undefined {
		if (schema.type === "object" && Is.objectValue(schema.properties)) {
			const propertySchema = schema.properties[propertyName];
			if (Is.object<JSONSchema7>(propertySchema)) {
				if (Is.stringValue(propertySchema.$ref)) {
					return propertySchema.$ref;
				}
				return propertySchema.type as string;
			}
		}
	}

	/**
	 * Convert an entity schema to JSON schema e.g https://example.com/schemas/.
	 * @param entitySchema The entity schema to convert.
	 * @param baseDomain The base domain for local schemas e.g. https://schemas.gtsc.io/
	 * @returns The JSON schema for the entity.
	 */
	public static entitySchemaToJsonSchema(
		entitySchema: IEntitySchema | undefined,
		baseDomain?: string
	): JSONSchema7 {
		let domain = StringHelper.trimTrailingSlashes(baseDomain ?? "");
		if (domain.length > 0) {
			domain += "/";
		}

		const properties: {
			[key: string]: JSONSchema7;
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
								: `${domain}${propertySchema.itemTypeRef}`
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
						: `${domain}${propertySchema.itemTypeRef}`;
				}

				properties[propertySchema.property] = jsonPropertySchema;

				if (!propertySchema.optional) {
					required.push(propertySchema.property);
				}
			}
		}

		return {
			$schema: "https://json-schema.org/draft/2020-12/schema",
			$id: `${domain}${entitySchema?.type}`,
			title: entitySchema?.type,
			type: entitySchema ? "object" : "null",
			description: entitySchema?.options?.description,
			required,
			properties,
			additionalProperties: false
		};
	}
}
