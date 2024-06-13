// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { HexHelper } from "../../src/helpers/hexHelper";

describe("HexHelper", () => {
	test("stripPrefix can remove the 0x prefix", () => {
		expect(HexHelper.stripPrefix("0x1234")).toEqual("1234");
	});

	test("hasPrefix can return true if it has a prefix", () => {
		expect(HexHelper.hasPrefix("0x1234")).toEqual(true);
	});

	test("hasPrefix can return false if it has no prefix", () => {
		expect(HexHelper.hasPrefix("1234")).toEqual(false);
	});

	test("addPrefix can add the 0x prefix", () => {
		expect(HexHelper.addPrefix("1234")).toEqual("0x1234");
	});

	test("addPrefix can return the same hex if it already has a prefix", () => {
		expect(HexHelper.addPrefix("0x1234")).toEqual("0x1234");
	});

	test("isHex can return true for valid hex strings", () => {
		expect(HexHelper.isHex("1234")).toEqual(true);
		expect(HexHelper.isHex("abcdef")).toEqual(true);
		expect(HexHelper.isHex("0x1234", true)).toEqual(true);
		expect(HexHelper.isHex("0xabcdef", true)).toEqual(true);
	});

	test("isHex can return false for invalid hex strings", () => {
		expect(HexHelper.isHex("123g")).toEqual(false);
		expect(HexHelper.isHex("abcdeg")).toEqual(false);
		expect(HexHelper.isHex("0x123g", true)).toEqual(false);
		expect(HexHelper.isHex("0xabcdeg", true)).toEqual(false);
	});
});
