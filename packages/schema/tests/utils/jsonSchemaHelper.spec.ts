// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, EntitySchemaHelper, property, SortDirection } from "@gtsc/entity";
import type { JSONSchema7 } from "json-schema";
import { FrameworkDataTypes } from "../../src/dataTypes/frameworkDataTypes";
import { DataTypeHandlerFactory } from "../../src/factories/dataTypeHandlerFactory";
import { JsonSchemaHelper } from "../../src/utils/jsonSchemaHelper";

/**
 * Test entity.
 */
@entity({ description: "My Test Entity" })
export class TestEntity {
	@property({
		type: "number",
		optional: true,
		isPrimary: true,
		isSecondary: true,
		sortDirection: SortDirection.Ascending,
		examples: [1, 2, 3],
		description: "My Number Property"
	})
	public prop1!: number;

	@property({
		type: "string",
		examples: ["a", "b", "c"],
		description: "My String Property"
	})
	public prop2!: string;

	@property({
		type: "array",
		itemType: "string"
	})
	public prop3!: string[];

	@property({
		type: "array",
		itemType: "object",
		itemTypeRef: "Event"
	})
	public prop4!: unknown[];

	@property({
		type: "object",
		itemTypeRef: "Book"
	})
	public prop5!: unknown;
}

describe("JsonSchemaHelper", () => {
	test("Can fail to validate a string when value is not string", async () => {
		const schema: JSONSchema7 = {
			type: "string"
		};

		const data = 123;

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(false);
		expect(validation.error).toEqual([
			{
				instancePath: "",
				schemaPath: "#/type",
				keyword: "type",
				params: {
					type: "string"
				},
				message: "must be string"
			}
		]);
	});

	test("Can validate a string", async () => {
		const schema: JSONSchema7 = {
			type: "string"
		};

		const data = "Hello World";

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(true);
		expect(validation.error).toBeUndefined();
	});

	test("Can fail to validate a number when value is not number", async () => {
		const schema: JSONSchema7 = {
			type: "number"
		};

		const data = "123";

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(false);
		expect(validation.error).toEqual([
			{
				instancePath: "",
				schemaPath: "#/type",
				keyword: "type",
				params: {
					type: "number"
				},
				message: "must be number"
			}
		]);
	});

	test("Can validate a number", async () => {
		const schema: JSONSchema7 = {
			type: "number"
		};

		const data = 123;

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(true);
		expect(validation.error).toBeUndefined();
	});

	test("Can fail to validate a property", async () => {
		FrameworkDataTypes.registerTypes();

		const schema = DataTypeHandlerFactory.getIfExists(FrameworkDataTypes.TYPE_PROPERTY)
			?.schema as JSONSchema7;

		const data = 123;

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(false);
		expect(validation.error).toEqual([
			{
				instancePath: "",
				schemaPath: "#/type",
				keyword: "type",
				params: {
					type: "object"
				},
				message: "must be object"
			}
		]);
	});

	test("Can validate a property", async () => {
		FrameworkDataTypes.registerTypes();

		const schema = DataTypeHandlerFactory.getIfExists(FrameworkDataTypes.TYPE_PROPERTY)
			?.schema as JSONSchema7;

		const data = {
			key: "foo",
			type: "string",
			value: "aaa"
		};

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(true);
		expect(validation.error).toBeUndefined();
	});

	test("Can fail to validate a property list", async () => {
		FrameworkDataTypes.registerTypes();

		const schema = DataTypeHandlerFactory.getIfExists(FrameworkDataTypes.TYPE_PROPERTY_LIST)
			?.schema as JSONSchema7;

		const data = 123;

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(false);
		expect(validation.error).toEqual([
			{
				instancePath: "",
				schemaPath: "#/type",
				keyword: "type",
				params: {
					type: "array"
				},
				message: "must be array"
			}
		]);
	});

	test("Can validate a property list", async () => {
		FrameworkDataTypes.registerTypes();

		const schema = DataTypeHandlerFactory.getIfExists(FrameworkDataTypes.TYPE_PROPERTY_LIST)
			?.schema as JSONSchema7;

		const data = [
			{
				key: "foo",
				type: "string",
				value: "aaa"
			}
		];

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(true);
		expect(validation.error).toBeUndefined();
	});

	test("Can extract the types from a schema when type is part of array", async () => {
		const types: string[] = [];
		JsonSchemaHelper.extractTypes(
			{
				type: "array",
				items: {
					$ref: "https://example.com/foo"
				}
			},
			types
		);

		expect(types).toEqual(["https://example.com/foo"]);
	});

	test("Can extract the types from a schema when type is part of array sub type", async () => {
		const types: string[] = [];
		JsonSchemaHelper.extractTypes(
			{
				type: "array",
				items: {
					type: "object",
					properties: {
						foo: {
							$ref: "https://example.com/foo"
						}
					}
				}
			},
			types
		);

		expect(types).toEqual(["https://example.com/foo"]);
	});

	test("Can extract the types from a schema when type is an object", async () => {
		const types: string[] = [];
		JsonSchemaHelper.extractTypes(
			{
				type: "object",
				properties: {
					foo: {
						$ref: "https://example.com/foo"
					}
				}
			},
			types
		);

		expect(types).toEqual(["https://example.com/foo"]);
	});

	test("Can fail to get the type for a property when the property does not exist", async () => {
		const type = JsonSchemaHelper.getPropertyType(
			{
				type: "object",
				properties: {
					foo: {
						type: "string"
					}
				}
			},
			"goo"
		);

		expect(type).toBeUndefined();
	});

	test("Can get the type for a property when it is a type", async () => {
		const type = JsonSchemaHelper.getPropertyType(
			{
				type: "object",
				properties: {
					foo: {
						type: "string"
					}
				}
			},
			"foo"
		);

		expect(type).toEqual("string");
	});

	test("Can get the type for a property when it is a reference", async () => {
		const type = JsonSchemaHelper.getPropertyType(
			{
				type: "object",
				properties: {
					foo: {
						$ref: "https://example.com/foo"
					}
				}
			},
			"foo"
		);

		expect(type).toEqual("https://example.com/foo");
	});

	test("Can convert an entity schema to a JSON schema", () => {
		const jsonSchema = JsonSchemaHelper.entitySchemaToJsonSchema(
			EntitySchemaHelper.getSchema(TestEntity),
			"https://schema.org/"
		);

		expect(jsonSchema.$schema).toEqual("https://json-schema.org/draft/2020-12/schema");
		expect(jsonSchema.$id).toEqual("https://schema.org/TestEntity");
		expect(jsonSchema.title).toEqual("TestEntity");
		expect(jsonSchema.type).toEqual("object");
		expect(jsonSchema.description).toEqual("My Test Entity");
		expect(jsonSchema.required).toEqual(["prop2", "prop3", "prop4", "prop5"]);
		expect(jsonSchema.properties?.prop1).toEqual({
			type: "number",
			description: "My Number Property",
			examples: [1, 2, 3]
		});
		expect(jsonSchema.properties?.prop2).toEqual({
			type: "string",
			description: "My String Property",
			examples: ["a", "b", "c"]
		});
		expect(jsonSchema.properties?.prop3).toEqual({
			type: "array",
			items: {
				type: "string"
			}
		});
		expect(jsonSchema.properties?.prop4).toEqual({
			type: "array",
			items: {
				$ref: "https://schema.org/Event"
			}
		});
		expect(jsonSchema.properties?.prop5).toEqual({
			$ref: "https://schema.org/Book"
		});
		expect(jsonSchema.additionalProperties).toEqual(false);
	});

	test("Can convert an entity schema to a JSON schema with no base domain", () => {
		const jsonSchema = JsonSchemaHelper.entitySchemaToJsonSchema(
			EntitySchemaHelper.getSchema(TestEntity)
		);

		expect(jsonSchema.$schema).toEqual("https://json-schema.org/draft/2020-12/schema");
		expect(jsonSchema.$id).toEqual("TestEntity");
		expect(jsonSchema.title).toEqual("TestEntity");
		expect(jsonSchema.type).toEqual("object");
		expect(jsonSchema.description).toEqual("My Test Entity");
		expect(jsonSchema.required).toEqual(["prop2", "prop3", "prop4", "prop5"]);
		expect(jsonSchema.properties?.prop1).toEqual({
			type: "number",
			description: "My Number Property",
			examples: [1, 2, 3]
		});
		expect(jsonSchema.properties?.prop2).toEqual({
			type: "string",
			description: "My String Property",
			examples: ["a", "b", "c"]
		});
		expect(jsonSchema.properties?.prop3).toEqual({
			type: "array",
			items: {
				type: "string"
			}
		});
		expect(jsonSchema.properties?.prop4).toEqual({
			type: "array",
			items: {
				$ref: "Event"
			}
		});
		expect(jsonSchema.properties?.prop5).toEqual({
			$ref: "Book"
		});
		expect(jsonSchema.additionalProperties).toEqual(false);
	});
});
