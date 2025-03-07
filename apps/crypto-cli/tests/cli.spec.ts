// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { CLIDisplay } from "@twin.org/cli-core";
import { CLI } from "../src/cli";

let writeBuffer: string[] = [];
let errorBuffer: string[] = [];
const localesDirectory = "./dist/locales/";

describe("CLI", () => {
	beforeEach(() => {
		writeBuffer = [];
		errorBuffer = [];

		CLIDisplay.write = (str: string | Uint8Array): void => {
			writeBuffer.push(...str.toString().split("\n"));
		};

		CLIDisplay.writeError = (str: string | Uint8Array): void => {
			errorBuffer.push(...str.toString().split("\n"));
		};
	});

	test("Can execute with no command line options and receive help", async () => {
		const cli = new CLI();
		const exitCode = await cli.run(["", path.join(__dirname, "crypto-cli")], localesDirectory, {
			overrideOutputWidth: 1000
		});
		expect(exitCode).toBe(0);
		expect(writeBuffer.length).toEqual(16);
		expect(writeBuffer[0].includes("0.0.1-next.48")).toEqual(true);
		expect(writeBuffer[1]).toEqual("");
		expect(writeBuffer[2]).toEqual("");
		expect(writeBuffer[3]).toEqual("");
		expect(writeBuffer[4]).toEqual("Usage: twin-crypto [command]");
		expect(writeBuffer[5]).toEqual("");
		expect(writeBuffer[6]).toEqual("Options:");
		expect(writeBuffer[7]).toEqual("  -V, --version        output the version number");
		expect(writeBuffer[8]).toEqual(
			'  --lang <lang>        The language to display the output in. (default: "en")'
		);
		expect(writeBuffer[9]).toEqual(
			"  --load-env [env...]  Load the env files to initialise any environment variables."
		);
		expect(writeBuffer[10]).toEqual("  -h, --help           display help for command");
		expect(writeBuffer[11]).toEqual("");
		expect(writeBuffer[12]).toEqual("Commands:");
		expect(writeBuffer[13]).toEqual("  mnemonic [options]   Create a mnemonic.");
		expect(writeBuffer[14]).toEqual(
			"  address [options]    Create addresses and keys from the seed."
		);
		expect(writeBuffer[15]).toEqual("");
	});
});
