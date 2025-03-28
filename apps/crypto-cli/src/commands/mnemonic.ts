// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	CLIDisplay,
	CLIOptions,
	CLIParam,
	CLIUtils,
	type CliOutputOptions
} from "@twin.org/cli-core";
import { Converter, I18n, Is } from "@twin.org/core";
import { Bip39 } from "@twin.org/crypto";
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
		.addOption(
			new Option(
				I18n.formatMessage("commands.mnemonic.options.env-prefix.param"),
				I18n.formatMessage("commands.mnemonic.options.env-prefix.description")
			)
		);

	CLIOptions.output(command, {
		noConsole: true,
		json: true,
		env: true,
		mergeJson: true,
		mergeEnv: true
	});

	command.action(actionCommandMnemonic);

	return command;
}

/**
 * Action the mnemonic command.
 * @param opts The options for the command.
 * @param opts.strength The mnemonic strength.
 * @param opts.seedFormat The output format of the seed.
 */
export async function actionCommandMnemonic(
	opts: {
		strength: string;
		seedFormat: "hex" | "base64";
		envPrefix?: string;
	} & CliOutputOptions
): Promise<void> {
	const strength = CLIParam.integer("strength", opts.strength, false, 128, 256);

	const mnemonic = Bip39.randomMnemonic(strength);
	const seed = Bip39.mnemonicToSeed(mnemonic);
	const envPrefix = Is.stringValue(opts.envPrefix) ? opts.envPrefix : "";

	const seedFormatted =
		opts.seedFormat === "hex" ? Converter.bytesToHex(seed, true) : Converter.bytesToBase64(seed);

	if (opts.console) {
		CLIDisplay.value(I18n.formatMessage("commands.mnemonic.labels.mnemonic"), mnemonic);
		CLIDisplay.value(I18n.formatMessage("commands.mnemonic.labels.seed"), seedFormatted);
		if (Is.stringValue(opts.envPrefix)) {
			CLIDisplay.value(I18n.formatMessage("commands.mnemonic.labels.envPrefix"), envPrefix);
		}
		CLIDisplay.break();
	}

	if (Is.stringValue(opts?.json)) {
		await CLIUtils.writeJsonFile(opts.json, { mnemonic, seed: seedFormatted }, opts.mergeJson);
	}
	if (Is.stringValue(opts?.env)) {
		await CLIUtils.writeEnvFile(
			opts.env,
			[`${envPrefix}MNEMONIC="${mnemonic}"`, `${envPrefix}SEED="${seedFormatted}"`],
			opts.mergeEnv
		);
	}

	CLIDisplay.done();
}
