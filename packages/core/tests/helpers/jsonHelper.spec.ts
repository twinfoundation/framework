// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { JsonHelper } from "../../src/helpers/jsonHelper";

describe("JsonHelper", () => {
	test("can canonicalize undefined", () => {
		expect(JsonHelper.canonicalize(undefined)).toEqual("");
	});

	test("can canonicalize null", () => {
		expect(JsonHelper.canonicalize(null)).toEqual("null");
	});

	test("can canonicalize a string", () => {
		expect(JsonHelper.canonicalize("foo")).toEqual('"foo"');
	});

	test("can canonicalize a number", () => {
		expect(JsonHelper.canonicalize(5)).toEqual("5");
	});

	test("can canonicalize a boolean", () => {
		expect(JsonHelper.canonicalize(true)).toEqual("true");
	});

	test("can canonicalize a date", () => {
		expect(JsonHelper.canonicalize(new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123)))).toEqual(
			'"1974-08-16T09:10:11.123Z"'
		);
	});

	test("can canonicalize an array and keep order", () => {
		expect(JsonHelper.canonicalize([1, 2, 3])).toEqual("[1,2,3]");
	});

	test("can canonicalize an array including undefined properties", () => {
		expect(JsonHelper.canonicalize([1, 2, undefined, 3])).toEqual("[1,2,null,3]");
	});

	test("can canonicalize an object and sort properties", () => {
		expect(JsonHelper.canonicalize({ b: 1, a: 2 })).toEqual('{"a":2,"b":1}');
	});

	test("can canonicalize an object and ignore undefined properties", () => {
		expect(JsonHelper.canonicalize({ b: 1, a: 2, c: undefined })).toEqual('{"a":2,"b":1}');
	});

	test("can canonicalize a complex object", () => {
		expect(
			JsonHelper.canonicalize({
				t: "foo",
				n: 43,
				dt: new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123)),
				arr: [1, 2, 3, { b: 123, a: "foo", c: undefined }, undefined]
			})
		).toEqual(
			'{"arr":[1,2,3,{"a":"foo","b":123},null],"dt":"1974-08-16T09:10:11.123Z","n":43,"t":"foo"}'
		);
	});

	test("can stringify an object with extended types", () => {
		expect(
			JsonHelper.stringifyEx({
				str: "foo",
				num: 123,
				bool: true,
				array: [1, 2, 3],
				object: { foo: "bar" },
				dt: new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123)),
				bigint: BigInt(123),
				uint8: new Uint8Array([1, 2, 3])
			})
		).toEqual(
			'{"str":"foo","num":123,"bool":true,"array":[1,2,3],"object":{"foo":"bar"},"dt":{"@ext":"date","value":145876211123},"bigint":{"@ext":"bigint","value":"123"},"uint8":{"@ext":"uint8array","value":"AQID"}}'
		);
	});

	test("can parse JSON with extended types", () => {
		expect(
			JsonHelper.parseEx(
				'{"str":"foo","num":123,"bool":true,"array":[1,2,3],"object":{"foo":"bar"},"dt":{"@ext":"date","value":145876211123},"bigint":{"@ext":"bigint","value":"123"},"uint8":{"@ext":"uint8array","value":"AQID"}}'
			)
		).toEqual({
			str: "foo",
			num: 123,
			bool: true,
			array: [1, 2, 3],
			object: { foo: "bar" },
			dt: new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123)),
			bigint: BigInt(123),
			uint8: new Uint8Array([1, 2, 3])
		});
	});

	test("can create a diff set", () => {
		const obj1 = {
			str: "foo",
			num: 123,
			bool: true
		};

		const obj2 = {
			str: "foo",
			num: 456,
			bool: true
		};

		const diff = JsonHelper.diff(obj1, obj2);
		expect(diff).toEqual([
			{
				path: "/num",
				op: "replace",
				value: 456
			}
		]);
	});

	test("can apply a diff set", () => {
		const obj1 = {
			str: "foo",
			num: 123,
			bool: true
		};

		const result = JsonHelper.patch(obj1, [
			{
				path: "/num",
				op: "replace",
				value: 456
			}
		]);

		expect(result).toEqual({
			str: "foo",
			num: 456,
			bool: true
		});
	});

	test("can fail to apply a diff set", () => {
		const obj1 = {
			str: "foo",
			num: 123,
			bool: true
		};

		expect(() =>
			JsonHelper.patch(obj1, [
				{
					path: "/num1",
					op: "replace",
					value: 456
				}
			])
		).toThrow("failedPatch");
	});
});
