// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ObjectHelper } from "../../src/helpers/objectHelper";
import { I18n } from "../../src/utils/i18n";

describe("ObjectHelper", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../../locales/en.json"));
	});

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
		expect(I18n.hasMessage("error.objectHelper.failedBytesToJSON")).toEqual(true);
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

	test("omit can return the original object with no keys provided", () => {
		const result = ObjectHelper.omit({ foo: "bar", val1: true });

		expect(result.foo).toEqual("bar");
		expect(result.val1).toEqual(true);
	});

	test("omit can return the original object with empty keys provided", () => {
		const result = ObjectHelper.omit({ foo: "bar", val1: true }, []);

		expect(result.foo).toEqual("bar");
		expect(result.val1).toEqual(true);
	});

	test("omit can exclude a subset when keys are provided", () => {
		const result = ObjectHelper.omit({ foo: "bar", val1: true, val2: false }, ["val2"]);

		expect(result.foo).toEqual("bar");
		expect(result.val1).toEqual(true);
		expect(result.val2).toBeUndefined();
	});

	test("can merge undefined objects", () => {
		const result = ObjectHelper.merge(undefined, undefined);
		expect(result).toEqual(undefined);
	});

	test("can merge null objects", () => {
		const result = ObjectHelper.merge(null, null);
		expect(result).toEqual(null);
	});

	test("can merge object with undefined", () => {
		const result = ObjectHelper.merge({ a: true }, undefined);
		expect(result).toEqual({ a: true });
	});

	test("can merge undefined with object", () => {
		const result = ObjectHelper.merge(undefined, { a: true });
		expect(result).toEqual({ a: true });
	});

	test("can merge object with null", () => {
		const result = ObjectHelper.merge({ a: true }, null);
		expect(result).toEqual({ a: true });
	});

	test("can merge null with object", () => {
		const result = ObjectHelper.merge(null, { a: true });
		expect(result).toEqual({ a: true });
	});

	test("can merge object with array and maintain original object", () => {
		const result = ObjectHelper.merge({ a: true }, [1]);
		expect(result).toEqual({ a: true });
	});

	test("can merge array with object and maintain original object", () => {
		const result = ObjectHelper.merge([1], { a: true });
		expect(result).toEqual([1]);
	});

	test("can merge object with object with single layer", () => {
		const result = ObjectHelper.merge({ a: true }, { b: false });
		expect(result).toEqual({ a: true, b: false });
	});

	test("can merge object with object with nested layers", () => {
		const result = ObjectHelper.merge({ a: true, c: { d: "foo" } }, { b: false, c: { e: "bar" } });
		expect(result).toEqual({ a: true, b: false, c: { d: "foo", e: "bar" } });
	});

	test("can get the property from an object", () => {
		const obj = { a: true };
		const result = ObjectHelper.propertyGet(obj, "a");
		expect(result).toEqual(true);
	});

	test("can not get the property from an object", () => {
		const obj = { a: true };
		const result = ObjectHelper.propertyGet(obj, "b");
		expect(result).toEqual(undefined);
	});

	test("can get the property from a nested object", () => {
		const obj = { a: true, b: { c: { d: 123 } } };
		const result = ObjectHelper.propertyGet(obj, "b.c.d");
		expect(result).toEqual(123);
	});

	test("can not get the property from a nested object", () => {
		const obj = { a: true, b: { c: { d: 123 } } };
		const result = ObjectHelper.propertyGet(obj, "b.d.d");
		expect(result).toEqual(undefined);
	});

	test("can get the property using a the first array index", () => {
		const obj = { a: true, b: [0, 1, 2] };
		const result = ObjectHelper.propertyGet(obj, "b.0");
		expect(result).toEqual(0);
	});

	test("can get the property using a the last array index", () => {
		const obj = { a: true, b: [0, 1, 2] };
		const result = ObjectHelper.propertyGet(obj, "b.2");
		expect(result).toEqual(2);
	});

	test("can not get the property with empty array", () => {
		const obj = { a: true, b: [] };
		const result = ObjectHelper.propertyGet(obj, "b.0");
		expect(result).toEqual(undefined);
	});

	test("can not get the property with out of bounds array", () => {
		const obj = { a: true, b: [0, 1, 2] };
		const result = ObjectHelper.propertyGet(obj, "b.3");
		expect(result).toEqual(undefined);
	});

	test("can get the property using a array object", () => {
		const obj = { a: true, baa: [{ c: true }, 1, 2] };
		const result = ObjectHelper.propertyGet(obj, "baa.0.c");
		expect(result).toEqual(true);
	});

	test("can get the property using a sub array", () => {
		const obj = { a: true, b: [[0], 1, 2] };
		const result = ObjectHelper.propertyGet(obj, "b.0.0");
		expect(result).toEqual(0);
	});

	test("can set the property in an object that exists", () => {
		const obj = { a: true };
		ObjectHelper.propertySet(obj, "a", false);
		expect(obj.a).toEqual(false);
	});

	test("can set the property in an object that doesn't exist", () => {
		const obj: { a: boolean; b?: boolean } = { a: true };
		ObjectHelper.propertySet(obj, "b", false);
		expect(obj.b).toEqual(false);
	});

	test("can set the dotted property in an object that exists", () => {
		const obj: { a: boolean; b: { c?: number } } = { a: true, b: {} };
		ObjectHelper.propertySet(obj, "b.c", 123);
		expect(obj.b.c).toEqual(123);
	});

	test("can set the dotted property in an object that doesn't exist", () => {
		const obj: { a: boolean; b?: { c?: number } } = { a: true };
		ObjectHelper.propertySet(obj, "b.c", 123);
		expect(obj.b?.c).toEqual(123);
	});

	test("can set the dotted property in an array that exists", () => {
		const obj: { a: boolean; b: { c: number[] } } = { a: true, b: { c: [] } };
		ObjectHelper.propertySet(obj, "b.c.1", 123);
		expect(obj.b.c[1]).toEqual(123);
	});

	test("can set the dotted property in an array that doesn't exist", () => {
		const obj: { a: boolean; b?: { c?: number[] } } = { a: true };
		ObjectHelper.propertySet(obj, "b.c.1", 123);
		expect(obj.b?.c?.[1]).toEqual(123);
	});

	test("can set the dotted property in an array that exists on a subarray", () => {
		const obj: { a: boolean; b: number[][] } = { a: true, b: [[]] };
		ObjectHelper.propertySet(obj, "b.0.1", 123);
		expect(obj.b[0][1]).toEqual(123);
	});

	test("can set the dotted property in an array that doesn't exist", () => {
		const obj: { a: boolean; b?: number[][] } = { a: true };
		ObjectHelper.propertySet(obj, "b.0.1", 123);
		expect(obj.b?.[0][1]).toEqual(123);
	});

	test("can fail to set the dotted property on it's not an object", () => {
		const obj = { a: true, b: "" };
		expect(() => ObjectHelper.propertySet(obj, "b.c", 123)).toThrow(
			expect.objectContaining({ name: "GeneralError", message: "objectHelper.cannotSetProperty" })
		);
	});

	test("Can extract a property from a document and don't remove it", async () => {
		const doc = {
			"@context": "http://schema.org/",
			"@type": "Person",
			name: "Jane Doe"
		};

		const val = ObjectHelper.extractProperty(doc, ["@type"], false);
		expect(val).toEqual("Person");
		expect(doc).toEqual({
			"@context": "http://schema.org/",
			"@type": "Person",
			name: "Jane Doe"
		});
	});

	test("Can extract a property from a document and remove it", async () => {
		const doc = {
			"@context": "http://schema.org/",
			"@type": "Person",
			name: "Jane Doe"
		};

		const val = ObjectHelper.extractProperty(doc, ["@type"]);
		expect(val).toEqual("Person");
		expect(doc).toEqual({
			"@context": "http://schema.org/",
			name: "Jane Doe"
		});
	});

	test("Can extract a property from a document and remove it with multiple matching properties", async () => {
		const doc = {
			"@context": "http://schema.org/",
			"@type": "Person",
			type: "Person",
			name: "Jane Doe"
		};

		const val = ObjectHelper.extractProperty(doc, ["@type", "type"]);
		expect(val).toEqual("Person");
		expect(doc).toEqual({
			"@context": "http://schema.org/",
			name: "Jane Doe"
		});
	});

	test("can convert an object with extended types", () => {
		expect(
			ObjectHelper.toExtended({
				str: "foo",
				num: 123,
				bool: true,
				array: [1, 2, 3],
				object: { foo: "bar" },
				dt: new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123)),
				bigint: BigInt(123),
				uint8: new Uint8Array([1, 2, 3])
			})
		).toEqual({
			str: "foo",
			num: 123,
			bool: true,
			array: [1, 2, 3],
			object: { foo: "bar" },
			dt: { "@ext": "date", value: 145876211123 },
			bigint: { "@ext": "bigint", value: "123" },
			uint8: { "@ext": "uint8array", value: "AQID" }
		});
	});

	test("can convert an object containing extended types", () => {
		expect(
			ObjectHelper.fromExtended({
				str: "foo",
				num: 123,
				bool: true,
				array: [1, 2, 3],
				object: { foo: "bar" },
				dt: { "@ext": "date", value: 145876211123 },
				bigint: { "@ext": "bigint", value: "123" },
				uint8: { "@ext": "uint8array", value: "AQID" }
			})
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
});
