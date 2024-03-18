// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ObjectHelper } from "@gtsc/core";
import type { IRequestContext } from "../models/IRequestContext";

/**
 * Helper class for use with request contexts.
 */
export class RequestContextHelper {
	/**
	 * The system context has no tenant set.
	 */
	public static readonly SYSTEM_CONTEXT: IRequestContext = {};

	/**
	 * Remove the tenant from the request context.
	 * @param requestContext The context to remove the tenant from.
	 * @returns The context with the tenant removed.
	 */
	public static removeTenant(requestContext: IRequestContext): IRequestContext {
		const clone = ObjectHelper.clone<IRequestContext>(requestContext) ?? {};
		delete clone.tenantId;
		return clone;
	}
}
