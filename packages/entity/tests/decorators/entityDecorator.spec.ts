// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable max-classes-per-file */
import { entity } from "../../src/decorators/entityDecorator";
import { DecoratorHelper } from "../../src/utils/decoratorHelper";

/**
 * Test entity.
 */
@entity()
export class TestEntity {}

describe("EntityDecorator", () => {
	test("Can set entity metadata on an entity", () => {
		expect(DecoratorHelper.getSchema(TestEntity)).toEqual({ type: "TestEntity" });
	});
});
