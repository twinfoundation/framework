// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ArrayHelper } from "../../src/utils/arrayHelper";

describe("ArrayHelper", () => {
	test("can match when both empty", () => {
		expect(ArrayHelper.matches(undefined, undefined)).toEqual(true);
	});

	test("can not match when one empty", () => {
		expect(ArrayHelper.matches([], undefined)).toEqual(false);
	});

	test("can not match when different lengths", () => {
		expect(ArrayHelper.matches([], [1])).toEqual(false);
	});

	test("can not match when same lengths but single different values", () => {
		expect(ArrayHelper.matches([1], [2])).toEqual(false);
	});

	test("can not match when same lengths but different values", () => {
		expect(ArrayHelper.matches([1, 2], [1, 3])).toEqual(false);
	});

	test("can match when same lengths and single same values", () => {
		expect(ArrayHelper.matches([1], [1])).toEqual(true);
	});

	test("can match when same lengths and multiple same values", () => {
		expect(ArrayHelper.matches([1, 2], [1, 2])).toEqual(true);
	});

	test("can match when same lengths and multiple same values in typed array", () => {
		expect(ArrayHelper.matches(new Uint8Array([1, 2]), new Uint8Array([1, 2]))).toEqual(true);
	});
});
