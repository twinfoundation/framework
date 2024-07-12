// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { FetchError } from "../../src/errors/fetchError";

describe("FetchError", () => {
	test("can construct", () => {
		const error = new FetchError("source", "fetch.foo", 123, { route: "/abc/" });
		expect(error.source).toEqual("source");
		expect(error.name).toEqual("FetchError");
		expect(error.message).toEqual("fetch.foo");
		expect(error.properties?.httpStatus).toEqual(123);
		expect(error.properties?.route).toEqual("/abc/");
	});
});
