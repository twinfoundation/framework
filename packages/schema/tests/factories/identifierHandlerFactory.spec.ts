// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IValidationFailure } from "@gtsc/core";
import { IdentifierHandlerFactory } from "../../src/factories/identifierHandlerFactory";
import type { IIdentifierHandler } from "../../src/models/IIdentifierHandler";

/**
 * Test handler for validation.
 */
class TestIdentifierHandler implements IIdentifierHandler {
	public readonly namespace: string;

	/**
	 * Create a new instance of TestIdentifierHandler.
	 * @param namespace The namespace for the handler.
	 */
	constructor(namespace: string) {
		this.namespace = namespace;
	}

	/**
	 * A method for validating the identifier.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to validate.
	 * @param failures List of failures to add to.
	 * @returns True if the item is valid.
	 */
	public validate(propertyName: string, value: unknown, failures: IValidationFailure[]): boolean {
		return true;
	}
}

describe("IdentifierHandlerFactory", () => {
	test("Can match an identifier handler by a partial uri", () => {
		const testHandler = new TestIdentifierHandler("foo:bar");
		IdentifierHandlerFactory.register(testHandler.namespace, () => testHandler);
		const instance = IdentifierHandlerFactory.getIfExists("fred:foo:bar");
		expect(instance).toBeDefined();
	});
});
