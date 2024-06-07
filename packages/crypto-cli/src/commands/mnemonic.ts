// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CLIDisplay, checkParamInteger } from "@gtsc/cli-core";
import { Converter, I18n, Is } from "@gtsc/core";
import { Bip39 } from "@gtsc/crypto";
import { Command, Option } from "commander";

/**
 * Build the mnemonic command to be consumed by the CLI.
 * @returns The command.
 */
export function buildCommandMnemonic(): Command {
	const command = new Command();
	command
		.name("mnemonic")
		.summary(I18n.formatMessage("commands.mnemonic.summary"))
		.description(I18n.formatMessage("commands.mnemonic.description"))
		.addOption(
			new Option(
				I18n.formatMessage("commands.mnemonic.options.strength.param"),
				I18n.formatMessage("commands.mnemonic.options.strength.description")
			)
				.choices(["128", "256"])
				.default("256")
		)
		.addOption(
			new Option(
				I18n.formatMessage("commands.mnemonic.options.seed-format.param"),
				I18n.formatMessage("commands.mnemonic.options.seed-format.description")
			)
				.choices(["hex", "base64"])
				.default("hex")
		)
		.option(
			I18n.formatMessage("commands.mnemonic.options.no-console.param"),
			I18n.formatMessage("commands.mnemonic.options.no-console.description")
		)
		.option(
			I18n.formatMessage("commands.mnemonic.options.json.param"),
			I18n.formatMessage("commands.mnemonic.options.json.description")
		)
		.option(
			I18n.formatMessage("commands.mnemonic.options.env.param"),
			I18n.formatMessage("commands.mnemonic.options.env.description")
		)
		.action(actionCommandMnemonic);

	return command;
}

/**
 * Action the mnemonic command.
 * @param opts The options for the command.
 * @param opts.strength The mnemonic strength.
 * @param opts.seedFormat The output format of the seed.
 * @param opts.console Flag to display on the console.
 * @param opts.json Output the mnemonic to a JSON file.
 * @param opts.env Output the mnemonic to an environment file.
 */
export async function actionCommandMnemonic(opts: {
	strength: string;
	seedFormat: "hex" | "base64";
	console: boolean;
	json?: string;
	env?: string;
}): Promise<void> {
	try {
		const strength = checkParamInteger("strength", opts.strength, false, 128, 256);

		const mnemonic = Bip39.randomMnemonic(strength);
		const seed = Bip39.mnemonicToSeed(mnemonic);

		const seedFormatted =
			opts.seedFormat === "hex" ? Converter.bytesToHex(seed, true) : Converter.bytesToBase64(seed);

		if (opts.console) {
			CLIDisplay.value(I18n.formatMessage("commands.mnemonic.labels.mnemonic"), mnemonic);
			CLIDisplay.value(I18n.formatMessage("commands.mnemonic.labels.seed"), seedFormatted);
			CLIDisplay.break();
		}

		if (Is.stringValue(opts?.json)) {
			const filename = path.resolve(opts.json);
			CLIDisplay.task(I18n.formatMessage("commands.mnemonic.progress.writingJsonFile"), filename);
			CLIDisplay.break();

			await mkdir(path.dirname(filename), { recursive: true });
			await writeFile(
				filename,
				JSON.stringify(
					{
						mnemonic,
						seed: seedFormatted
					},
					undefined,
					"\t"
				)
			);
		}

		if (Is.stringValue(opts?.env)) {
			const filename = path.resolve(opts.env);
			CLIDisplay.task(I18n.formatMessage("commands.mnemonic.progress.writingEnvFile"), filename);
			CLIDisplay.break();

			const output = [`MNEMONIC="${mnemonic}"`, `SEED="${seedFormatted}"`];

			await mkdir(path.dirname(filename), { recursive: true });
			await writeFile(filename, output.join("\n"));
		}
		CLIDisplay.done();
	} catch (error) {
		CLIDisplay.error(error);
	}
}
