// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "../src/index";

describe("Nameof", () => {
	test("the nameof method returns an error", () => {
		expect(nameof()).toEqual(
			"@gtsc/nameof-transformer is not in the build pipeline, you need to use a compiler that supports transformer plugins."
		);
	});
});
