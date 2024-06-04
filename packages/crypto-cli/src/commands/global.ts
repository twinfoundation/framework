// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { I18n, Is, type ILocaleDictionary } from "@gtsc/core";
import type { Command } from "commander";
import { readJsonFileSync } from "../utils";

let applicationRootPath: string;

/**
 * Initialize the global options.
 * @param appRootPath The root path of the application.
 */
export function initGlobalOptions(appRootPath: string): void {
	applicationRootPath = appRootPath;
}

/**
 * Add the global options.
 * @param program The program to add the options to.
 */
export function addGlobalOptions(program: Command): void {
	program.option(
		I18n.formatMessage("cli.options.lang.param"),
		I18n.formatMessage("cli.options.lang.description"),
		"en"
	);
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
}

/**
 * Initialize the locales for the CLI.
 * @param locale The locale to use.
 * @internal
 */
export function initLocales(locale: string): void {
	const localePath = path.join(applicationRootPath, `../dist/locales/${locale}.json`);
	const localeContent = readJsonFileSync<ILocaleDictionary>(localePath);
	if (Is.objectValue(localeContent)) {
		I18n.addDictionary(locale, localeContent);
		I18n.setLocale(locale);
	}
}
