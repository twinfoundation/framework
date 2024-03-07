// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityDescriptor } from "./IEntityDescriptor";
import type { IViewMemberDescriptor } from "./IViewMemberDescriptor";

/**
 * Definition of a view.
 */
export interface IViewDescriptor<T, U> {
	/**
	 * The entity this view is associated with.
	 */
	entity: IEntityDescriptor<T>;
	/**
	 * The view members.
	 */
	members: IViewMemberDescriptor<U>[];
}
