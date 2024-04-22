// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ObjectHelper } from "../../src/helpers/objectHelper";

describe("ObjectHelper", () => {
	test("toBytes can return empty array with undefined object", () => {
		expect(ObjectHelper.toBytes(undefined as never).length).toEqual(0);
	});

	test("toBytes can return array with null object", () => {
		expect(ObjectHelper.toBytes(null).length).toEqual(4);
	});

	test("toBytes can return array with an object", () => {
		expect(
			ObjectHelper.toBytes({
				foo: "bar"
			}).length
		).toEqual(13);
	});

	test("fromBytes can return undefined with undefined array", () => {
		expect(ObjectHelper.fromBytes(undefined)).toBeUndefined();
	});

	test("fromBytes can return undefined with null array", () => {
		expect(ObjectHelper.fromBytes(null)).toBeUndefined();
	});

	test("fromBytes can return an empty object with an empty array", () => {
		expect(ObjectHelper.fromBytes(new Uint8Array())).toBeUndefined();
	});

	test("fromBytes can return null with a non empty array", () => {
		expect(ObjectHelper.fromBytes(Uint8Array.from([110, 117, 108, 108]))).toEqual(null);
	});

	test("fromBytes can fail with invalid content", () => {
		expect(() => ObjectHelper.fromBytes(Uint8Array.from([110]))).toThrow(
			expect.objectContaining({ name: "GeneralError", message: "objectHelper.failedBytesToJSON" })
		);
	});

	test("fromBytes can return an object with a non empty array", () => {
		expect(
			ObjectHelper.fromBytes(
				Uint8Array.from([123, 34, 102, 111, 111, 34, 58, 34, 98, 97, 114, 34, 125])
			)
		).toEqual({
			foo: "bar"
		});
	});

	test("pick can return the original object with no keys provided", () => {
		const result = ObjectHelper.pick({ foo: "bar", val1: true });

		expect(result.foo).toEqual("bar");
		expect(result.val1).toEqual(true);
	});

	test("pick can return the original object with empty keys provided", () => {
		const result = ObjectHelper.pick({ foo: "bar", val1: true }, []);

		expect(result.foo).toEqual("bar");
		expect(result.val1).toEqual(true);
	});

	test("pick can return a subset when keys are provided", () => {
		const result = ObjectHelper.pick({ foo: "bar", val1: true, val2: false }, ["foo", "val1"]);

		expect(result.foo).toEqual("bar");
		expect(result.val1).toEqual(true);
		expect(result.val2).toBeUndefined();
	});
});
