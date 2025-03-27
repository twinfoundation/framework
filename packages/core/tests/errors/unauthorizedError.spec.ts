// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { UnauthorizedError } from "../../src/errors/unauthorizedError";

describe("UnauthorizedError", () => {
	test("can construct", () => {
		const error = new UnauthorizedError("foo", "extended");
		expect(error.source).toEqual("foo");
		expect(error.name).toEqual("UnauthorizedError");
		expect(error.message).toEqual("foo.extended");
	});
});
