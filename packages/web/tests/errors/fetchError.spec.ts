// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { FetchError } from "../../src/errors/fetchError";
import { HttpStatusCode } from "../../src/models/httpStatusCode";

describe("FetchError", () => {
	test("can construct", () => {
		const error = new FetchError("source", "fetch.foo", HttpStatusCode.badRequest, {
			route: "/abc/"
		});
		expect(error.source).toEqual("source");
		expect(error.name).toEqual("FetchError");
		expect(error.message).toEqual("fetch.foo");
		expect(error.properties?.httpStatus).toEqual(400);
		expect(error.properties?.route).toEqual("/abc/");
	});
});
