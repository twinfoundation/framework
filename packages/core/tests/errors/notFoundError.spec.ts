// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { NotFoundError } from "../../src/errors/notFoundError";

describe("NotFoundError", () => {
	test("can construct", () => {
		const error = new NotFoundError("foo", "extended", "id");
		expect(error.source).toEqual("foo");
		expect(error.name).toEqual("NotFoundError");
		expect(error.message).toEqual("foo.extended");
		expect(error.properties?.notFoundId).toEqual("id");
	});
});
