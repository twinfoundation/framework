// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError } from "../../src/errors/generalError";
import type { IError } from "../../src/models/IError";
import { Is } from "../../src/utils/is";

describe("GeneralError", () => {
	test("can construct", () => {
		// eslint-disable-next-line no-restricted-syntax
		const error = new GeneralError("foo", "extended", { bar: 1 }, new Error("bar"));
		expect(error.source).toEqual("foo");
		expect(error.name).toEqual("GeneralError");
		expect(error.message).toEqual("foo.extended");
		expect(error.properties?.bar).toEqual(1);
		expect(error.inner).toBeDefined();
		if (Is.object<IError>(error.inner)) {
			expect(error.inner.message).toEqual("bar");
		}
	});
});
