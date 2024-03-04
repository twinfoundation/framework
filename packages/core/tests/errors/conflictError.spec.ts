// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ConflictError } from "../../src/errors/conflictError";

describe("ConflictError", () => {
	test("can construct", () => {
		const error = new ConflictError("foo", "extended", "conflictId", ["id1", "id2"]);
		expect(error.source).toEqual("foo");
		expect(error.name).toEqual("ConflictError");
		expect(error.message).toEqual("foo.extended");
		expect(error.properties?.conflictId).toEqual("conflictId");
		const conflicts = error.properties?.conflicts as string[];
		expect(conflicts.length).toEqual(2);
		expect(conflicts[0]).toEqual("id1");
		expect(conflicts[1]).toEqual("id2");
	});
});
