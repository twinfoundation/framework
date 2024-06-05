// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { I18n, Is, type ILocaleDictionary } from "@gtsc/core";
import type { Command } from "commander";
import * as dotenv from "dotenv";
import { CLIDisplay } from "../cliDisplay";
import { CLIUtils } from "../cliUtils";

let localesDir: string;

/**
 * Initialize the global options.
 * @param localesDirectory The path to load the locales from.
 */
export function initGlobalOptions(localesDirectory: string): void {
	localesDir = localesDirectory;
}

/**
 * Add the global options.
 * @param program The program to add the options to.
 * @param supportsLang Whether the CLI supports different languages.
 * @param supportsEnvFiles Whether the CLI supports loading env files
 */
export function addGlobalOptions(
	program: Command,
	supportsLang: boolean,
	supportsEnvFiles: boolean
): void {
	if (supportsLang) {
		program.option(
			I18n.formatMessage("cli.options.lang.param"),
			I18n.formatMessage("cli.options.lang.description"),
			"en"
		);
	}

	if (supportsEnvFiles) {
		program.option(
			I18n.formatMessage("cli.options.load-env.param"),
			I18n.formatMessage("cli.options.load-env.description")
		);
	}
}

/**
 * Handle the global options.
 * @param command The command to use for context.
 * @internal
 */
export function handleGlobalOptions(command: Command): void {
	const globalOpts = command.optsWithGlobals();

	if (Is.stringValue(globalOpts?.lang)) {
		initLocales(globalOpts.lang);
	}

	const loadEnv: string[] = globalOpts?.loadEnv;
	if (Is.arrayValue(loadEnv)) {
		const resolvedEnv = loadEnv.map(e => path.resolve(e));
		CLIDisplay.task(I18n.formatMessage("cli.progress.loadingEnvFiles"), resolvedEnv.join(", "));
		CLIDisplay.break();
		dotenv.config({ path: resolvedEnv });
	}
}

/**
 * Initialize the locales for the CLI.
 * @param locale The locale to use.
 * @internal
 */
export function initLocales(locale: string): void {
	const localePath = path.join(localesDir, `${locale}.json`);
	const localeContent = CLIUtils.readJsonFileSync<ILocaleDictionary>(localePath);
	if (Is.objectValue(localeContent)) {
		I18n.addDictionary(locale, localeContent);
		I18n.setLocale(locale);
	}
}
