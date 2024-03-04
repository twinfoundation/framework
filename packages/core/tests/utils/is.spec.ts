// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "../../src/utils/is";

describe("Is", () => {
	test("undefined can succeed if value is undefined", () => {
		expect(Is.undefined(undefined)).toEqual(true);
	});

	test("undefined can fail if value is null", () => {
		expect(Is.undefined(null)).toEqual(false);
	});

	test("null can succeed if value is null", () => {
		expect(Is.null(null)).toEqual(true);
	});

	test("null can fail if value is undefined", () => {
		expect(Is.null(undefined)).toEqual(false);
	});

	test("empty can succeed if value is undefined", () => {
		expect(Is.empty(undefined)).toEqual(true);
	});

	test("empty can succeed if value is null", () => {
		expect(Is.empty(null)).toEqual(true);
	});

	test("empty can fail if value is undefined", () => {
		expect(Is.notEmpty(undefined)).toEqual(false);
	});

	test("empty can fail if value is null", () => {
		expect(Is.notEmpty(null)).toEqual(false);
	});

	test("string can fail if value is undefined", () => {
		expect(Is.string(undefined)).toEqual(false);
	});

	test("string can fail if value is null", () => {
		expect(Is.string(null)).toEqual(false);
	});

	test("string can fail if value is a number", () => {
		expect(Is.string(10)).toEqual(false);
	});

	test("string can fail if value is a boolean", () => {
		expect(Is.string(true)).toEqual(false);
	});

	test("string can succeed if value is a string", () => {
		expect(Is.string("")).toEqual(true);
	});

	test("stringValue can fail if value is undefined", () => {
		expect(Is.stringValue(undefined)).toEqual(false);
	});

	test("stringValue can fail if value is null", () => {
		expect(Is.stringValue(null)).toEqual(false);
	});

	test("stringValue can fail if value is a number", () => {
		expect(Is.stringValue(10)).toEqual(false);
	});

	test("stringValue can fail if value is a boolean", () => {
		expect(Is.stringValue(true)).toEqual(false);
	});

	test("stringValue can fail if value is an empty string", () => {
		expect(Is.stringValue("")).toEqual(false);
	});

	test("stringValue can succeed if value is a string", () => {
		expect(Is.stringValue("a")).toEqual(true);
	});

	test("number can fail if value is not a number", () => {
		expect(Is.number(undefined)).toEqual(false);
	});

	test("number can fail if value is a boolean", () => {
		expect(Is.number(true)).toEqual(false);
	});

	test("number can fail if value is not a finite number", () => {
		expect(Is.number(Number.POSITIVE_INFINITY)).toEqual(false);
	});

	test("number can fail if value is not a number", () => {
		expect(Is.number(Number.NaN)).toEqual(false);
	});

	test("number can succeed if value is a number", () => {
		expect(Is.number(1.2345)).toEqual(true);
	});

	test("boolean can fail if value is a falsy value", () => {
		expect(Is.boolean(0)).toEqual(false);
	});

	test("boolean can fail if value is a truthy value", () => {
		expect(Is.boolean(1)).toEqual(false);
	});

	test("boolean can succeed if value is a true boolean", () => {
		expect(Is.boolean(true)).toEqual(true);
	});

	test("boolean can succeed if value is a false boolean", () => {
		expect(Is.boolean(false)).toEqual(true);
	});

	test("date can fail if value is an undefined value", () => {
		expect(Is.date(undefined)).toEqual(false);
	});

	test("date can fail if value is a null value", () => {
		expect(Is.date(null)).toEqual(false);
	});

	test("date can fail if value is an invalid date", () => {
		expect(Is.date(new Date("random_string"))).toEqual(false);
	});

	test("date can succeed if value is a date", () => {
		expect(Is.date(new Date())).toEqual(true);
	});

	test("dateString can fail if value is not a date string", () => {
		expect(Is.dateString("jhkh")).toEqual(false);
	});

	test("dateString can fail if value contains a time", () => {
		expect(Is.dateString("2021-09-28T13:25:09.249Z")).toEqual(false);
	});

	test("dateString can succeed if value is a date string", () => {
		expect(Is.dateString("2021-09-28")).toEqual(true);
	});

	test("dateTimeString can fail if value is not a time string", () => {
		expect(Is.dateTimeString("jhkh")).toEqual(false);
	});

	test("dateTimeString can succeed if value is a date string", () => {
		expect(Is.dateTimeString("2021-09-28T13:25:09.249Z")).toEqual(true);
	});

	test("timeString can fail if value is not a time string", () => {
		expect(Is.timeString("jhkh")).toEqual(false);
	});

	test("timeString can fail if value contains a date", () => {
		expect(Is.timeString("2021-09-28T13:25:09.249Z")).toEqual(false);
	});

	test("timeString can succeed if value is a time string", () => {
		expect(Is.timeString("13:25:09.249Z")).toEqual(true);
	});

	test("object can fail if value is undefined", () => {
		expect(Is.object(undefined)).toEqual(false);
	});

	test("object can fail if value is null", () => {
		expect(Is.object(null)).toEqual(false);
	});

	test("object can fail if value is not an object", () => {
		expect(Is.object(5)).toEqual(false);
	});

	test("object can fail if value is an array", () => {
		expect(Is.object([])).toEqual(false);
	});

	test("object can succeed if value is an object", () => {
		expect(Is.object({})).toEqual(true);
	});

	test("array can fail if value is undefined", () => {
		expect(Is.array(undefined)).toEqual(false);
	});

	test("array can fail if value is a null value", () => {
		expect(Is.array(null)).toEqual(false);
	});

	test("array can succeed if value is an empty array", () => {
		expect(Is.array([])).toEqual(true);
	});

	test("array can succeed if value is a value array", () => {
		expect(Is.array([1, 2, 3])).toEqual(true);
	});

	test("uint8Array can fail if value is not a Uint8Array", () => {
		expect(Is.uint8Array(undefined)).toEqual(false);
	});

	test("uint8Array can succeed if value is a Uint8Array", () => {
		expect(Is.uint8Array(new Uint8Array())).toEqual(true);
	});

	test("function can fail if value is not a function", () => {
		expect(Is.function(undefined)).toEqual(false);
	});

	test("function can succeed if value is a function", () => {
		expect(Is.function(() => {})).toEqual(true);
	});
});
