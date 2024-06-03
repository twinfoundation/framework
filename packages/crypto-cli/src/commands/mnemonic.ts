// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { Converter, I18n, Is } from "@gtsc/core";
import { Bip39 } from "@gtsc/crypto";
import { Command } from "commander";
import { displayBreak, displayDone, displayError, displayTask, displayValue } from "../output";

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
		.option(
			I18n.formatMessage("commands.mnemonic.options.strength.param"),
			I18n.formatMessage("commands.mnemonic.options.strength.description"),
			"256"
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
 * @param opts.console Flag to display on the console.
 * @param opts.json Output the mnemonic to a JSON file.
 * @param opts.env Output the mnemonic to an environment file.
 */
export async function actionCommandMnemonic(opts: {
	strength: string;
	console: boolean;
	json?: string;
	env?: string;
}): Promise<void> {
	try {
		const strength = Number.parseInt(opts.strength, 10);

		const mnemonic = Bip39.randomMnemonic(strength);
		const seed = Bip39.mnemonicToSeed(mnemonic);

		const seedHex = Converter.bytesToHex(seed, true);
		const seedBase64 = Converter.bytesToBase64(seed);

		if (opts.console) {
			displayValue("Mnemonic", mnemonic);
			displayValue("Seed Hex", seedHex);
			displayValue("Seed Base64", seedBase64);
			displayBreak();
		}

		if (Is.stringValue(opts?.json)) {
			const filename = path.resolve(opts.json);
			displayTask(I18n.formatMessage("commands.mnemonic.progress.writingJsonFile"), filename);
			displayBreak();

			await writeFile(
				filename,
				JSON.stringify(
					{
						mnemonic,
						seedHex,
						seedBase64
					},
					undefined,
					"\t"
				)
			);
		}

		if (Is.stringValue(opts?.env)) {
			const filename = path.resolve(opts.env);
			displayTask(I18n.formatMessage("commands.mnemonic.progress.writingEnvFile"), filename);
			displayBreak();

			const output = [
				`GTSC_MNEMONIC="${mnemonic}"`,
				`GTSC_SEED_HEX="${seedHex}"`,
				`GTSC_SEED_BASE64="${seedBase64}"`
			];

			await writeFile(filename, output.join("\n"));
		}
		displayDone();
	} catch (error) {
		displayError(error);
	}
}
