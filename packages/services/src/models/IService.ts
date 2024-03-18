// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ILogEntry } from "./ILogEntry";
import type { IRequestContext } from "./IRequestContext";

/**
 * Interface describing a service.
 */
export interface IService {
	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @param requestContext The request context for bootstrapping.
	 * @returns The response of the bootstrapping as log entries.
	 */
	bootstrap?(requestContext: IRequestContext): Promise<ILogEntry[]>;

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
