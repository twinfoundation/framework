// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable max-classes-per-file */

import { nameof } from "@twin.org/nameof";
import { Factory } from "../../src/factories/factory";
import type { IComponent } from "../../src/models/IComponent";
import { I18n } from "../../src/utils/i18n";

// eslint-disable-next-line @typescript-eslint/naming-convention
const TestFactory = Factory.createFactory<IComponent>("component");

/**
 * Test component for validation.
 */
class TestComponent implements IComponent {
	/**
	 * The name of the component.
	 */
	public readonly CLASS_NAME: string;

	/**
	 * The name of the component.
	 */
	public readonly name: string;

	/**
	 * Validation property.
	 */
	public foo: number;

	/**
	 * Create a new instance of TestComponent.
	 * @param name The name of the component.
	 */
	constructor(name: string) {
		this.CLASS_NAME = nameof<TestComponent>();
		this.name = name;
		this.foo = 1;
	}
}

describe("Factory", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../../locales/en.json"));
	});

	test("register can fail if name is undefined", () => {
		expect(() => TestFactory.register(undefined as never, undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("register can fail if component is undefined", () => {
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
		expect(I18n.hasMessage("error.factory.noGet")).toEqual(true);
	});

	test("register and get can succeed", () => {
		TestFactory.register("test", () => new TestComponent("test"));
		const t = TestFactory.get<TestComponent>("test");
		expect(t).toBeDefined();
		if (t) {
			expect(t.foo).toEqual(1);
		}
	});

	test("register and get can succeed and return same instance", () => {
		const testComponent = new TestComponent("test2");
		TestFactory.register("test2", () => testComponent);
		const t2 = TestFactory.get<TestComponent>("test2");
		if (t2) {
			expect(t2).toBeDefined();
			expect(t2.foo).toEqual(1);
		}
		testComponent.foo = 2;
		const t2b = TestFactory.get<TestComponent>("test2");
		if (t2b) {
			expect(t2b.foo).toEqual(2);
		}
	});

	test("unregister can succeed", () => {
		TestFactory.register("test3", () => new TestComponent("test3"));
		const t3 = TestFactory.get<TestComponent>("test3");
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
		expect(I18n.hasMessage("error.factory.noUnregister")).toEqual(true);
	});

	test("can reset the factory", () => {
		TestFactory.register("test3", () => new TestComponent("test3"));
		expect(TestFactory.get<TestComponent>("test3").foo).toEqual(1);
		TestFactory.get<TestComponent>("test3").foo = 2;
		TestFactory.reset();
		expect(TestFactory.get<TestComponent>("test3").foo).toEqual(1);
	});

	test("can auto register components", () => {
		const testFactory = Factory.createFactory<TestComponent>("component1", true);
		testFactory.register("test1", () => new TestComponent("test1"));
		const instanceList = testFactory.instancesList();
		expect(instanceList.length).toEqual(1);
		expect(instanceList[0].name).toEqual("test1");
	});

	test("can register multiple components and get them as an array ordered by addition order", () => {
		const testFactory = Factory.createFactory<TestComponent>("component1");
		testFactory.register("test3", () => new TestComponent("test3"));
		testFactory.register("test2", () => new TestComponent("test2"));
		testFactory.register("test1", () => new TestComponent("test1"));
		testFactory.get("test1");
		testFactory.get("test2");
		testFactory.get("test3");
		const instanceList = testFactory.instancesList();
		expect(instanceList.length).toEqual(3);
		expect(instanceList[0].name).toEqual("test3");
		expect(instanceList[1].name).toEqual("test2");
		expect(instanceList[2].name).toEqual("test1");
	});

	test("can register multiple components and get them as a map", () => {
		const testFactory = Factory.createFactory<TestComponent>("component1");
		testFactory.register("test3", () => new TestComponent("test3"));
		testFactory.register("test2", () => new TestComponent("test2"));
		testFactory.register("test1", () => new TestComponent("test1"));
		testFactory.get("test1");
		testFactory.get("test2");
		testFactory.get("test3");
		const instanceMap = testFactory.instancesMap();
		expect(Object.keys(instanceMap).length).toEqual(3);
		expect(instanceMap.test3.name).toEqual("test3");
		expect(instanceMap.test2.name).toEqual("test2");
		expect(instanceMap.test1.name).toEqual("test1");
	});

	test("can register multiple components and get their names as an array ordered by addition order", () => {
		const testFactory = Factory.createFactory<TestComponent>("component1");
		testFactory.register("test3", () => new TestComponent("test3"));
		testFactory.register("test2", () => new TestComponent("test2"));
		testFactory.register("test1", () => new TestComponent("test1"));
		const names = testFactory.names();
		expect(names.length).toEqual(3);
		expect(names[0]).toEqual("test3");
		expect(names[1]).toEqual("test2");
		expect(names[2]).toEqual("test1");
	});

	test("can have two factories which don't collide", () => {
		const testFactory1 = Factory.createFactory<IComponent>("component11");
		const testFactory2 = Factory.createFactory<IComponent>("component12");
		testFactory1.register("test1", () => new TestComponent("test1"));
		testFactory2.register("test2", () => new TestComponent("test2"));

		const names1 = testFactory1.names();
		expect(names1.length).toEqual(1);
		expect(names1[0]).toEqual("test1");

		const names2 = testFactory2.names();
		expect(names2.length).toEqual(1);
		expect(names2[0]).toEqual("test2");
	});

	test("can use a different name matching strategy", () => {
		const testFactory1 = Factory.createFactory<IComponent>("component21", false, (names, name) =>
			names.find(n => `@${n}` === name)
		);
		testFactory1.register("test1", () => new TestComponent("test1"));

		const instance = testFactory1.get("@test1");
		expect(instance).toBeDefined();
	});
});
