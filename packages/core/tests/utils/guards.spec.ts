// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards } from "../../src/utils/guards";
import { I18n } from "../../src/utils/i18n";

describe("Guards", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../../locales/en.json"));
	});

	test("string can fail if value is undefined", () => {
		expect(() => Guards.string("source", "propName", undefined)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.string" })
		);
		expect(I18n.hasMessage("error.guard.string")).toEqual(true);
	});

	test("string can fail if value is null", () => {
		expect(() => Guards.string("source", "propName", null)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.string" })
		);
		expect(I18n.hasMessage("error.guard.string")).toEqual(true);
	});

	test("string can fail if value is a number", () => {
		expect(() => Guards.string("source", "propName", 10)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.string" })
		);
		expect(I18n.hasMessage("error.guard.string")).toEqual(true);
	});

	test("string can fail if value is a boolean", () => {
		expect(() => Guards.string("source", "propName", true)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.string" })
		);
		expect(I18n.hasMessage("error.guard.string")).toEqual(true);
	});

	test("string can succeed if value is a string", () => {
		expect(Guards.string("source", "propName", "")).toBeUndefined();
	});

	test("stringValue can fail if value is undefined", () => {
		expect(() => Guards.stringValue("source", "propName", undefined)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.string" })
		);
		expect(I18n.hasMessage("error.guard.string")).toEqual(true);
	});

	test("stringValue can fail if value is null", () => {
		expect(() => Guards.stringValue("source", "propName", null)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.string" })
		);
		expect(I18n.hasMessage("error.guard.string")).toEqual(true);
	});

	test("stringValue can fail if value is a number", () => {
		expect(() => Guards.stringValue("source", "propName", 10)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.string" })
		);
		expect(I18n.hasMessage("error.guard.string")).toEqual(true);
	});

	test("stringValue can fail if value is a boolean", () => {
		expect(() => Guards.stringValue("source", "propName", true)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.string" })
		);
		expect(I18n.hasMessage("error.guard.string")).toEqual(true);
	});

	test("stringValue can fail if value is an empty string", () => {
		expect(() => Guards.stringValue("source", "propName", "")).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.stringEmpty" })
		);
		expect(I18n.hasMessage("error.guard.stringEmpty")).toEqual(true);
	});

	test("stringValue can succeed if value is a string", () => {
		expect(Guards.stringValue("source", "propName", "a")).toBeUndefined();
	});

	test("json can fail if value is an empty string", () => {
		expect(() => Guards.json("source", "propName", "")).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.stringJson" })
		);
		expect(I18n.hasMessage("error.guard.stringJson")).toEqual(true);
	});

	test("json can succeed if value is a json string", () => {
		expect(Guards.json("source", "propName", '"aaa"')).toBeUndefined();
	});

	test("json can succeed if value is a json object", () => {
		expect(Guards.json("source", "propName", "{}")).toBeUndefined();
	});

	test("json can succeed if value is a json object", () => {
		expect(Guards.json("source", "propName", "{}")).toBeUndefined();
	});

	test("number can fail if value is not a number", () => {
		expect(() => Guards.number("source", "propName", undefined)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.number" })
		);
		expect(I18n.hasMessage("error.guard.number")).toEqual(true);
	});

	test("number can fail if value is a boolean", () => {
		expect(() => Guards.number("source", "propName", true)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.number" })
		);
		expect(I18n.hasMessage("error.guard.number")).toEqual(true);
	});

	test("number can fail if value is not a finite number", () => {
		expect(() => Guards.number("source", "propName", Number.POSITIVE_INFINITY)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.number" })
		);
		expect(I18n.hasMessage("error.guard.number")).toEqual(true);
	});

	test("number can fail if value is not a number", () => {
		expect(() => Guards.number("source", "propName", Number.NaN)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.number" })
		);
		expect(I18n.hasMessage("error.guard.number")).toEqual(true);
	});

	test("number can succeed if value is a number", () => {
		expect(Guards.number("source", "propName", 1.2345)).toBeUndefined();
	});

	test("boolean can fail if value is a falsy value", () => {
		expect(() => Guards.boolean("source", "propName", 0)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.boolean" })
		);
		expect(I18n.hasMessage("error.guard.boolean")).toEqual(true);
	});

	test("boolean can fail if value is a truthy value", () => {
		expect(() => Guards.boolean("source", "propName", 1)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.boolean" })
		);
		expect(I18n.hasMessage("error.guard.boolean")).toEqual(true);
	});

	test("boolean can succeed if value is a true boolean", () => {
		expect(Guards.boolean("source", "propName", true)).toBeUndefined();
		expect(I18n.hasMessage("error.guard.boolean")).toEqual(true);
	});

	test("boolean can succeed if value is a false boolean", () => {
		expect(Guards.boolean("source", "propName", false)).toBeUndefined();
		expect(I18n.hasMessage("error.guard.boolean")).toEqual(true);
	});

	test("date can fail if value is a undefined value", () => {
		expect(() => Guards.date("source", "propName", undefined)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.date" })
		);
		expect(I18n.hasMessage("error.guard.date")).toEqual(true);
	});

	test("date can fail if value is a null value", () => {
		expect(() => Guards.date("source", "propName", null)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.date" })
		);
		expect(I18n.hasMessage("error.guard.date")).toEqual(true);
	});

	test("date can fail if value is an invalid ate", () => {
		expect(() => Guards.date("source", "propName", new Date("foo"))).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.date" })
		);
		expect(I18n.hasMessage("error.guard.date")).toEqual(true);
	});

	test("date can succeed if value is a valid date", () => {
		expect(Guards.date("source", "propName", new Date())).toBeUndefined();
	});

	test("object can fail if value is undefined", () => {
		expect(() => Guards.object("source", "propName", undefined)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.objectUndefined" })
		);
		expect(I18n.hasMessage("error.guard.objectUndefined")).toEqual(true);
	});

	test("object can fail if value is null", () => {
		expect(() => Guards.object("source", "propName", null)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.object" })
		);
		expect(I18n.hasMessage("error.guard.object")).toEqual(true);
	});

	test("object can fail if value is not an object", () => {
		expect(() => Guards.object("source", "propName", 5)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.object" })
		);
		expect(I18n.hasMessage("error.guard.object")).toEqual(true);
	});

	test("object can succeed if value is an object", () => {
		expect(Guards.object("source", "propName", {})).toBeUndefined();
	});

	test("array can fail if value is undefined", () => {
		expect(() => Guards.array("source", "propName", undefined)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.array" })
		);
		expect(I18n.hasMessage("error.guard.array")).toEqual(true);
	});

	test("array can fail if value is null", () => {
		expect(() => Guards.array("source", "propName", null)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.array" })
		);
		expect(I18n.hasMessage("error.guard.array")).toEqual(true);
	});

	test("array can fail if value is not an array", () => {
		expect(() => Guards.array("source", "propName", 5)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.array" })
		);
		expect(I18n.hasMessage("error.guard.array")).toEqual(true);
	});

	test("array can succeed if value is an array", () => {
		expect(Guards.array("source", "propName", [])).toBeUndefined();
	});

	test("arrayValue can fail if value is undefined", () => {
		expect(() => Guards.arrayValue("source", "propName", undefined)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.array" })
		);
		expect(I18n.hasMessage("error.guard.array")).toEqual(true);
	});

	test("arrayValue can fail if value is an empty array", () => {
		expect(() => Guards.arrayValue("source", "propName", [])).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.arrayValue" })
		);
		expect(I18n.hasMessage("error.guard.arrayValue")).toEqual(true);
	});

	test("arrayValue can succeed if value is an array with at least one item", () => {
		expect(Guards.arrayValue("source", "propName", [1])).toBeUndefined();
	});

	test("arrayOneOf can fail if the options are undefined", () => {
		expect(() =>
			Guards.arrayOneOf("source", "propName", 1, undefined as unknown as number[])
		).toThrow(expect.objectContaining({ name: "GuardError", message: "guard.array" }));
		expect(I18n.hasMessage("error.guard.array")).toEqual(true);
	});

	test("arrayOneOf can fail if value is not in array", () => {
		expect(() => Guards.arrayOneOf<number>("source", "propName", 1, [2, 3])).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.arrayOneOf" })
		);
		expect(I18n.hasMessage("error.guard.arrayOneOf")).toEqual(true);
	});

	test("arrayOneOf can succeed if value is in options array", () => {
		expect(Guards.arrayOneOf("source", "propName", 1, [1, 2, 3])).toBeUndefined();
	});

	test("uint8Array can fail if value is not a Uint8Array", () => {
		expect(() => Guards.uint8Array("source", "propName", undefined)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.uint8Array" })
		);
		expect(I18n.hasMessage("error.guard.uint8Array")).toEqual(true);
	});

	test("uint8Array can succeed if value is a Uint8Array", () => {
		expect(Guards.uint8Array("source", "propName", new Uint8Array())).toBeUndefined();
	});

	test("function can fail if value is not a function", () => {
		expect(() => Guards.function("source", "propName", undefined)).toThrow(
			expect.objectContaining({ name: "GuardError", message: "guard.function" })
		);
		expect(I18n.hasMessage("error.guard.function")).toEqual(true);
	});

	test("function can succeed if value is a function", () => {
		expect(Guards.function("source", "propName", () => {})).toEqual(true);
	});
});
