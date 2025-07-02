// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { SharedStore } from "../../src/utils/sharedStore";

describe("SharedStore", () => {
	test("can not get an object in the shared store", async () => {
		const val = SharedStore.get("test");

		expect(val).toBeUndefined();
	});

	test("can set an object in the shared store", async () => {
		SharedStore.set("test", { test: "test" });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((globalThis as any).__TWIN_SHARED__.test).toEqual({ test: "test" });
	});

	test("can get an object from the shared store", async () => {
		const test = SharedStore.get("test");

		expect(test).toEqual({ test: "test" });
	});

	test("can remove an object from the shared store", async () => {
		SharedStore.remove("test");

		const test = SharedStore.get("test");
		expect(test).toBeUndefined();
	});
});
