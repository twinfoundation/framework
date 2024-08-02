// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

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
	 * @param systemLoggingConnectorType The system logging connector type, defaults to "system-logging".
	 * @returns Nothing.
	 */
	bootstrap?(systemLoggingConnectorType?: string): Promise<void>;

	/**
	 * The service needs to be started when the application is initialized.
	 * @param systemIdentity The identity of the system.
	 * @param systemLoggingConnectorType The system logging connector type, defaults to "system-logging".
	 * @returns Nothing.
	 */
	start?(systemIdentity: string, systemLoggingConnectorType?: string): Promise<void>;

	/**
	 * The service needs to be stopped when the application is closed.
	 * @param systemIdentity The identity of the system.
	 * @param systemLoggingConnectorType The system logging connector type, defaults to "system-logging".
	 * @returns Nothing.
	 */
	stop?(systemIdentity: string, systemLoggingConnectorType?: string): Promise<void>;
}
