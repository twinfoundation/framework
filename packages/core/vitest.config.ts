// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import typescript from "rollup-plugin-typescript2";
import tspc from "ts-patch/compiler";
import { defineConfig } from "vitest/config";

export default defineConfig({
	esbuild: false,
	plugins: [
		typescript({
			tsconfig: "./tests/tsconfig.json",
			typescript: tspc
		})
	],
	test: {
		include: ["./tests/**/*.spec.ts"],
		globals: true,
		bail: 1,
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			exclude: ["**/index.ts", "**/models/**/*.ts"]
		}
	}
});
