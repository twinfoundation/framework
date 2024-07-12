// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@gtsc/core";
import { Totp } from "../../src/otp/totp";

describe("Totp", () => {
	test("can generate and verify OTP", () => {
		const key = Converter.utf8ToBytes("12345678901234567890");

		const baseTime = 10000000;
		const interval = 30;

		const times = [baseTime, baseTime - interval, baseTime + interval];
		const otps = ["612788", "612788", "612788"];
		const deltas = [0, 1, -1];

		for (let i = 0; i < times.length; i++) {
			expect(Totp.generate(key, interval, baseTime * 1000)).toEqual(otps[i]);
			expect(Totp.verify(otps[i], key, 2, interval, times[i] * 1000)).toEqual(deltas[i]);
		}
	});
});
