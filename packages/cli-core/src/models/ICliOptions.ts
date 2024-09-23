// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * Options for the CLI.
 */
export interface ICliOptions {
	/**
	 * The title of the CLI.
	 */
	title: string;

	/**
	 * The name of the app used to execute it.
	 */
	appName: string;

	/**
	 * The version of the app.
	 */
	version: string;

	/**
	 * The icon for the CLI as an emoji character.
	 */
	icon: string;

	/**
	 * Supports different languages.
	 */
	supportsLang?: boolean;

	/**
	 * Supports the loading of env files.
	 */
	supportsEnvFiles?: boolean;

	/**
	 * Override the default output width.
	 */
	overrideOutputWidth?: number;
}
