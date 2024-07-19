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
	 * @param systemPartitionId The system partition id.
	 * @returns Nothing.
	 */
	bootstrap?(systemPartitionId: string): Promise<void>;

	/**
	 * The service needs to be started when the application is initialized.
	 * @param systemPartitionId The system partition id.
	 * @returns Nothing.
	 */
	start?(systemPartitionId: string): Promise<void>;

	/**
	 * The service needs to be stopped when the application is closed.
	 * @param systemPartitionId The system partition id.
	 * @returns Nothing.
	 */
	stop?(systemPartitionId: string): Promise<void>;
}
