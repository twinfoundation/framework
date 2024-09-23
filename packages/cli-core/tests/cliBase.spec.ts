// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import chalk from "chalk";
import { CLIBase } from "../src/cliBase";
import { CLIDisplay } from "../src/cliDisplay";

/**
 * Test CLI.
 */
class CLI extends CLIBase {}

const localesDir = path.resolve("./dist/locales");
let writeBuffer: string[] = [];
let errorBuffer: string[] = [];

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
		const exitCode = await cli.execute(
			{
				title: "Test App",
				appName: "test-app",
				version: "0.0.1",
				icon: "🔐"
			},
			localesDir,
			["", path.join(__dirname, "test-app")]
		);
		expect(exitCode).toBe(0);
		expect(writeBuffer.length).toEqual(11);
		expect(writeBuffer[0]).toEqual(`🔐 ${chalk.underline.bold.blue("Test App v0.0.1")}`);
		expect(writeBuffer[1]).toEqual("");
		expect(writeBuffer[2]).toEqual("");
		expect(writeBuffer[3]).toEqual("");
		expect(writeBuffer[4]).toEqual("Usage: test-app  ");
		expect(writeBuffer[5]).toEqual("");
		expect(writeBuffer[6]).toEqual("Options:");
		expect(writeBuffer[7]).toEqual("  -V, --version  output the version number");
		expect(writeBuffer[8]).toEqual(
			'  --lang <lang>  The language to display the output in. (default: "en")'
		);
		expect(writeBuffer[9]).toEqual("  -h, --help     display help for command");
		expect(writeBuffer[10]).toEqual("");
	});

	test("Can execute with no command line options and receive help with no lang support", async () => {
		const cli = new CLI();
		const exitCode = await cli.execute(
			{
				title: "Test App",
				appName: "test-app",
				version: "0.0.1",
				icon: "🔐",
				supportsLang: false
			},
			localesDir,
			["", path.join(__dirname, "test-app")]
		);
		expect(exitCode).toBe(0);
		expect(writeBuffer.length).toEqual(10);
		expect(writeBuffer[0]).toEqual(`🔐 ${chalk.underline.bold.blue("Test App v0.0.1")}`);
		expect(writeBuffer[1]).toEqual("");
		expect(writeBuffer[2]).toEqual("");
		expect(writeBuffer[3]).toEqual("");
		expect(writeBuffer[4]).toEqual("Usage: test-app  ");
		expect(writeBuffer[5]).toEqual("");
		expect(writeBuffer[6]).toEqual("Options:");
		expect(writeBuffer[7]).toEqual("  -V, --version  output the version number");
		expect(writeBuffer[8]).toEqual("  -h, --help     display help for command");
		expect(writeBuffer[9]).toEqual("");
	});

	test("Can execute with no command line options and receive help with env file support", async () => {
		const cli = new CLI();
		const exitCode = await cli.execute(
			{
				title: "Test App",
				appName: "test-app",
				version: "0.0.1",
				icon: "🔐",
				supportsEnvFiles: true,
				overrideOutputWidth: 1000
			},
			localesDir,
			["", path.join(__dirname, "test-app")]
		);
		expect(exitCode).toBe(0);
		console.log(writeBuffer);
		console.log(process.stdout.columns, process.stderr.columns);
		expect(writeBuffer.length).toEqual(12);
		expect(writeBuffer[0]).toEqual(`🔐 ${chalk.underline.bold.blue("Test App v0.0.1")}`);
		expect(writeBuffer[1]).toEqual("");
		expect(writeBuffer[2]).toEqual("");
		expect(writeBuffer[3]).toEqual("");
		expect(writeBuffer[4]).toEqual("Usage: test-app  ");
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
	});

	test("Can execute with version command line option", async () => {
		const cli = new CLI();
		const exitCode = await cli.execute(
			{
				title: "Test App",
				appName: "test-app",
				version: "0.0.1",
				icon: "🔐"
			},
			localesDir,
			["", path.join(__dirname, "test-app"), "--version"]
		);
		expect(exitCode).toBe(0);
		expect(writeBuffer.length).toEqual(2);
		expect(writeBuffer[0]).toEqual("0.0.1");
		expect(writeBuffer[1]).toEqual("");
	});
});
