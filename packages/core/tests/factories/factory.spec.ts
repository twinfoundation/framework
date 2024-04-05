// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable max-classes-per-file */

import type { ILogEntry } from "../../../services/src/models/ILogEntry";
import type { IService } from "../../../services/src/models/IService";
import { Factory } from "../../src/factories/factory";

// eslint-disable-next-line @typescript-eslint/naming-convention
const TestFactory = new Factory<IService>("service");

/**
 * Test service for validation.
 */
class TestService implements IService {
	/**
	 * Validation property.
	 */
	public foo: number;

	/**
	 * Create a new instance of TestService.
	 */
	constructor() {
		this.foo = 1;
	}

	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @returns The response of the bootstrapping as log entries.
	 */
	public async bootstrap(): Promise<ILogEntry[]> {
		return [];
	}
}

describe("Factory", () => {
	test("register can fail if name is undefined", () => {
		expect(() => TestFactory.register(undefined as never, undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("register can fail if service is undefined", () => {
		expect(() => TestFactory.register("test", undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.function"
			})
		);
	});

	test("get can fail if name is undefined", () => {
		expect(() => TestFactory.get(undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("get fail if unknown type", () => {
		expect(() => TestFactory.get("test")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factory.noGet"
			})
		);
	});

	test("register and get can succeed", () => {
		TestFactory.register("test", () => new TestService());
		const t = TestFactory.get<TestService>("test");
		expect(t).toBeDefined();
		if (t) {
			expect(t.foo).toEqual(1);
		}
	});

	test("register and get can succeed and return same instance", () => {
		const testService = new TestService();
		TestFactory.register("test2", () => testService);
		const t2 = TestFactory.get<TestService>("test2");
		if (t2) {
			expect(t2).toBeDefined();
			expect(t2.foo).toEqual(1);
		}
		testService.foo = 2;
		const t2b = TestFactory.get<TestService>("test2");
		if (t2b) {
			expect(t2b.foo).toEqual(2);
		}
	});

	test("unregister can succeed", () => {
		TestFactory.register("test3", () => new TestService());
		const t3 = TestFactory.get<TestService>("test3");
		if (t3) {
			expect(t3.foo).toEqual(1);
		}
		TestFactory.unregister("test3");
		expect(() => TestFactory.get("test3")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factory.noGet"
			})
		);
	});

	test("unregister can fail if name is undefined", () => {
		expect(() => TestFactory.unregister(undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("unregister can fail with unknown type", () => {
		expect(() => TestFactory.unregister("unknown")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factory.noUnregister"
			})
		);
	});

	test("can reset the factory", () => {
		TestFactory.register("test3", () => new TestService());
		expect(TestFactory.get<TestService>("test3").foo).toEqual(1);
		TestFactory.get<TestService>("test3").foo = 2;
		TestFactory.reset();
		expect(TestFactory.get<TestService>("test3").foo).toEqual(1);
	});

	test("can have two factories which don't collide", () => {
		const testFactory1 = new Factory<IService>("service1");
		const testFactory2 = new Factory<IService>("service2");
		testFactory1.register("test1", () => new TestService());
		testFactory2.register("test2", () => new TestService());

		const names1 = testFactory1.names();
		expect(names1.length).toEqual(1);
		expect(names1[0]).toEqual("test1");

		const names2 = testFactory2.names();
		expect(names2.length).toEqual(1);
		expect(names2[0]).toEqual("test2");
	});
});
