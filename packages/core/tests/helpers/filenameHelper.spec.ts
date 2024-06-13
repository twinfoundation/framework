// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { FilenameHelper } from "../../src/helpers/filenameHelper";

describe("FilenameHelper", () => {
	test("can get filename with valid characters", () => {
		const filename = FilenameHelper.safeFilename("test");
		expect(filename).toEqual("test");
	});

	test("can get filename with non filename characters", () => {
		const filename = FilenameHelper.safeFilename("*test");
		expect(filename).toEqual("_test");
	});

	test("can get filename with window non filename characters", () => {
		const filename = FilenameHelper.safeFilename("con");
		expect(filename).toEqual("_");
	});

	test("can get filename with control characters", () => {
		const filename = FilenameHelper.safeFilename("\u0000test");
		expect(filename).toEqual("_test");
	});

	test("can get filename with relative paths", () => {
		const filename = FilenameHelper.safeFilename("/test");
		expect(filename).toEqual("_test");
	});

	test("can get filename with trailing dot", () => {
		const filename = FilenameHelper.safeFilename("test.");
		expect(filename).toEqual("test");
	});
});
