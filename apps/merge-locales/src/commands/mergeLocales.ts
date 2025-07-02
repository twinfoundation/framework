// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { CLIDisplay, CLIUtils } from "@twin.org/cli-core";
import {
	GeneralError,
	I18n,
	Is,
	ObjectHelper,
	type ILocale,
	type ILocaleDictionary
} from "@twin.org/core";
import type { Command } from "commander";
import type { IMergeLocalesConfig } from "../models/IMergeLocalesConfig";
import type { IPackageJson } from "../models/IPackageJson";

/**
 * Build the root command to be consumed by the CLI.
 * @param program The command to build on.
 */
export function buildCommandMergeLocales(program: Command): void {
	program
		.option(
			I18n.formatMessage("commands.merge-locales.options.config.param"),
			I18n.formatMessage("commands.merge-locales.options.config.description")
		)
		.action(async opts => {
			await actionCommandMergeLocales(opts);
		});
}

/**
 * Action the root command.
 * @param opts The options for the command.
 * @param opts.config The optional configuration file.
 */
export async function actionCommandMergeLocales(opts: { config?: string }): Promise<void> {
	let config: IMergeLocalesConfig | undefined;
	if (Is.stringValue(opts.config)) {
		try {
			const configJson = path.resolve(opts.config);
			CLIDisplay.value(I18n.formatMessage("commands.merge-locales.labels.configJson"), configJson);
			CLIDisplay.break();

			CLIDisplay.task(I18n.formatMessage("commands.merge-locales.progress.loadingConfigJson"));
			CLIDisplay.break();

			config = await CLIUtils.readJsonFile<IMergeLocalesConfig>(configJson);
			CLIDisplay.break();
		} catch (err) {
			throw new GeneralError("commands", "commands.merge-locales.configFailed", undefined, err);
		}

		if (Is.empty(config)) {
			throw new GeneralError("commands", "commands.merge-locales.configFailed");
		}
	}

	await mergeLocales(process.cwd(), config ?? {});

	CLIDisplay.done();
}

/**
 * Merge the locales.
 * @param workingDirectory The folder the app was run from.
 * @param config The configuration for the app.
 */
export async function mergeLocales(
	workingDirectory: string,
	config: IMergeLocalesConfig
): Promise<void> {
	CLIDisplay.value(
		I18n.formatMessage("commands.merge-locales.labels.workingDirectory"),
		workingDirectory
	);

	const outputDirectory = path.resolve(config.outputDirectory ?? "./dist/locales");
	const locales = config.locales ?? [];
	const includePackages = config.includePackages ?? [];
	const excludePackages = config.excludePackages ?? [];

	if (locales.length === 0) {
		locales.push({ label: "English", code: "en" });
	}
	CLIDisplay.value(
		I18n.formatMessage("commands.merge-locales.labels.outputDirectory"),
		outputDirectory
	);

	const npmRoot = await CLIUtils.findNpmRoot(workingDirectory);
	CLIDisplay.value(I18n.formatMessage("commands.merge-locales.labels.npmRoot"), npmRoot);
	CLIDisplay.break();

	CLIDisplay.task(
		I18n.formatMessage("commands.merge-locales.progress.creatingOutputDirectory"),
		outputDirectory
	);

	try {
		await rm(outputDirectory, { recursive: true });
	} catch {}
	await mkdir(outputDirectory, { recursive: true });

	let packageNames: string[] = [];

	const packageJson = await findDependencies(
		npmRoot,
		path.join(workingDirectory, "package.json"),
		packageNames
	);

	excludePackages.push("@twin.org/merge-locales");
	excludePackages.push("@twin.org/nameof");
	excludePackages.push("@twin.org/nameof-transformer");

	packageNames = packageNames.filter(pkg => !excludePackages.includes(pkg));
	packageNames.push(...includePackages);

	CLIDisplay.break();
	CLIDisplay.section(I18n.formatMessage("commands.merge-locales.labels.sourcePackages"));
	for (const packageName of packageNames) {
		CLIDisplay.value("", packageName, 1);
	}
	CLIDisplay.break();

	const localeDictionaries: { [locale: string]: ILocaleDictionary } = {};

	for (const packageName of packageNames) {
		const packageLocalDirectory = path.join(npmRoot, packageName, "locales");
		await mergePackageLocales(packageLocalDirectory, packageName, locales, localeDictionaries);
	}

	// Merge the main package last so that it can override any other packages.
	if (Is.stringValue(packageJson.name)) {
		await mergePackageLocales(
			path.join(workingDirectory, "locales"),
			packageJson.name,
			locales,
			localeDictionaries
		);
	}

	CLIDisplay.break();
	CLIDisplay.task(I18n.formatMessage("commands.merge-locales.progress.writingMergedLocales"));

	for (const localeDictionary in localeDictionaries) {
		const localeFile = path.join(outputDirectory, `${localeDictionary}.json`);
		CLIDisplay.value(
			I18n.formatMessage("commands.merge-locales.labels.writingLocale"),
			localeFile,
			1
		);
		await writeFile(
			localeFile,
			`${JSON.stringify(localeDictionaries[localeDictionary], undefined, "\t")}\n`,
			"utf8"
		);
	}
	CLIDisplay.break();
}

