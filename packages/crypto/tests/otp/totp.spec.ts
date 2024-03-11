// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter } from "@gtsc/core";
import { Totp } from "../../src/otp/totp";

describe("Totp", () => {
	test("can generate and verify OTP", () => {
		const key = Converter.utf8ToBytes("12345678901234567890");

		const times = [59, 1234567890, 1111111109, 2000000000];
		const otps = ["287082", "005924", "081804", "279037"];
		const deltas = [-2, 0, 0, 0];

		for (let i = 0; i < times.length; i++) {
			expect(Totp.generate(key, 30, times[i] * 1000)).toEqual(otps[i]);
			expect(Totp.verify(otps[i], key, 2, 30, times[i] * 1000)).toEqual(deltas[i]);
		}
	});
});
