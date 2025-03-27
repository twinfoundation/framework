// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@twin.org/core";
import { Hotp } from "../../src/otp/hotp";

describe("Hotp", () => {
	test("can generate and verify OTP", () => {
		const key = Converter.utf8ToBytes("12345678901234567890");

		const expected = [
			"755224",
			"287082",
			"359152",
			"969429",
			"338314",
			"254676",
			"287922",
			"162583",
			"399871",
			"520489"
		];

		for (let i = 0; i < expected.length; i++) {
			expect(Hotp.generate(key, i)).toEqual(expected[i]);
		}
	});
});
