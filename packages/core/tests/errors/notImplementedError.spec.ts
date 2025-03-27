// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { NotImplementedError } from "../../src/errors/notImplementedError";

describe("NotImplementedError", () => {
	test("can construct", () => {
		const error = new NotImplementedError("foo", "extended");
		expect(error.source).toEqual("foo");
		expect(error.name).toEqual("NotImplementedError");
		expect(error.message).toEqual("common.notImplementedMethod");
	});
});
