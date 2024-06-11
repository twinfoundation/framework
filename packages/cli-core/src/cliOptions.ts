// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { I18n } from "@gtsc/core";
import type { Command } from "commander";

/**
 * Utilities for getting standard options.
 */
export class CLIOptions {
	/**
	 * Get the options for output.
	 * @param command The command to add the options to.
	 * @param opts The options of what to include.
	 * @param opts.noConsole Do not output to the console.
	 * @param opts.json Output to a JSON file.
	 * @param opts.env Output to an environment file.
	 * @param opts.mergeJson Merge existing JSON file.
	 * @param opts.mergeEnv Merge existing environment file.
	 */
	public static output(
		command: Command,
		opts: {
			noConsole: boolean;
			json: boolean;
			env: boolean;
			mergeJson: boolean;
			mergeEnv: boolean;
		}
	): void {
		if (opts.noConsole) {
			command.option(
				I18n.formatMessage("cli.options.no-console.param"),
				I18n.formatMessage("cli.options.no-console.description")
			);
		}
		if (opts.json) {
			command.option(
				I18n.formatMessage("cli.options.json.param"),
				I18n.formatMessage("cli.options.json.description")
			);
		}
		if (opts.mergeJson) {
			command.option(
				I18n.formatMessage("cli.options.merge-json.param"),
				I18n.formatMessage("cli.options.merge-json.description")
			);
		}
		if (opts.env) {
			command.option(
				I18n.formatMessage("cli.options.env.param"),
				I18n.formatMessage("cli.options.env.description")
			);
		}
		if (opts.mergeEnv) {
			command.option(
				I18n.formatMessage("cli.options.merge-env.param"),
				I18n.formatMessage("cli.options.merge-env.description")
			);
		}
	}
}
