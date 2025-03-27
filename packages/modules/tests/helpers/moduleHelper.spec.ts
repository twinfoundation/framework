// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { ModuleHelper } from "../../src/helpers/moduleHelper";

const TEST_MODULE = `file://${path.join(__dirname, "testModule.js")}`;

describe("ModuleHelper", () => {
	test("getModuleEntry can throw if a module does not exist", async () => {
		await expect(ModuleHelper.getModuleEntry("non-existing-module", "entry")).rejects.toMatchObject(
			{
				name: "GeneralError",
				source: "ModuleHelper",
				message: "moduleHelper.moduleNotFound",
				properties: {
					module: "non-existing-module",
					entry: "entry"
				}
			}
		);
	});

	test("getModuleEntry can throw if a module entry does not exist", async () => {
		await expect(
			ModuleHelper.getModuleEntry(TEST_MODULE, "non-existing-entry")
		).rejects.toMatchObject({
			name: "GeneralError",
			source: "ModuleHelper",
			message: "moduleHelper.entryNotFound",
			properties: {
				module: TEST_MODULE,
				entry: "non-existing-entry"
			}
		});
	});

	test("execModuleMethod can throw if it is not a function", async () => {
		await expect(ModuleHelper.execModuleMethod(TEST_MODULE, "testValue")).rejects.toMatchObject({
			name: "GeneralError",
			source: "ModuleHelper",
			message: "moduleHelper.notFunction",
			properties: {
				module: TEST_MODULE,
				entry: "testValue"
			}
		});
	});

	test("execModuleMethod can get a result from a function with no parameters", async () => {
		expect(await ModuleHelper.execModuleMethod(TEST_MODULE, "testMethod")).toEqual(1);
	});

	test("execModuleMethod can get a result from a function with parameters", async () => {
		expect(await ModuleHelper.execModuleMethod(TEST_MODULE, "testMethodAdd", [1, 2])).toEqual(3);
	});

	test("execModuleMethod can get a result from a function with parameters from a module", async () => {
		expect(
			await ModuleHelper.execModuleMethod("@twin.org/core", "StringHelper.camelCase", ["foo-bar"])
		).toEqual("fooBar");
	});

	test("execModuleMethodThread can throw if a module does not exist", async () => {
		await expect(
			ModuleHelper.execModuleMethodThread("non-existing-module", "entry")
		).rejects.toMatchObject({
			name: "GeneralError",
			source: "ModuleHelper",
			message: "moduleHelper.moduleNotFound",
			properties: {
				module: "non-existing-module",
				entry: "entry"
			}
		});
	});

	test("execModuleMethodThread can throw if a module entry does not exist", async () => {
		await expect(
			ModuleHelper.execModuleMethodThread(TEST_MODULE, "non-existing-entry")
		).rejects.toMatchObject({
			name: "GeneralError",
			source: "ModuleHelper",
			message: "moduleHelper.entryNotFound",
			properties: {
				module: TEST_MODULE,
				entry: "non-existing-entry"
			}
		});
	});

	test("execModuleMethodThread can throw if it is not a function", async () => {
		await expect(
			ModuleHelper.execModuleMethodThread(TEST_MODULE, "testValue")
		).rejects.toMatchObject({
			name: "GeneralError",
			source: "ModuleHelper",
			message: "moduleHelper.notFunction",
			properties: {
				module: TEST_MODULE,
				entry: "testValue"
			}
		});
	});

	test("execModuleMethodThread can get a result from a function with no parameters", async () => {
		expect(await ModuleHelper.execModuleMethodThread(TEST_MODULE, "testMethod")).toEqual(1);
	});

	test("execModuleMethodThread can get a result from a function with parameters", async () => {
		expect(await ModuleHelper.execModuleMethodThread(TEST_MODULE, "testMethodAdd", [1, 2])).toEqual(
			3
		);
	});

	test("execModuleMethodThread can get a result from a function with parameters from a module", async () => {
		expect(
			await ModuleHelper.execModuleMethodThread("@twin.org/core", "StringHelper.camelCase", [
				"foo-bar"
			])
		).toEqual("fooBar");
	});
});
