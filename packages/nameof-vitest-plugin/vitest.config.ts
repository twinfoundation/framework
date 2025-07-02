// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["./tests/**/*.spec.ts"],
		globals: true,
		bail: 1,
		testTimeout: 300000,
		hookTimeout: 300000,
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			exclude: ["**/index.ts", "**/models/**/*.ts", "**/tests/**/*.ts"]
		}
	}
});
