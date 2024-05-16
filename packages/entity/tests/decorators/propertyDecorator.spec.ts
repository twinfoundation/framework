// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-syntax */
import { property } from "../../src/decorators/propertyDecorator";
import { SortDirection } from "../../src/models/sortDirection";
import { DecoratorHelper } from "../../src/utils/decoratorHelper";

/**
 * Test entity.
 */
export class TestEntity {
	@property({ type: "integer" })
	public prop1: number = 0;
}

/**
 * Test entity2.
 */
export class TestEntity2 {
	@property({
		type: "string",
		optional: true,
		isPrimary: true,
		isSecondary: true,
		sortDirection: SortDirection.Ascending
	})
	public prop1: number = 0;
}

describe("PropertyDecorator", () => {
	test("Can set property metadata on a property", () => {
		expect(DecoratorHelper.getSchema(TestEntity)).toEqual({
			properties: [
				{
					property: "prop1",
					type: "integer"
				}
			]
		});
	});

	test("Can set property metadata with options on a property", () => {
		expect(DecoratorHelper.getSchema(TestEntity2)).toEqual({
			properties: [
				{
					property: "prop1",
					type: "string",
					optional: true,
					isPrimary: true,
					isSecondary: true,
					sortDirection: SortDirection.Ascending
				}
			]
		});
	});
});
