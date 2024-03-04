// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { AlreadyExistsError } from "../../src/errors/alreadyExistsError";

describe("AlreadyExistsError", () => {
	test("can construct", () => {
		const error = new AlreadyExistsError("foo", "extended", "id");
		expect(error.source).toEqual("foo");
		expect(error.name).toEqual("AlreadyExistsError");
		expect(error.message).toEqual("foo.extended");
		expect(error.properties?.existingId).toEqual("id");
	});
});
