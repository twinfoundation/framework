// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CLIDisplay, CLIUtils } from "@gtsc/cli-core";
import { Converter, GeneralError, HexHelper, I18n, Is, ObjectHelper } from "@gtsc/core";
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
		)
		.option(
			I18n.formatMessage("commands.address.options.no-console.param"),
			I18n.formatMessage("commands.address.options.no-console.description")
		)
		.option(
			I18n.formatMessage("commands.address.options.json.param"),
			I18n.formatMessage("commands.address.options.json.description")
		)
		.option(
			I18n.formatMessage("commands.address.options.append-json.param"),
			I18n.formatMessage("commands.address.options.append-json.description")
		)
		.option(
			I18n.formatMessage("commands.address.options.env.param"),
			I18n.formatMessage("commands.address.options.env.description")
		)
		.option(
			I18n.formatMessage("commands.address.options.append-env.param"),
			I18n.formatMessage("commands.address.options.append-env.description")
		)
		.action(actionCommandAddress);

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
 * @param opts.json Output the address to a JSON file.
 * @param opts.appendJson Append the address to a JSON file.
 * @param opts.env Output the address to an environment file.
 * @param opts.appendEnv Append the address to an environment file.
 */
export async function actionCommandAddress(opts: {
	seed: string;
	start?: string;
	count?: string;
	account?: string;
	hrp?: string;
	coin?: string;
	keyType: "Ed25519" | "Secp256k1";
	keyFormat: "hex" | "base64";
	console: boolean;
	json?: string;
	appendJson: boolean;
	env?: string;
	appendEnv: boolean;
}): Promise<void> {
	try {
		let seed: Uint8Array;
		let displaySeed: string = opts.seed;

		if (opts.seed.startsWith("!")) {
			const envValue = process.env[opts.seed.slice(1)];
			if (!Is.stringValue(envValue)) {
				throw new GeneralError("commands", "commands.address.seedMissingEnv", {
					env: opts.seed.slice(1)
				});
			} else {
				displaySeed = envValue;
				if (Is.stringHex(HexHelper.stripPrefix(envValue))) {
					seed = Converter.hexToBytes(envValue);
				} else if (Is.stringBase64(envValue)) {
					seed = Converter.base64ToBytes(envValue);
				} else {
					throw new GeneralError("commands", "commands.address.seedInvalidEnv", { envValue });
				}
			}
		} else if (Is.stringHex(HexHelper.stripPrefix(opts.seed))) {
			seed = Converter.hexToBytes(opts.seed);
		} else if (Is.stringBase64(opts.seed)) {
			seed = Converter.base64ToBytes(opts.seed);
		} else {
			throw new GeneralError("commands", "commands.address.seedInvalidFormat", { seed: opts.seed });
		}

		if (seed.length < 32) {
			throw new GeneralError("commands", "commands.address.seedInvalidFormat", { seed: opts.seed });
		}

		const start = Number.parseInt(opts.start ?? "0", 10);
		const count = Math.min(Number.parseInt(opts.count ?? "10", 10), 100);
		const account = Number.parseInt(opts.account ?? "0", 10);
		const hrp = opts.hrp ?? "iota";
		const coin = Number.parseInt(opts.coin ?? "4218", 10);
		const keyType = opts.keyType;
		const keyFormat = opts.keyFormat;

		CLIDisplay.value(I18n.formatMessage("commands.address.labels.seed"), displaySeed);
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
			[index: number]: { address: string; privateKey: string; publicKey: string };
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
				address: addressKeyPair.address,
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
					addressDictionary[i].address
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
			const filename = path.resolve(opts.json);
			let currentJson = {};
			if (opts.appendJson) {
				CLIDisplay.task(I18n.formatMessage("commands.address.progress.readingJsonFile"), filename);
				currentJson = (await CLIUtils.readJsonFile(filename)) ?? {};
			}
			CLIDisplay.task(I18n.formatMessage("commands.address.progress.writingJsonFile"), filename);
			CLIDisplay.break();

			await mkdir(path.dirname(filename), { recursive: true });
			await writeFile(
				filename,
				JSON.stringify(ObjectHelper.merge(currentJson, addressDictionary), undefined, "\t")
			);
		}

		if (Is.stringValue(opts?.env)) {
			const filename = path.resolve(opts.env);

			const output = [];

			if (opts.appendEnv) {
				CLIDisplay.task(I18n.formatMessage("commands.address.progress.readingEnvFile"), filename);
				const lines = await CLIUtils.readLinesFile(filename);
				if (Is.arrayValue(lines)) {
					output.push(...lines);
				}
			}

			CLIDisplay.task(I18n.formatMessage("commands.address.progress.writingEnvFile"), filename);
			CLIDisplay.break();

			for (const addressIndex in addressDictionary) {
				output.push(`ADDRESS_${addressIndex}_ADDRESS="${addressDictionary[addressIndex].address}"`);
				output.push(
					`ADDRESS_${addressIndex}_PRIVATE_KEY="${addressDictionary[addressIndex].privateKey}"`
				);
				output.push(
					`ADDRESS_${addressIndex}_PUBLIC_KEY="${addressDictionary[addressIndex].publicKey}"`
				);
			}

			await mkdir(path.dirname(filename), { recursive: true });
			await writeFile(filename, output.join("\n"));
		}

		CLIDisplay.done();
	} catch (error) {
		CLIDisplay.error(error);
	}
}
