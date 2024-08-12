// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { StringHelper } from "../../src/helpers/stringHelper";

describe("StringHelper", () => {
	test("can trim trailing slashes for undefined string", () => {
		expect(StringHelper.trimTrailingSlashes(undefined as never)).toEqual("");
	});

	test("can trim trailing slashes for empty string", () => {
		expect(StringHelper.trimTrailingSlashes("")).toEqual("");
	});

	test("can trim trailing slashes for string with no slashes", () => {
		expect(StringHelper.trimTrailingSlashes("abc")).toEqual("abc");
	});

	test("can trim trailing slashes for string with single slash", () => {
		expect(StringHelper.trimTrailingSlashes("abc/")).toEqual("abc");
	});

	test("can trim trailing slashes for string with multiple slashes", () => {
		expect(StringHelper.trimTrailingSlashes("abc////")).toEqual("abc");
	});

	test("can split kebab case into words", () => {
		expect(StringHelper.words("this-is-a-test")).toEqual(["this", "is", "a", "test"]);
	});

	test("can split snake case into words", () => {
		expect(StringHelper.words("this_is_a_test")).toEqual(["this", "is", "a", "test"]);
	});

	test("can split pascal case into words", () => {
		expect(StringHelper.words("ThisIsATest")).toEqual(["This", "Is", "A", "Test"]);
	});

	test("can split camel case into words", () => {
		expect(StringHelper.words("thisIsATest")).toEqual(["this", "Is", "A", "Test"]);
	});

	test("can split regular case into words", () => {
		expect(StringHelper.words("This is a test")).toEqual(["This", "is", "a", "test"]);
	});

	test("can split title case into words", () => {
		expect(StringHelper.words("This Is A Test")).toEqual(["This", "Is", "A", "Test"]);
	});

	test("can convert name to kebab case from Pascal case", () => {
		expect(StringHelper.kebabCase("ThisIsATest")).toEqual("this-is-a-test");
	});

	test("can convert name to kebab case from camel case", () => {
		expect(StringHelper.kebabCase("thisIsATest")).toEqual("this-is-a-test");
	});

	test("can convert name to kebab case from kebab case", () => {
		expect(StringHelper.kebabCase("this-is-a-test")).toEqual("this-is-a-test");
	});

	test("can convert name to kebab case from title case", () => {
		expect(StringHelper.kebabCase("This Is A Test")).toEqual("this-is-a-test");
	});

	test("can convert interface name to kebab case from Pascal case", () => {
		expect(StringHelper.kebabCase("IThisIsATest")).toEqual("this-is-a-test");
	});

	test("can convert interface name to kebab case from camel case", () => {
		expect(StringHelper.kebabCase("IThisIsATest")).toEqual("this-is-a-test");
	});

	test("can convert name to snake case from Pascal case", () => {
		expect(StringHelper.snakeCase("ThisIsATest")).toEqual("this_is_a_test");
	});

	test("can convert name to snake case from camel case", () => {
		expect(StringHelper.snakeCase("thisIsATest")).toEqual("this_is_a_test");
	});

	test("can convert name to snake case from snake case", () => {
		expect(StringHelper.snakeCase("this_is_a_test")).toEqual("this_is_a_test");
	});

	test("can convert name to snake case from title case", () => {
		expect(StringHelper.snakeCase("This Is A Test")).toEqual("this_is_a_test");
	});

	test("can convert interface name to snake case from Pascal case", () => {
		expect(StringHelper.snakeCase("IThisIsATest")).toEqual("this_is_a_test");
	});

	test("can convert interface name to snake case from camel case", () => {
		expect(StringHelper.snakeCase("IThisIsATest")).toEqual("this_is_a_test");
	});

	test("can convert name to camel case from Pascal case", () => {
		expect(StringHelper.camelCase("ThisIsATest")).toEqual("thisIsATest");
	});

	test("can convert name to camel case from camel case", () => {
		expect(StringHelper.camelCase("thisIsATest")).toEqual("thisIsATest");
	});

	test("can convert name to camel case from kebab case", () => {
		expect(StringHelper.camelCase("this-is-a-test")).toEqual("thisIsATest");
	});

	test("can convert name to camel case from title case", () => {
		expect(StringHelper.camelCase("This Is A Test")).toEqual("thisIsATest");
	});

	test("can convert interface name to camel case from Pascal case", () => {
		expect(StringHelper.camelCase("IThisIsATest")).toEqual("thisIsATest");
	});

	test("can convert interface name to camel case from camel case", () => {
		expect(StringHelper.camelCase("IThisIsATest")).toEqual("thisIsATest");
	});

	test("can convert name to title case from Pascal case", () => {
		expect(StringHelper.titleCase("ThisIsATest")).toEqual("This Is A Test");
	});

	test("can convert name to title case from camel case", () => {
		expect(StringHelper.titleCase("thisIsATest")).toEqual("This Is A Test");
	});

	test("can convert name to title case from kebab case", () => {
		expect(StringHelper.titleCase("this-is-a-test")).toEqual("This Is A Test");
	});

	test("can convert name to title case from title case", () => {
		expect(StringHelper.titleCase("This Is A Test")).toEqual("This Is A Test");
	});

	test("can convert interface name to title case from Pascal case", () => {
		expect(StringHelper.titleCase("IThisIsATest")).toEqual("This Is A Test");
	});

	test("can convert interface name to title case from camel case", () => {
		expect(StringHelper.titleCase("IThisIsATest")).toEqual("This Is A Test");
	});

	test("can convert name to Pascal case from Pascal case", () => {
		expect(StringHelper.pascalCase("ThisIsATest")).toEqual("ThisIsATest");
	});

	test("can convert name to Pascal case from camel case", () => {
		expect(StringHelper.pascalCase("thisIsATest")).toEqual("ThisIsATest");
	});

	test("can convert name to Pascal case from kebab case", () => {
		expect(StringHelper.pascalCase("this-is-a-test")).toEqual("ThisIsATest");
	});

	test("can convert name to Pascal case from title case", () => {
		expect(StringHelper.pascalCase("This Is A Test")).toEqual("ThisIsATest");
	});

	test("can convert interface name to Pascal case from Pascal case", () => {
		expect(StringHelper.pascalCase("IThisIsATest")).toEqual("ThisIsATest");
	});

	test("can convert interface name to Pascal case from camel case", () => {
		expect(StringHelper.pascalCase("IThisIsATest")).toEqual("ThisIsATest");
	});
});
