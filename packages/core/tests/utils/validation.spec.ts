// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IValidationFailure } from "../../src/models/IValidationFailure";
import { I18n } from "../../src/utils/i18n";
import { Validation } from "../../src/utils/validation";

describe("Validation", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../../locales/en.json"));
	});

	test("can fail if value is not empty", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.empty("val", "a", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beEmpty");
		expect(I18n.hasMessage("error.validation.beEmpty")).toEqual(true);
	});

	test("can succeed if value is empty", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.empty("val", undefined, failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is empty", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.notEmpty("val", undefined, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beNotEmpty");
		expect(I18n.hasMessage("error.validation.beNotEmpty")).toEqual(true);
	});

	test("can succeed if value is not empty", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.notEmpty("val", "a", failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.string("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beText");
		expect(I18n.hasMessage("error.validation.beText")).toEqual(true);
	});

	test("can fail if string is not number below min length", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.string("val", "hello", failures, undefined, { minLength: 10 })).toEqual(
			false
		);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTextMin");
		expect(I18n.hasMessage("error.validation.beTextMin")).toEqual(true);
	});

	test("can fail if value is not string above max length", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.string("val", "hello", failures, undefined, { maxLength: 3 })).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTextMax");
		expect(I18n.hasMessage("error.validation.beTextMax")).toEqual(true);
	});

	test("can fail if not string between min length and max length", () => {
		const failures: IValidationFailure[] = [];
		expect(
			Validation.string("val", "aa", failures, undefined, { minLength: 3, maxLength: 6 })
		).toEqual(false);
		expect(
			Validation.string("val", "aaaaaaa", failures, undefined, { minLength: 3, maxLength: 6 })
		).toEqual(false);
		expect(failures.length).toEqual(2);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTextMinMax");
		expect(failures[1].property).toEqual("val");
		expect(failures[1].reason).toEqual("validation.beTextMinMax");
		expect(I18n.hasMessage("error.validation.beTextMinMax")).toEqual(true);
	});

	test("can succeed if value is a string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.string("val", "", failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if string is not number below min length", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.stringValue("val", "hello", failures, undefined, { minLength: 10 })).toEqual(
			false
		);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTextMin");
		expect(I18n.hasMessage("error.validation.beTextMin")).toEqual(true);
	});

	test("can fail if value is not string above max length", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.stringValue("val", "hello", failures, undefined, { maxLength: 3 })).toEqual(
			false
		);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTextMax");
		expect(I18n.hasMessage("error.validation.beTextMax")).toEqual(true);
	});

	test("can fail if not string between min length and max length", () => {
		const failures: IValidationFailure[] = [];
		expect(
			Validation.stringValue("val", "aa", failures, undefined, { minLength: 3, maxLength: 6 })
		).toEqual(false);
		expect(
			Validation.stringValue("val", "aaaaaaa", failures, undefined, { minLength: 3, maxLength: 6 })
		).toEqual(false);
		expect(failures.length).toEqual(2);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTextMinMax");
		expect(failures[1].property).toEqual("val");
		expect(failures[1].reason).toEqual("validation.beTextMinMax");
		expect(I18n.hasMessage("error.validation.beTextMinMax")).toEqual(true);
	});

	test("can fail if value is not a string value", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.stringValue("val", "", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTextValue");
		expect(I18n.hasMessage("error.validation.beTextValue")).toEqual(true);
	});

	test("can succeed if value is a string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.stringValue("val", "a", failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a number", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.number("val", "", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beNumber");
		expect(I18n.hasMessage("error.validation.beNumber")).toEqual(true);
	});

	test("can fail if value is not number below min", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.number("val", 9, failures, undefined, { minValue: 10 })).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beNumberMin");
		expect(I18n.hasMessage("error.validation.beNumberMin")).toEqual(true);
	});

	test("can fail if value is not number above max", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.number("val", 11, failures, undefined, { maxValue: 10 })).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beNumberMax");
		expect(I18n.hasMessage("error.validation.beNumberMax")).toEqual(true);
	});

	test("can fail if not number between min and max", () => {
		const failures: IValidationFailure[] = [];
		expect(
			Validation.number("val", 9, failures, undefined, { minValue: 10, maxValue: 15 })
		).toEqual(false);
		expect(
			Validation.number("val", 16, failures, undefined, { minValue: 10, maxValue: 15 })
		).toEqual(false);
		expect(failures.length).toEqual(2);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beNumberMinMax");
		expect(failures[1].property).toEqual("val");
		expect(failures[1].reason).toEqual("validation.beNumberMinMax");
		expect(I18n.hasMessage("error.validation.beNumberMinMax")).toEqual(true);
	});

	test("can succeed if value is a number", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.number("val", 1, failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not an integer", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.integer("val", 1.23, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beWholeNumber");
		expect(I18n.hasMessage("error.validation.beWholeNumber")).toEqual(true);
	});

	test("can fail if value is not integer below min", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.integer("val", 9, failures, undefined, { minValue: 10 })).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beWholeNumberMin");
		expect(I18n.hasMessage("error.validation.beWholeNumberMin")).toEqual(true);
	});

	test("can fail if value is not integer above max", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.integer("val", 11, failures, undefined, { maxValue: 10 })).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beWholeNumberMax");
		expect(I18n.hasMessage("error.validation.beWholeNumberMax")).toEqual(true);
	});

	test("can fail if not integer between min and max", () => {
		const failures: IValidationFailure[] = [];
		expect(
			Validation.integer("val", 9, failures, undefined, { minValue: 10, maxValue: 15 })
		).toEqual(false);
		expect(
			Validation.integer("val", 16, failures, undefined, { minValue: 10, maxValue: 15 })
		).toEqual(false);
		expect(failures.length).toEqual(2);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beWholeNumberMinMax");
		expect(failures[1].property).toEqual("val");
		expect(failures[1].reason).toEqual("validation.beWholeNumberMinMax");
		expect(I18n.hasMessage("error.validation.beWholeNumberMinMax")).toEqual(true);
	});

	test("can succeed if value is an integer", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.integer("val", 1, failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a big integer", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.bigint("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beBigInteger");
		expect(I18n.hasMessage("error.validation.beBigInteger")).toEqual(true);
	});

	test("can fail if value is not bigint below min", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.bigint("val", 9n, failures, undefined, { minValue: 10n })).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beBigIntegerMin");
		expect(I18n.hasMessage("error.validation.beBigIntegerMin")).toEqual(true);
	});

	test("can fail if value is not bigint above max", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.bigint("val", 11n, failures, undefined, { maxValue: 10n })).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beBigIntegerMax");
		expect(I18n.hasMessage("error.validation.beBigIntegerMax")).toEqual(true);
	});

	test("can fail if not bigint between min and max", () => {
		const failures: IValidationFailure[] = [];
		expect(
			Validation.bigint("val", 9n, failures, undefined, { minValue: 10n, maxValue: 15n })
		).toEqual(false);
		expect(
			Validation.bigint("val", 16n, failures, undefined, { minValue: 10n, maxValue: 15n })
		).toEqual(false);
		expect(failures.length).toEqual(2);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beBigIntegerMinMax");
		expect(failures[1].property).toEqual("val");
		expect(failures[1].reason).toEqual("validation.beBigIntegerMinMax");
		expect(I18n.hasMessage("error.validation.beBigIntegerMinMax")).toEqual(true);
	});

	test("can succeed if value is a big integer", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.bigint("val", 0n, failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a boolean", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.boolean("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beBoolean");
		expect(I18n.hasMessage("error.validation.beBoolean")).toEqual(true);
	});

	test("can succeed if value is a boolean", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.boolean("val", false, failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a date", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.date("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beDate");
		expect(I18n.hasMessage("error.validation.beDate")).toEqual(true);
	});

	test("can fail if value is an empty date", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.date("val", new Date(""), failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beDate");
		expect(I18n.hasMessage("error.validation.beDate")).toEqual(true);
	});

	test("can succeed if value is a date", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.date("val", new Date(), failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a date string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.dateString("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beDate");
		expect(I18n.hasMessage("error.validation.beDate")).toEqual(true);
	});

	test("can fail if value is an empty date string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.dateString("val", "", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beDate");
		expect(I18n.hasMessage("error.validation.beDate")).toEqual(true);
	});

	test("can fail if value is a date/time string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.dateString("val", "2024-05-03T08:10:39.542Z", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beDate");
		expect(I18n.hasMessage("error.validation.beDate")).toEqual(true);
	});

	test("can succeed if value is a date", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.dateString("val", "2024-05-03", failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a date/time string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.dateTimeString("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beDateTime");
		expect(I18n.hasMessage("error.validation.beDateTime")).toEqual(true);
	});

	test("can fail if value is an empty date/time string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.dateTimeString("val", "", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beDateTime");
		expect(I18n.hasMessage("error.validation.beDateTime")).toEqual(true);
	});

	test("can fail if value is a date string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.dateTimeString("val", "2024-05-03", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beDateTime");
		expect(I18n.hasMessage("error.validation.beDateTime")).toEqual(true);
	});

	test("can succeed if value is a date/time", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.dateTimeString("val", "2024-05-03T08:10:39.542Z", failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a time string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.timeString("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTime");
		expect(I18n.hasMessage("error.validation.beTime")).toEqual(true);
	});

	test("can fail if value is an empty date/time string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.timeString("val", "", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTime");
		expect(I18n.hasMessage("error.validation.beTime")).toEqual(true);
	});

	test("can fail if value is a date/time string", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.timeString("val", "2024-05-03T08:10:39.542Z", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTime");
		expect(I18n.hasMessage("error.validation.beTime")).toEqual(true);
	});

	test("can succeed if value is a time", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.timeString("val", "08:10:39.542", failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a timestamp in milliseconds integer", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.timestampMilliseconds("val", 1.23, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTimestampMilliseconds");
		expect(I18n.hasMessage("error.validation.beTimestampMilliseconds")).toEqual(true);
	});

	test("can fail if value is not a timestamp in milliseconds", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.timestampMilliseconds("val", 10000000000, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTimestampMilliseconds");
		expect(I18n.hasMessage("error.validation.beTimestampMilliseconds")).toEqual(true);
	});

	test("can succeed if value is a timestamp in mílliseconds", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.timestampMilliseconds("val", 100000000000, failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a timestamp in seconds integer", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.timestampSeconds("val", 1.23, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTimestampSeconds");
		expect(I18n.hasMessage("error.validation.beTimestampSeconds")).toEqual(true);
	});

	test("can fail if value is not a timestamp in seconds", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.timestampSeconds("val", 100000000000, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beTimestampSeconds");
		expect(I18n.hasMessage("error.validation.beTimestampSeconds")).toEqual(true);
	});

	test("can succeed if value is a timestamp in seconds", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.timestampSeconds("val", 10000000000, failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not an object", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.object("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beObject");
		expect(I18n.hasMessage("error.validation.beObject")).toEqual(true);
	});

	test("can succeed if value is an object", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.object("val", {}, failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not an array", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.array("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beArray");
		expect(I18n.hasMessage("error.validation.beArray")).toEqual(true);
	});

	test("can succeed if value is an array", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.array("val", [], failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not an array", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.arrayValue("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beArrayValue");
		expect(I18n.hasMessage("error.validation.beArrayValue")).toEqual(true);
	});

	test("can fail if value is an array with no entries", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.arrayValue("val", [], failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beArrayValue");
		expect(I18n.hasMessage("error.validation.beArrayValue")).toEqual(true);
	});

	test("can succeed if value is an array with entries", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.arrayValue("val", [1], failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is empty", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.arrayOneOf("val", undefined, [], failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beIncluded");
		expect(I18n.hasMessage("error.validation.beIncluded")).toEqual(true);
	});

	test("can fail if value is not in the options array", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.arrayOneOf("val", 1, [2, 3], failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beIncluded");
		expect(I18n.hasMessage("error.validation.beIncluded")).toEqual(true);
	});

	test("can succeed if value is in the options array", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.arrayOneOf("val", 1, [1, 2, 3], failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not a byte array", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.uint8Array("val", 1, failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beByteArray");
		expect(I18n.hasMessage("error.validation.beByteArray")).toEqual(true);
	});

	test("can succeed if value is a byte array", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.uint8Array("val", new Uint8Array([1, 2, 3]), failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not valid JSON", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.json("val", "", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beJSON");
		expect(I18n.hasMessage("error.validation.beJSON")).toEqual(true);
	});

	test("can succeed if value is valid JSON", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.json("val", "{}", failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can fail if value is not valid email", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.email("val", "", failures)).toEqual(false);
		expect(failures.length).toEqual(1);
		expect(failures[0].property).toEqual("val");
		expect(failures[0].reason).toEqual("validation.beEmail");
		expect(I18n.hasMessage("error.validation.beEmail")).toEqual(true);
	});

	test("can succeed if value is valid email", () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.email("val", "a@localhost", failures)).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	test("can not throw if there are no validation errors", async () => {
		const failures: IValidationFailure[] = [];
		expect(Validation.asValidationError("source", "object", failures)).toBeUndefined();
	});

	test("can throw if there are validation errors", async () => {
		const failures: IValidationFailure[] = [
			{
				property: "prop",
				reason: "reason",
				properties: { prop: "val" }
			}
		];
		try {
			Validation.asValidationError("source", "object", failures);
		} catch (error) {
			expect(error).toMatchObject({
				name: "ValidationError",
				message: "common.validation",
				source: "source",
				properties: {
					validationObject: "object",
					validationFailures: [{ property: "prop", reason: "reason", properties: { prop: "val" } }]
				}
			});
		}
	});
});
