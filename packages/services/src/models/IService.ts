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
	 * @param nodeLoggingConnectorType The node logging connector type, defaults to "node-logging".
	 * @returns Nothing.
	 */
	bootstrap?(nodeLoggingConnectorType?: string): Promise<void>;

	/**
	 * The service needs to be started when the node is initialized.
	 * @param nodeIdentity The identity of the node starting the service.
	 * @param nodeLoggingConnectorType The node logging connector type, defaults to "node-logging".
	 * @returns Nothing.
	 */
	start?(nodeIdentity: string, nodeLoggingConnectorType?: string): Promise<void>;

	/**
	 * The service needs to be stopped when the node is closed.
	 * @param nodeIdentity The identity of the node stopping the service.
	 * @param nodeLoggingConnectorType The node logging connector type, defaults to "node-logging".
	 * @returns Nothing.
	 */
	stop?(nodeIdentity: string, nodeLoggingConnectorType?: string): Promise<void>;
}
