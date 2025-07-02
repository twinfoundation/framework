// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ILocale } from "@twin.org/core";

/**
 * Configuration for the CLI.
 */
export interface IMergeLocalesConfig {
	/**
	 * The languages to include while merging, if none are supplied only English will be included.
	 */
	locales?: ILocale[];

	/**
	 * Additional packages to add locales for, which are not part of the dependencies.
	 */
	includePackages?: string[];

	/**
	 * Packages to exclude from the locales.
	 */
	excludePackages?: string[];

	/**
	 * Output directory for the merged locales.
	 */
	outputDirectory?: string;
}
