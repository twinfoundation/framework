// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { NotSupportedError } from "../../src/errors/notSupportedError";

describe("NotSupportedError", () => {
	test("can construct", () => {
		const error = new NotSupportedError("foo", "extended");
		expect(error.source).toEqual("foo");
		expect(error.name).toEqual("NotSupportedError");
		expect(error.message).toEqual("foo.extended");
	});
});
