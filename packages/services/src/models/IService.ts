// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRequestContext } from "./IRequestContext";

/**
 * Interface describing a service.
 */
export interface IService {
	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @param requestContext The request context for bootstrapping.
	 * @returns Nothing.
	 */
	bootstrap?(requestContext: IRequestContext): Promise<void>;

	/**
	 * The service needs to be started when the application is initialized.
	 * @returns Nothing.
	 */
	start?(): Promise<void>;

	/**
	 * The service needs to be stopped when the application is closed.
	 * @returns Nothing.
	 */
	stop?(): Promise<void>;
}
