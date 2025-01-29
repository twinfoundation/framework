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

	test("stringValue can fail if value is whitespace", () => {
		expect(Is.stringValue("  ")).toEqual(false);
	});

	test("stringValue can succeed if value is a string", () => {
		expect(Is.stringValue("a")).toEqual(true);
	});

	test("json can fail if value is an empty string", () => {
		expect(Is.json("")).toEqual(false);
	});

	test("json can fail if value is not valid JSON", () => {
		expect(Is.json("!")).toEqual(false);
	});

	test("json can succeed with valid JSON object", () => {
		expect(Is.json("{}")).toEqual(true);
	});

	test("json can succeed with valid JSON array", () => {
		expect(Is.json("[]")).toEqual(true);
	});

	test("json can succeed with valid JSON string", () => {
		expect(Is.json('""')).toEqual(true);
	});

	test("json can succeed with valid JSON boolean", () => {
		expect(Is.json("false")).toEqual(true);
	});

	test("json can succeed with valid JSON number", () => {
		expect(Is.json("1")).toEqual(true);
	});

	test("json can succeed with valid JSON null", () => {
		expect(Is.json("null")).toEqual(true);
	});

	test("stringBase64 can fail if value is an empty string", () => {
		expect(Is.stringBase64("")).toEqual(false);
	});

	test("stringBase64 can fail if value is an invalid base64 string", () => {
		expect(Is.stringBase64("!")).toEqual(false);
	});

	test("stringBase64 can fail with base64 url string", () => {
		expect(Is.stringBase64("Pio6bkd2KmQpc3I-VUc6IGE2bnI_MWlfXFw=")).toEqual(false);
	});

	test("stringBase64 can succeed with base64 string", () => {
		expect(Is.stringBase64("Pio6bkd2KmQpc3I+VUc6IGE2bnI/MWlfXFw=")).toEqual(true);
	});

	test("stringBase64Url can fail if value is an empty string", () => {
		expect(Is.stringBase64Url("")).toEqual(false);
	});

	test("stringBase64Url can fail if value is an invalid base64 url string", () => {
		expect(Is.stringBase64Url("!")).toEqual(false);
	});

	test("stringBase64 can fail with base64 string", () => {
		expect(Is.stringBase64Url("Pio6bkd2KmQpc3I+VUc6IGE2bnI/MWlfXFw=")).toEqual(false);
	});

	test("stringBase64 can succeed with base64 url string", () => {
		expect(Is.stringBase64Url("Pio6bkd2KmQpc3I-VUc6IGE2bnI_MWlfXFw=")).toEqual(true);
	});

	test("stringHex can fail if value is an empty string", () => {
		expect(Is.stringHex("")).toEqual(false);
	});

	test("stringHex can fail if value contains non hex characters", () => {
		expect(Is.stringHex("zz")).toEqual(false);
	});

	test("stringHex can fail if value contains hex characters but not in pairs", () => {
		expect(Is.stringHex("aaa")).toEqual(false);
	});

	test("stringHex can fail if value contains hex characters with a prefix", () => {
		expect(Is.stringHex("0xaa")).toEqual(false);
	});

	test("stringHex can succeed if value contains hex characters", () => {
		expect(Is.stringHex("aa")).toEqual(true);
	});

	test("stringHexLength can fail if value contains hex characters but is the wrong length", () => {
		expect(Is.stringHexLength("aaaa", 2)).toEqual(false);
	});

	test("stringHexLength can succeed if value contains hex characters and matches the length", () => {
		expect(Is.stringHexLength("aa", 2)).toEqual(true);
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

	test("integer can fail if value is not an integer", () => {
		expect(Is.integer(1.23)).toEqual(false);
	});

	test("integer can succeed if value is a integer", () => {
		expect(Is.integer(1)).toEqual(true);
	});

	test("bigint can fail if value is not a bigint", () => {
		expect(Is.bigint(1)).toEqual(false);
	});

	test("bigint can succeed if value is a bigint", () => {
		expect(Is.bigint(1n)).toEqual(true);
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

	test("dateEmpty can fail if value is not an empty date", () => {
		expect(Is.dateEmpty(new Date())).toEqual(false);
	});

	test("date can succeed if value is an empty date", () => {
		expect(Is.dateEmpty(new Date(""))).toEqual(true);
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

	test("seconds timestamp can fail if value is not a number", () => {
		expect(Is.timestampSeconds("100")).toEqual(false);
	});

	test("seconds timestamp can fail if value contains a number with 12 or more digits", () => {
		expect(Is.timestampSeconds(100000000000)).toEqual(false);
	});

	test("seconds timestamp can succeed if value contains a number with less than 12 digits", () => {
		expect(Is.timestampSeconds(0)).toEqual(true);
	});

	test("milliseconds timestamp can fail if value is not a number", () => {
		expect(Is.timestampMilliseconds("100")).toEqual(false);
	});

	test("milliseconds timestamp can fail if value contains a number with less than or equal to 12", () => {
		expect(Is.timestampMilliseconds(10000000000)).toEqual(false);
	});

	test("milliseconds timestamp can succeed if value contains a number with greater than or equal to 12 digits", () => {
		expect(Is.timestampMilliseconds(100000000000)).toEqual(true);
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

	test("objectValue can fail if value is an object with no keys", () => {
		expect(Is.objectValue({})).toEqual(false);
	});

	test("objectValue can succeed if value is an object with keys", () => {
		expect(Is.objectValue({ foo: "bar" })).toEqual(true);
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

	test("arrayValue can fail if it is an array with no entries", () => {
		expect(Is.arrayValue([])).toEqual(false);
	});

	test("array can succeed if value is a value array", () => {
		expect(Is.arrayValue([1])).toEqual(true);
	});

	test("arrayOneOf can fail if the value is not in the array", () => {
		expect(Is.arrayOneOf(0, [1, 2, 3])).toEqual(false);
	});

	test("arrayOneOf can succeed if value is in the array with numbers", () => {
		expect(Is.arrayOneOf(1, [1, 2, 3])).toEqual(true);
	});

	test("arrayOneOf can succeed if value is in the array with strings", () => {
		expect(Is.arrayOneOf("1", ["1", "2", "3"])).toEqual(true);
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

	test("email can fail if value if the value is empty", () => {
		expect(Is.email("")).toEqual(false);
	});

	test("email can succeed if value is a valid email format", () => {
		expect(Is.email("a@localhost")).toEqual(true);
	});

	test("email can succeed if value is a valid email format with domain", () => {
		expect(Is.email("a@example.com")).toEqual(true);
	});

	test("promise can fail if the value is not a valid promise", () => {
		expect(Is.promise(() => {})).toEqual(false);
	});

	test("promise can succeed if value is a valid promise", () => {
		expect(Is.promise(new Promise(() => {}))).toEqual(true);
	});

	test("regexp can fail if the value is not a valid regexp", () => {
		expect(Is.regexp("//aaa")).toEqual(false);
	});

	test("regexp can succeed if value is a valid regexp string", () => {
		expect(Is.regexp(/a/g)).toEqual(true);
	});

	test("regexp can succeed if value is a valid regexp", () => {
		// eslint-disable-next-line prefer-regex-literals
		expect(Is.regexp(new RegExp(""))).toEqual(true);
	});
});
