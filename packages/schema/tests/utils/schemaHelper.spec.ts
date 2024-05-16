// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-restricted-syntax */
import { EntitySchemaHelper, SortDirection, entity, property } from "@gtsc/entity";
import { SchemaHelper } from "../../src/utils/schemaHelper";

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
	public prop1: number = 0;

	@property({
		type: "string",
		examples: ["a", "b", "c"],
		description: "My String Property"
	})
	public prop2: string = "";

	@property({
		type: "array",
		itemType: "string"
	})
	public prop3: string[] = [];

	@property({
		type: "array",
		itemType: "object",
		itemTypeRef: "Event"
	})
	public prop4: unknown[] = [];

	@property({
		type: "object",
		itemTypeRef: "Book"
	})
	public prop5: unknown = {};
}

describe("SchemaHelper", () => {
	test("Can convert an entity schema to a JSON schema", () => {
		const jsonSchema = SchemaHelper.entityToJSON(
			"https://schema.org/",
			EntitySchemaHelper.getSchema(TestEntity)
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
});
