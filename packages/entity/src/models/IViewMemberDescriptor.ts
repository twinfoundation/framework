// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Definition of a view member.
 */
export interface IViewMemberDescriptor<T> {
	/**
	 * The name of the property.
	 */
	name: keyof T;

	/**
	 * Is this the primary index property.
	 */
	isPrimary?: boolean;

	/**
	 * Is this a secondary index property.
	 */
	isSecondary?: boolean;
}
