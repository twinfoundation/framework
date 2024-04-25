// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Coerce } from "../../src/utils/coerce";

describe("Coerce", () => {
	test("string can coerce if value is undefined", () => {
		expect(Coerce.string(undefined)).toEqual(undefined);
	});

	test("string can coerce if value is a string", () => {
		expect(Coerce.string("foo")).toEqual("foo");
	});

	test("string can coerce if value is a number", () => {
		expect(Coerce.string(123.45)).toEqual("123.45");
	});

	test("string can coerce if value is a false boolean", () => {
		expect(Coerce.string(false)).toEqual("false");
	});

	test("string can coerce if value is a true boolean", () => {
		expect(Coerce.string(true)).toEqual("true");
	});

	test("string can coerce if value is a date", () => {
		expect(Coerce.string(new Date(0))).toEqual("1970-01-01T00:00:00.000Z");
	});

	test("string can fail if value is an object", () => {
		expect(Coerce.string({})).toEqual(undefined);
	});

	test("number can coerce if value is undefined", () => {
		expect(Coerce.number(undefined)).toEqual(undefined);
	});

	test("number can coerce if value is a string", () => {
		expect(Coerce.number("123.45")).toEqual(123.45);
	});

	test("number can fail if value is an invalid string", () => {
		expect(Coerce.number("foo")).toEqual(undefined);
	});

	test("number can coerce if value is a number", () => {
		expect(Coerce.number(123.45)).toEqual(123.45);
	});

	test("number can coerce if value is a false boolean", () => {
		expect(Coerce.number(false)).toEqual(0);
	});

	test("number can coerce if value is a true boolean", () => {
		expect(Coerce.number(true)).toEqual(1);
	});

	test("number can coerce if value is a date", () => {
		expect(Coerce.number(new Date("1970-01-01T00:00:00.000Z"))).toEqual(0);
	});

	test("number can fail if value is an object", () => {
		expect(Coerce.number({})).toEqual(undefined);
	});

	test("bigint can coerce if value is undefined", () => {
		expect(Coerce.bigint(undefined)).toEqual(undefined);
	});

	test("bigint can coerce if value is a string", () => {
		expect(Coerce.bigint("123")).toEqual(123n);
	});

	test("bigint can fail if value is an invalid string", () => {
		expect(Coerce.bigint("123.45")).toEqual(undefined);
	});

	test("bigint can coerce if value is a bigint", () => {
		expect(Coerce.bigint(123n)).toEqual(123n);
	});

	test("bigint can coerce if value is a false boolean", () => {
		expect(Coerce.bigint(false)).toEqual(0n);
	});

	test("bigint can coerce if value is a true boolean", () => {
		expect(Coerce.bigint(true)).toEqual(1n);
	});

	test("bigint can fail if value is an object", () => {
		expect(Coerce.bigint({})).toEqual(undefined);
	});

	test("boolean can coerce if value is undefined", () => {
		expect(Coerce.boolean(undefined)).toEqual(undefined);
	});

	test("boolean can coerce if value is boolean", () => {
		expect(Coerce.boolean(true)).toEqual(true);
	});

	test("boolean can coerce if value is a true string", () => {
		expect(Coerce.boolean("True")).toEqual(true);
	});

	test("boolean can coerce if value is a false string", () => {
		expect(Coerce.boolean("False")).toEqual(false);
	});

	test("boolean can fail if value is an invalid string", () => {
		expect(Coerce.boolean("foo")).toEqual(undefined);
	});

	test("boolean can coerce if value is a number", () => {
		expect(Coerce.boolean(123.45)).toEqual(true);
	});

	test("boolean can coerce if value is a 0 boolean", () => {
		expect(Coerce.boolean(0)).toEqual(false);
	});

	test("boolean can fail if value is an object", () => {
		expect(Coerce.boolean({})).toEqual(undefined);
	});

	test("date can coerce if value is undefined", () => {
		expect(Coerce.date(undefined)).toEqual(undefined);
	});

	test("date can coerce if value is Date", () => {
		expect(Coerce.date(new Date(0))?.getTime()).toEqual(0);
	});

	test("date can coerce if value is an ISO date string", () => {
		expect(Coerce.date("2021-09-28T13:25:09.249Z")?.getTime()).toEqual(1632787200000);
	});

	test("date can coerce if value is an ISO time string", () => {
		expect(Coerce.time("2021-09-28T13:25:09.249Z")?.getTime()).toEqual(48309249);
	});

	test("date can coerce if value is an ISO date/time string", () => {
		expect(Coerce.dateTime("2021-09-28T13:25:09.249Z")?.getTime()).toEqual(1632835509249);
	});

	test("date can fail if value is an invalid string", () => {
		expect(Coerce.date("foo")).toEqual(undefined);
	});

	test("date can coerce if value is a number", () => {
		expect(Coerce.date(123.45)?.getTime()).toEqual(123);
	});

	test("date can fail if value is an object", () => {
		expect(Coerce.date({})).toEqual(undefined);
	});
});
