// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { ServiceFactory } from "../../src/factories/serviceFactory";
import type { ILogEntry } from "../../src/models/ILogEntry";
import type { IService } from "../../src/models/IService";

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

describe("ServiceFactory", () => {
	test("register can fail if name is undefined", () => {
		expect(() => ServiceFactory.register(undefined as never, undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("register can fail if service is undefined", () => {
		expect(() => ServiceFactory.register("test", undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.function"
			})
		);
	});

	test("get can fail if name is undefined", () => {
		expect(() => ServiceFactory.get(undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("get fail if unknown type", () => {
		expect(() => ServiceFactory.get("test")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factory.noGet"
			})
		);
	});

	test("register and get can succeed", () => {
		ServiceFactory.register("test", () => new TestService());
		const t = ServiceFactory.get<TestService>("test");
		expect(t).toBeDefined();
		if (t) {
			expect(t.foo).toEqual(1);
		}
	});

	test("register and get can succeed and return same instance", () => {
		const testService = new TestService();
		ServiceFactory.register("test2", () => testService);
		const t2 = ServiceFactory.get<TestService>("test2");
		if (t2) {
			expect(t2).toBeDefined();
			expect(t2.foo).toEqual(1);
		}
		testService.foo = 2;
		const t2b = ServiceFactory.get<TestService>("test2");
		if (t2b) {
			expect(t2b.foo).toEqual(2);
		}
	});

	test("unregister can succeed", () => {
		ServiceFactory.register("test3", () => new TestService());
		const t3 = ServiceFactory.get<TestService>("test3");
		if (t3) {
			expect(t3.foo).toEqual(1);
		}
		ServiceFactory.unregister("test3");
		expect(() => ServiceFactory.get("test3")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factory.noGet"
			})
		);
	});

	test("unregister can fail if name is undefined", () => {
		expect(() => ServiceFactory.unregister(undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("unregister can fail with unknown type", () => {
		expect(() => ServiceFactory.unregister("unknown")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factory.noUnregister"
			})
		);
	});

	test("can reset the factory", () => {
		ServiceFactory.register("test3", () => new TestService());
		expect(ServiceFactory.get<TestService>("test3").foo).toEqual(1);
		ServiceFactory.get<TestService>("test3").foo = 2;
		ServiceFactory.reset();
		expect(ServiceFactory.get<TestService>("test3").foo).toEqual(1);
	});
});
