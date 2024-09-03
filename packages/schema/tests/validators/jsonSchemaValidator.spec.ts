// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { JSONSchema7 } from "json-schema";
import { JsonSchemaValidator } from "../../src/validators/jsonSchemaValidator";

describe("JsonSchemaValidator", () => {
	test("Can fail to validate a string when value is not string", async () => {
		const schema: JSONSchema7 = {
			type: "string"
		};

		const data = 123;

		const validation = await JsonSchemaValidator.validate(schema, data);

		expect(validation.result).toBeFalsy();
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

		const validation = await JsonSchemaValidator.validate(schema, data);

		expect(validation.result).toBeTruthy();
		expect(validation.error).toBeUndefined();
	});

	test("Can fail to validate a number when value is not number", async () => {
		const schema: JSONSchema7 = {
			type: "number"
		};

		const data = "123";

		const validation = await JsonSchemaValidator.validate(schema, data);

		expect(validation.result).toBeFalsy();
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

		const validation = await JsonSchemaValidator.validate(schema, data);

		expect(validation.result).toBeTruthy();
		expect(validation.error).toBeUndefined();
	});
});
