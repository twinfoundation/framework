// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for each individual package.
 */
export interface IPackageJson {
	/**
	 * The name of the package.
	 */
	name?: string;

	/**
	 * The dependencies for the package.
	 */
	dependencies?: { [id: string]: string };

	/**
	 * The peer dependencies for the package.
	 */
	peerDependencies?: { [id: string]: string };
}
