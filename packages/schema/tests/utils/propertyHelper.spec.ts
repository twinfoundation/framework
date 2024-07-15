// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IProperty } from "../../src/models/IProperty";
import { PropertyHelper } from "../../src/utils/propertyHelper";

describe("PropertyHelper", () => {
	test("Get value can throw if no key", () => {
		expect(() => PropertyHelper.getValue(undefined, undefined as unknown as string)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string",
				properties: {
					property: "key",
					value: "undefined"
				}
			})
		);
	});

	test("Get value can return undefined if no properties", () => {
		const value = PropertyHelper.getValue(undefined, "a");
		expect(value).toBeUndefined();
	});

	test("Get value can fail to return something when type does not match", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setText(properties, "a", "b");
		const value = PropertyHelper.getValue(properties, "a", "number");
		expect(value).toBeUndefined();
	});

	test("Get value can return something", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setText(properties, "a", "b");
		const value = PropertyHelper.getValue(properties, "a");
		expect(value).toEqual("b");
	});

	test("Set value can throw if no properties", () => {
		expect(() =>
			PropertyHelper.setValue(
				undefined as unknown as IProperty[],
				undefined as unknown as string,
				undefined as unknown as string,
				undefined
			)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.array",
				properties: {
					property: "properties",
					value: "undefined"
				}
			})
		);
	});

	test("Set value can throw if no key", () => {
		expect(() =>
			PropertyHelper.setValue(
				[],
				undefined as unknown as string,
				undefined as unknown as string,
				undefined
			)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string",
				properties: {
					property: "key",
					value: "undefined"
				}
			})
		);
	});

	test("Set value can throw if no type", () => {
		expect(() =>
			PropertyHelper.setValue([], "a", undefined as unknown as string, undefined)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string",
				properties: {
					property: "type",
					value: "undefined"
				}
			})
		);
	});

	test("Set value can store something", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setValue(properties, "a", "foo", "b");
		expect(properties.length).toEqual(1);
		expect(properties[0].key).toEqual("a");
		expect(properties[0].type).toEqual("foo");
		expect(properties[0].value).toEqual("b");
	});

	test("Set value can replace an existing value", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setValue(properties, "a", "foo", "b");
		PropertyHelper.setValue(properties, "a", "foo", "c");
		expect(properties.length).toEqual(1);
		expect(properties[0].key).toEqual("a");
		expect(properties[0].type).toEqual("foo");
		expect(properties[0].value).toEqual("c");
	});

	test("Set value can remove an item with undefined", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setValue(properties, "a", "foo", "b");
		PropertyHelper.setValue(properties, "a", "foo", undefined);
		expect(properties.length).toEqual(0);
	});

	test("Remove value can throw if no key", () => {
		expect(() => PropertyHelper.removeValue(undefined, undefined as unknown as string)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string",
				properties: {
					property: "key",
					value: "undefined"
				}
			})
		);
	});

	test("Remove value can remove a property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setText(properties, "a", "b");
		PropertyHelper.removeValue(properties, "a");
		expect(properties.length).toEqual(0);
	});

	test("Can set and get a text property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setText(properties, "a", "b");

		expect(properties[0].value).toEqual("b");

		const value = PropertyHelper.getText(properties, "a");
		expect(value).toEqual("b");
	});

	test("Can fail to set a text property when the type is not a string", () => {
		const properties: IProperty[] = [];
		expect(() => PropertyHelper.setText(properties, "a", 1 as unknown as string)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string",
				properties: {
					property: "value",
					value: 1
				}
			})
		);
	});

	test("Can set and get a urn property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setUrn(properties, "a", "urn:a:b");

		expect(properties[0].value).toEqual("urn:a:b");

		const value = PropertyHelper.getUrn(properties, "a");
		expect(value).toEqual("urn:a:b");
	});

	test("Can fail to set a urn property when the type is not a string", () => {
		const properties: IProperty[] = [];
		expect(() => PropertyHelper.setUrn(properties, "a", 1 as unknown as string)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string",
				properties: {
					property: "value",
					value: 1
				}
			})
		);
	});

	test("Can set and get an integer property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setInteger(properties, "a", 1);

		expect(properties[0].value).toEqual(1);

		const value = PropertyHelper.getInteger(properties, "a");
		expect(value).toEqual(1);
	});

	test("Can fail to set a integer property when the type is not an integer", () => {
		const properties: IProperty[] = [];
		expect(() => PropertyHelper.setInteger(properties, "a", 1.23)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.integer",
				properties: {
					property: "value",
					value: 1.23
				}
			})
		);
	});

	test("Can set and get a float property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setFloat(properties, "a", 1.23);

		expect(properties[0].value).toEqual(1.23);

		const value = PropertyHelper.getFloat(properties, "a");
		expect(value).toEqual(1.23);
	});

	test("Can fail to set a float property when the type is not an float", () => {
		const properties: IProperty[] = [];
		expect(() => PropertyHelper.setFloat(properties, "a", "" as unknown as number)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.number",
				properties: {
					property: "value",
					value: ""
				}
			})
		);
	});

	test("Can set and get a boolean property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setBoolean(properties, "a", true);

		expect(properties[0].value).toEqual(true);

		const value = PropertyHelper.getBoolean(properties, "a");
		expect(value).toEqual(true);
	});

	test("Can fail to set a boolean property when the type is not an boolean", () => {
		const properties: IProperty[] = [];
		expect(() => PropertyHelper.setBoolean(properties, "a", "" as unknown as boolean)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.boolean",
				properties: {
					property: "value",
					value: ""
				}
			})
		);
	});

	test("Can set and get a date time property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setDateTime(properties, "a", new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123)));

		expect(properties[0].value).toEqual("1974-08-16T09:10:11.123Z");

		const value = PropertyHelper.getDateTime(properties, "a");
		expect(value?.getUTCFullYear()).toEqual(1974);
		expect(value?.getUTCMonth()).toEqual(7);
		expect(value?.getUTCDate()).toEqual(16);
		expect(value?.getUTCHours()).toEqual(9);
		expect(value?.getUTCMinutes()).toEqual(10);
		expect(value?.getUTCSeconds()).toEqual(11);
		expect(value?.getUTCMilliseconds()).toEqual(123);
	});

	test("Can fail to set a date time property when the type is not an date time", () => {
		const properties: IProperty[] = [];
		expect(() => PropertyHelper.setDateTime(properties, "a", "" as unknown as Date)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.date",
				properties: {
					property: "value",
					value: ""
				}
			})
		);
	});

	test("Can set and get a date property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setDate(properties, "a", new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123)));

		expect(properties[0].value).toEqual("1974-08-16");

		const value = PropertyHelper.getDate(properties, "a");
		expect(value?.getUTCFullYear()).toEqual(1974);
		expect(value?.getUTCMonth()).toEqual(7);
		expect(value?.getUTCDate()).toEqual(16);
		expect(value?.getUTCHours()).toEqual(0);
		expect(value?.getUTCMinutes()).toEqual(0);
		expect(value?.getUTCSeconds()).toEqual(0);
		expect(value?.getUTCMilliseconds()).toEqual(0);
	});

	test("Can set an empty date", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setDate(properties, "a", undefined);
		expect(properties.length).toEqual(0);
	});

	test("Can fail to set a date property when the type is not an date", () => {
		const properties: IProperty[] = [];
		expect(() => PropertyHelper.setDateTime(properties, "a", "" as unknown as Date)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.date",
				properties: {
					property: "value",
					value: ""
				}
			})
		);
	});

	test("Can set and get a time property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setTime(properties, "a", new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123)));

		expect(properties[0].value).toEqual("09:10:11.123");

		const value = PropertyHelper.getTime(properties, "a");

		expect(value?.getUTCFullYear()).toEqual(1970);
		expect(value?.getUTCMonth()).toEqual(0);
		expect(value?.getUTCDate()).toEqual(1);
		expect(value?.getUTCHours()).toEqual(9);
		expect(value?.getUTCMinutes()).toEqual(10);
		expect(value?.getUTCSeconds()).toEqual(11);
		expect(value?.getUTCMilliseconds()).toEqual(123);
	});

	test("Can set an empty time", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setTime(properties, "a", undefined);
		expect(properties.length).toEqual(0);
	});

	test("Can fail to set a time property when the type is not an date", () => {
		const properties: IProperty[] = [];
		expect(() => PropertyHelper.setTime(properties, "a", "" as unknown as Date)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.date",
				properties: {
					property: "value",
					value: ""
				}
			})
		);
	});

	test("Can set and get a timestamp milliseconds property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setTimestampMilliseconds(properties, "a", 145876211123);

		expect(properties[0].value).toEqual(145876211123);

		const value = PropertyHelper.getTimestampMilliseconds(properties, "a");
		expect(value).toEqual(145876211123);
	});

	test("Can fail to set a timestamp milliseconds property when the type is not a timestamp milliseconds", () => {
		const properties: IProperty[] = [];
		expect(() => PropertyHelper.setTimestampMilliseconds(properties, "a", 1)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.timestampMilliseconds",
				properties: {
					property: "value",
					value: 1
				}
			})
		);
	});

	test("Can set and get a timestamp seconds property", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setTimestampSeconds(properties, "a", 145876211);

		expect(properties[0].value).toEqual(145876211);

		const value = PropertyHelper.getTimestampSeconds(properties, "a");
		expect(value).toEqual(145876211);
	});

	test("Can fail to set a timestamp seconds property when the type is not a timestamp seconds", () => {
		const properties: IProperty[] = [];
		expect(() => PropertyHelper.setTimestampSeconds(properties, "a", 145876211123)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.timestampSeconds",
				properties: {
					property: "value",
					value: 145876211123
				}
			})
		);
	});

	test("Include filter can return nothing if no properties", () => {
		expect(PropertyHelper.filterInclude(undefined, undefined)).toBeUndefined();
	});

	test("Include filter can return all entries if no filters", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setText(properties, "a", "b");
		const filtered = PropertyHelper.filterInclude(properties, undefined);
		expect(filtered?.length).toEqual(1);
	});

	test("Include filter can return reduced list if filtered", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setText(properties, "a", "b");
		PropertyHelper.setText(properties, "c", "d");
		const filtered = PropertyHelper.filterInclude(properties, ["c"]);
		expect(filtered?.length).toEqual(1);
		expect(filtered?.[0].key).toEqual("c");
	});

	test("Exclude filter can return nothing if no properties", () => {
		expect(PropertyHelper.filterExclude(undefined, undefined)).toBeUndefined();
	});

	test("Exclude filter can return all entries if no filters", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setText(properties, "a", "b");
		const filtered = PropertyHelper.filterExclude(properties, undefined);
		expect(filtered?.length).toEqual(1);
	});

	test("Exclude filter can return reduced list if filtered", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setText(properties, "a", "b");
		PropertyHelper.setText(properties, "c", "d");
		const filtered = PropertyHelper.filterExclude(properties, ["c"]);
		expect(filtered?.length).toEqual(1);
		expect(filtered?.[0].key).toEqual("a");
	});

	test("Can merge two property lists when the second is undefined", () => {
		const properties1: IProperty[] = [];
		PropertyHelper.setText(properties1, "a", "b");
		PropertyHelper.setText(properties1, "c", "d");

		const merged = PropertyHelper.merge(properties1, undefined as unknown as IProperty[]);

		expect(merged?.length).toEqual(2);
		expect(merged?.[0].key).toEqual("a");
		expect(merged?.[1].key).toEqual("c");
	});

	test("Can merge two property lists when the first is undefined", () => {
		const properties2: IProperty[] = [];
		PropertyHelper.setText(properties2, "e", "f");
		PropertyHelper.setText(properties2, "g", "h");

		const merged = PropertyHelper.merge(undefined as unknown as IProperty[], properties2);

		expect(merged?.length).toEqual(2);
		expect(merged?.[0].key).toEqual("e");
		expect(merged?.[1].key).toEqual("g");
	});

	test("Can merge two property lists", () => {
		const properties1: IProperty[] = [];
		PropertyHelper.setText(properties1, "a", "b");
		PropertyHelper.setText(properties1, "c", "d");

		const properties2: IProperty[] = [];
		PropertyHelper.setText(properties2, "e", "f");
		PropertyHelper.setText(properties2, "g", "h");

		const merged = PropertyHelper.merge(properties1, properties2);

		expect(merged?.length).toEqual(4);
		expect(merged?.[0].key).toEqual("a");
		expect(merged?.[1].key).toEqual("c");
		expect(merged?.[2].key).toEqual("e");
		expect(merged?.[3].key).toEqual("g");
	});

	test("Can merge two property lists with duplicate entries", () => {
		const properties1: IProperty[] = [];
		PropertyHelper.setText(properties1, "a", "b");
		PropertyHelper.setText(properties1, "c", "d");

		const properties2: IProperty[] = [];
		PropertyHelper.setText(properties2, "a", "d");
		PropertyHelper.setText(properties2, "g", "h");

		const merged = PropertyHelper.merge(properties1, properties2);

		expect(merged?.length).toEqual(3);
		expect(merged?.[0].key).toEqual("a");
		expect(merged?.[0].value).toEqual("d");
		expect(merged?.[1].key).toEqual("c");
		expect(merged?.[2].key).toEqual("g");
	});

	test("Can create a custom type list", () => {
		/**
		 * Custom type.
		 */
		type CustomType = IProperty & { custom: string };

		const properties1: CustomType[] = [];
		PropertyHelper.setText<CustomType>(properties1, "a", "b", { custom: "custom1" });
		PropertyHelper.setText<CustomType>(properties1, "c", "d", { custom: "custom2" });

		const properties2: CustomType[] = [];
		PropertyHelper.setText(properties2, "a", "d", { custom: "custom3" });
		PropertyHelper.setText(properties2, "g", "h", { custom: "custom4" });

		const merged = PropertyHelper.merge(properties1, properties2);

		expect(merged?.length).toEqual(3);
		expect(merged?.[0].key).toEqual("a");
		expect(merged?.[0].value).toEqual("d");
		expect(merged?.[0].custom).toEqual("custom3");
		expect(merged?.[1].key).toEqual("c");
		expect(merged?.[1].custom).toEqual("custom2");
		expect(merged?.[2].key).toEqual("g");
		expect(merged?.[2].custom).toEqual("custom4");
	});
});
