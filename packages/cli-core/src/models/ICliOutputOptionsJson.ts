// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * Options for the CLI Output for JSON.
 */
export interface ICliOutputOptionsJson {
	/**
	 * Output the data to an JSON file.
	 */
	json?: string;

	/**
	 * Merge the data to a JSON file.
	 */
	mergeJson: boolean;
}
