// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * Options for the CLI Output for env.
 */
export interface ICliOutputOptionsEnv {
	/**
	 * Output the data to an environment file.
	 */
	env?: string;

	/**
	 * Merge the data to an environment file.
	 */
	mergeEnv: boolean;
}
