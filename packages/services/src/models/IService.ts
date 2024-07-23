// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IServiceRequestContext } from "./IServiceRequestContext";

/**
 * Interface describing a service.
 */
export interface IService {
	/**
	 * The name of the service.
	 */
	readonly CLASS_NAME: string;

	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @param systemRequestContext The system request context.
	 * @returns Nothing.
	 */
	bootstrap?(systemRequestContext: IServiceRequestContext): Promise<void>;

	/**
	 * The service needs to be started when the application is initialized.
	 * @param systemRequestContext The system request context.
	 * @returns Nothing.
	 */
	start?(systemRequestContext: IServiceRequestContext): Promise<void>;

	/**
	 * The service needs to be stopped when the application is closed.
	 * @param systemRequestContext The system request context.
	 * @returns Nothing.
	 */
	stop?(systemRequestContext: IServiceRequestContext): Promise<void>;
}
