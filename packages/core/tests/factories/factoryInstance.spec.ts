// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable max-classes-per-file */

import type { ILogEntry } from "../../../services/src/models/ILogEntry";
import type { IService } from "../../../services/src/models/IService";
import { FactoryInstance } from "../../src/factories/factoryInstance";

/**
 * Test factory for validation.
 */
class TestFactory {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public static readonly Instance: FactoryInstance<IService> = new FactoryInstance<IService>(
		"service"
	);
}

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

describe("FactoryInstance", () => {
	test("register can fail if name is undefined", () => {
		expect(() => TestFactory.Instance.register(undefined as never, undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("register can fail if service is undefined", () => {
		expect(() => TestFactory.Instance.register("test", undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.function"
			})
		);
	});

	test("get can fail if name is undefined", () => {
		expect(() => TestFactory.Instance.get(undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("get fail if unknown type", () => {
		expect(() => TestFactory.Instance.get("test")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factoryInstance.noGet"
			})
		);
	});

	test("register and get can succeed", () => {
		TestFactory.Instance.register("test", () => new TestService());
		const t = TestFactory.Instance.get<TestService>("test");
		expect(t).toBeDefined();
		if (t) {
			expect(t.foo).toEqual(1);
		}
	});

	test("register and get can succeed and return same instance", () => {
		const testService = new TestService();
		TestFactory.Instance.register("test2", () => testService);
		const t2 = TestFactory.Instance.get<TestService>("test2");
		if (t2) {
			expect(t2).toBeDefined();
			expect(t2.foo).toEqual(1);
		}
		testService.foo = 2;
		const t2b = TestFactory.Instance.get<TestService>("test2");
		if (t2b) {
			expect(t2b.foo).toEqual(2);
		}
	});

	test("unregister can succeed", () => {
		TestFactory.Instance.register("test3", () => new TestService());
		const t3 = TestFactory.Instance.get<TestService>("test3");
		if (t3) {
			expect(t3.foo).toEqual(1);
		}
		TestFactory.Instance.unregister("test3");
		expect(() => TestFactory.Instance.get("test3")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factoryInstance.noGet"
			})
		);
	});

	test("unregister can fail if name is undefined", () => {
		expect(() => TestFactory.Instance.unregister(undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("unregister can fail with unknown type", () => {
		expect(() => TestFactory.Instance.unregister("unknown")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factoryInstance.noUnregister"
			})
		);
	});

	test("can reset the factory", () => {
		TestFactory.Instance.register("test3", () => new TestService());
		expect(TestFactory.Instance.get<TestService>("test3").foo).toEqual(1);
		TestFactory.Instance.get<TestService>("test3").foo = 2;
		TestFactory.Instance.reset();
		expect(TestFactory.Instance.get<TestService>("test3").foo).toEqual(1);
	});
});
