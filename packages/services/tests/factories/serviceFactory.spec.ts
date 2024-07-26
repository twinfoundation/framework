// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@gtsc/nameof";
import { ServiceFactory } from "../../src/factories/serviceFactory";
import type { IService } from "../../src/models/IService";

/**
 * Test service for validation.
 */
class TestService implements IService {
	/**
	 * The name of the service.
	 */
	public readonly CLASS_NAME: string;

	/**
	 * Validation property.
	 */
	public foo: number;

	/**
	 * Create a new instance of TestService.
	 */
	constructor() {
		this.CLASS_NAME = nameof<TestService>();
		this.foo = 1;
	}
}

describe("ServiceFactory", () => {
	test("register and get can succeed", () => {
		ServiceFactory.register("test", () => new TestService());
		const t = ServiceFactory.get<TestService>("test");
		expect(t).toBeDefined();
		if (t) {
			expect(t.foo).toEqual(1);
		}
	});
});
