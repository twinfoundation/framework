// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { CLI } from "../src/cli";

describe("CLI", () => {
	test("Can execute with no command line options and receive help", async () => {
		const cli = new CLI();
		await cli.run(["", path.join(__dirname, "crypto-cli")]);
	});
});
