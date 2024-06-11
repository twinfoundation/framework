// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { CLIDisplay, CLIOptions, CLIParam, CLIUtils } from "@gtsc/cli-core";
import { Converter, I18n, Is } from "@gtsc/core";
import { Bip44, KeyType } from "@gtsc/crypto";
import { Command, Option } from "commander";

/**
 * Build the address command to be consumed by the CLI.
 * @returns The command.
 */
export function buildCommandAddress(): Command {
	const command = new Command();
	command
		.name("address")
		.summary(I18n.formatMessage("commands.address.summary"))
		.description(I18n.formatMessage("commands.address.description"))
		.requiredOption(
			I18n.formatMessage("commands.address.options.seed.param"),
			I18n.formatMessage("commands.address.options.seed.description")
		)
		.option(
			I18n.formatMessage("commands.address.options.start.param"),
			I18n.formatMessage("commands.address.options.start.description"),
			"0"
		)
		.option(
			I18n.formatMessage("commands.address.options.count.param"),
			I18n.formatMessage("commands.address.options.count.description"),
			"10"
		)
		.option(
			I18n.formatMessage("commands.address.options.account.param"),
			I18n.formatMessage("commands.address.options.account.description"),
			"0"
		)
		.option(
			I18n.formatMessage("commands.address.options.hrp.param"),
			I18n.formatMessage("commands.address.options.hrp.description"),
			"iota"
		)
		.option(
			I18n.formatMessage("commands.address.options.coin.param"),
			I18n.formatMessage("commands.address.options.coin.description"),
			"4218"
		)
		.addOption(
			new Option(
				I18n.formatMessage("commands.address.options.key-type.param"),
				I18n.formatMessage("commands.address.options.key-type.description")
			)
				.choices(["Ed25519", "Secp256k1"])
				.default("Ed25519")
		)
		.addOption(
			new Option(
				I18n.formatMessage("commands.address.options.key-format.param"),
				I18n.formatMessage("commands.address.options.key-format.description")
			)
				.choices(["hex", "base64"])
				.default("hex")
		);

	CLIOptions.output(command, {
		noConsole: true,
		json: true,
		env: true,
		mergeJson: true,
		mergeEnv: true
	});

	command.action(actionCommandAddress);

	return command;
}

/**
 * Action the address command.
 * @param opts The options for the command.
 * @param opts.seed The seed for generating the addresses.
 * @param opts.start The start index for the address generation.
 * @param opts.count The number of addresses to generate.
 * @param opts.account The account index for the address generation.
 * @param opts.hrp The human readable part for the address.
 * @param opts.coin The coin type for the address.
 * @param opts.keyType The key type for the address.
 * @param opts.keyFormat The output format of the key.
 * @param opts.console Flag to display on the console.
 * @param opts.json Output the data to a JSON file.
 * @param opts.mergeJson Merge the data to a JSON file.
 * @param opts.env Output the data to an environment file.
 * @param opts.mergeEnv Merge the data to an environment file.
 */
export async function actionCommandAddress(opts: {
	seed: string;
	start: string;
	count: string;
	account: string;
	hrp: string;
	coin: string;
	keyType: "Ed25519" | "Secp256k1";
	keyFormat: "hex" | "base64";
	console: boolean;
	json?: string;
	mergeJson: boolean;
	env?: string;
	mergeEnv: boolean;
}): Promise<void> {
	const seed: Uint8Array = CLIParam.hexBase64("seed", opts.seed);

	const start = CLIParam.integer("start", opts.start, false);
	const count = CLIParam.integer("count", opts.count, false, 1, 100);
	const account = CLIParam.integer("account", opts.account, false);
	const hrp = opts.hrp;
	const coin = CLIParam.integer("coin", opts.coin, false);
	const keyType = opts.keyType;
	const keyFormat = opts.keyFormat;

	CLIDisplay.value(
		I18n.formatMessage("commands.address.labels.seed"),
		keyFormat === "hex" ? Converter.bytesToHex(seed, true) : Converter.bytesToBase64(seed)
	);
	CLIDisplay.value(I18n.formatMessage("commands.address.labels.start"), start);
	CLIDisplay.value(I18n.formatMessage("commands.address.labels.count"), count);
	CLIDisplay.value(I18n.formatMessage("commands.address.labels.account"), account);
	CLIDisplay.value(I18n.formatMessage("commands.address.labels.hrp"), hrp);
	CLIDisplay.value(I18n.formatMessage("commands.address.labels.coin"), coin);
	CLIDisplay.value(I18n.formatMessage("commands.address.labels.key-type"), keyType);
	CLIDisplay.value(I18n.formatMessage("commands.address.labels.key-format"), keyFormat);
	CLIDisplay.break();

	CLIDisplay.task(I18n.formatMessage("commands.address.progress.generatingAddresses"));
	CLIDisplay.break();

	const addressDictionary: {
		[index: number]: { bech32: string; privateKey: string; publicKey: string };
	} = {};

	for (let i = start; i < start + count; i++) {
		const addressKeyPair = Bip44.addressBech32(
			seed,
			keyType === "Ed25519" ? KeyType.Ed25519 : KeyType.Secp256k1,
			hrp,
			coin,
			account,
			false,
			i
		);

		addressDictionary[i] = {
			bech32: addressKeyPair.address,
			privateKey:
				keyFormat === "hex"
					? Converter.bytesToHex(addressKeyPair.privateKey, true)
					: Converter.bytesToBase64(addressKeyPair.privateKey),
			publicKey:
				keyFormat === "hex"
					? Converter.bytesToHex(addressKeyPair.publicKey, true)
					: Converter.bytesToBase64(addressKeyPair.publicKey)
		};

		if (opts.console) {
			CLIDisplay.value(I18n.formatMessage("commands.address.labels.index"), i);
			CLIDisplay.value(
				I18n.formatMessage("commands.address.labels.address"),
				addressDictionary[i].bech32
			);
			CLIDisplay.value(
				I18n.formatMessage("commands.address.labels.private-key"),
				addressDictionary[i].privateKey
			);
			CLIDisplay.value(
				I18n.formatMessage("commands.address.labels.public-key"),
				addressDictionary[i].publicKey
			);
			CLIDisplay.break();
		}
	}

	if (Is.stringValue(opts?.json)) {
		await CLIUtils.writeJsonFile(opts.json, addressDictionary, opts.mergeJson);
	}
	if (Is.stringValue(opts?.env)) {
		const output = [];
		for (const addressIndex in addressDictionary) {
			output.push(`ADDRESS_${addressIndex}_BECH32="${addressDictionary[addressIndex].bech32}"`);
			output.push(
				`ADDRESS_${addressIndex}_PRIVATE_KEY="${addressDictionary[addressIndex].privateKey}"`
			);
			output.push(
				`ADDRESS_${addressIndex}_PUBLIC_KEY="${addressDictionary[addressIndex].publicKey}"`
			);
		}
		await CLIUtils.writeEnvFile(opts.env, output, opts.mergeEnv);
	}

	CLIDisplay.done();
}