/**
 * Merge the locales for a package.
 * @param packageLocalDirectory The root of the NPM packages.
 * @param packageName The name of the package.
 * @param locales The locales to merge.
 * @internal
 */
async function mergePackageLocales(
	packageLocalDirectory: string,
	packageName: string,
	locales: ILocale[],
	localeDictionaries: { [locale: string]: ILocaleDictionary }
): Promise<void> {
	CLIDisplay.task(
		I18n.formatMessage("commands.merge-locales.progress.mergingLocalesForPackage"),
		packageName
	);

	if (await CLIUtils.dirExists(packageLocalDirectory)) {
		for (const locale of locales) {
			const localeFile = path.join(packageLocalDirectory, `${locale.code}.json`);
			if (await CLIUtils.dirExists(localeFile)) {
				CLIDisplay.value(
					I18n.formatMessage("commands.merge-locales.labels.mergingLocale"),
					locale.code,
					1
				);

				const localeDictionary = await CLIUtils.readJsonFile<ILocaleDictionary>(localeFile);
				if (!localeDictionaries[locale.code]) {
					localeDictionaries[locale.code] = {};
				}
				localeDictionaries[locale.code] = ObjectHelper.merge(
					localeDictionaries[locale.code],
					localeDictionary
				);
			}
		}
	}
	CLIDisplay.break();
}

/**
 * Find dependencies for the package.
 * @param npmRoot The root of the NPM packages.
 * @param packageJsonPath The path to the package.json.
 * @param packageNames The package names to add to.
 * @returns The package details.
 * @internal
 */
async function findDependencies(
	npmRoot: string,
	packageJsonPath: string,
	packageNames: string[]
): Promise<IPackageJson> {
	const packageJson = await CLIUtils.readJsonFile<IPackageJson>(packageJsonPath);

	if (Is.objectValue(packageJson?.dependencies)) {
		for (const pkg in packageJson.dependencies) {
			if (pkg.startsWith("@twin.org") && !packageNames.includes(pkg)) {
				packageNames.push(pkg);
				const packagePath = path.join(npmRoot, pkg, "package.json");
				await findDependencies(npmRoot, packagePath, packageNames);
			}
		}
	}

	if (Is.objectValue(packageJson?.peerDependencies)) {
		for (const pkg in packageJson.peerDependencies) {
			if (pkg.startsWith("@twin.org") && !packageNames.includes(pkg)) {
				packageNames.push(pkg);
				const packagePath = path.join(npmRoot, pkg, "package.json");
				await findDependencies(npmRoot, packagePath, packageNames);
			}
		}
	}

	return packageJson ?? {};
}
